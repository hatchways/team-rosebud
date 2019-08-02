from flask import session, request
from io import BytesIO
import os
from config import x, y
from flask_restful import Resource, reqparse, abort
import boto3
from config import S3_KEY, S3_SECRET, S3_BUCKET, ALLOWED_EXTENSIONS, FILE_CONTENT_TYPES
from werkzeug import secure_filename
from werkzeug.datastructures import FileStorage
from models import db, ma, ProjectModel, ProjectSchema
from flask_jwt_extended import (
    jwt_refresh_token_required,
    get_jwt_identity,
    jwt_required,
    get_raw_jwt,
    fresh_jwt_required
)

project_schema = ProjectSchema()


def create_presigned_url(bucket_name, object_name, expiration=3600):
    """Generate a presigned URL to share an S3 object

    :param bucket_name: string
    :param object_name: string
    :param expiration: Time in seconds for the presigned URL to remain valid
    :return: Presigned URL as string. If error, returns None.
    """

    # Generate a presigned URL for the S3 object

    s3_client = boto3.client('s3',
                             region_name='ca-central-1',
                             endpoint_url='https://s3.ca-central-1.amazonaws.com',
                             aws_access_key_id=x,
                             aws_secret_access_key=y)
    try:
        response = s3_client.generate_presigned_url('get_object',
                                                    Params={'Bucket': bucket_name,
                                                            'Key': object_name},
                                                    ExpiresIn=expiration)
    except ClientError as e:
        logging.error(e)
        return None

    # The response contains the presigned URL
    return response


def upload_s3(file, key_name, content_type, bucket_name):
    client = boto3.client('s3',
                          region_name='ca-central-1',
                          endpoint_url='https://s3.ca-central-1.amazonaws.com',
                          aws_access_key_id=x,
                          aws_secret_access_key=y)

    client.put_object(Body=file,
                      Bucket=bucket_name,
                      Key=key_name,
                      ContentType=content_type)

    return {'message': 'image uploaded', 'key_name': key_name}, 200


class FileStorageArgument(reqparse.Argument):
    """This argument class for flask-restful will be used in
    all cases where file uploads need to be handled."""

    def convert(self, value, op):
        if self.type is FileStorage:  # only in the case of files
            # this is done as self.type(value) makes the name attribute of the
            # FileStorage object same as argument name and value is a FileStorage
            # object itself anyways
            return value

        # called so that this argument class will also be useful in
        # cases when argument type is not a file.
        super(FileStorageArgument, self).convert(*args, **kwargs)


class UploadImage(Resource):
    put_parser = reqparse.RequestParser(argument_class=FileStorageArgument)
    put_parser.add_argument('image', required=True,
                            type=FileStorage, location='files')

    def post(self, project_id: int):

        args = self.put_parser.parse_args()
        image = args['image']

        # check extension
        extension = image.filename.rsplit('.', 1)[1].lower()
        if '.' in image.filename and not extension in ALLOWED_EXTENSIONS:
            abort(400, message="File extension is not one of our supported types.")

        name = image.filename.rsplit('.', 1)[0].lower()

        image_file = image

        # upload to s3
        key_name = '{0}.{1}'.format(name, extension)
        content_type = FILE_CONTENT_TYPES[extension]
        bucket_name = S3_BUCKET
        output = upload_s3(image_file, key_name, content_type, bucket_name)
        presigned_url = create_presigned_url(bucket_name, key_name)

        project = ProjectModel.find_by_id(project_id)
        if not project:
            return {"message": "PROJECT_NOT_FOUND"}, 404

        project.image = presigned_url
        project.save_to_db()

        return output
