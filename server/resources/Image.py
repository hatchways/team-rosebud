from io import StringIO, BytesIO
import config
# from boto.s3.connection import S3Connection
# from boto.s3.key import Key as S3Key
import boto3
import botocore
from flask_restful import Resource, reqparse, abort
from flask import request
from werkzeug.datastructures import FileStorage
import os

aws_access_key = os.environ.get("AWS_ACCESS_KEY_ID")
aws_secret_access_key = os.environ.get("AWS_SECRET_ACCESS_KEY")

def upload_s3(file, key_name, content_type, bucket_name):
    """Uploads a given StringIO object to S3. Closes the file after upload.
    Returns the URL for the object uploaded.
    Note: The acl for the file is set as 'public-acl' for the file uploaded.
    Keyword Arguments:
    file -- StringIO object which needs to be uploaded.
    key_name -- key name to be kept in S3.
    content_type -- content type that needs to be set for the S3 object.
    bucket_name -- name of the bucket where file needs to be uploaded.
    """
    # create connection
    s3 = boto3.resource('s3')

    bucket = s3.Bucket('bucket_name')
    exists = True
    try:
        s3.meta.client.head_bucket(Bucket='mybucket')
    except botocore.exceptions.ClientError as e:
        # If a client error is thrown, then check that it was a 404 error.
        # If it was a 404 error, then the bucket does not exist.
        error_code = e.response['Error']['Code']
        if error_code == '404':
            exists = False
    
    '''
    # upload the file after getting the right bucket
    bucket = conn.get_bucket(bucket_name)
    obj = S3Key(bucket)
    obj.name = key_name
    obj.content_type = content_type
    obj.set_contents_from_string(file.getvalue())
    obj.set_acl('public-read')

    # close stringio object
    file.close()

    return obj.generate_url(expires_in=0, query_auth=False)
    '''

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

    def put(self):
        args = self.put_parser.parse_args()
        image = args['image']

        # check img extension
        extension = image.filename.rsplit('.', 1)[1].lower()
        if '.' in image.filename and not extension in config.ALLOWED_EXTENSIONS:
            abort(400, message="File extension is not one of our supported types.")

        kname = image.filename.rsplit('.', 1)[0].lower()

        # create a file object of the image
        image_file = StringIO()
        image.save(image_file)

        # upload to s3
        key_name = '{0}.{1}'.format(kname, extension)
        content_type = config.FILE_CONTENT_TYPES[extension]
        bucket_name = 'rosebud-hatchways'
        img_url = upload_s3(image_file, key_name, content_type, bucket_name)

        return {'img_url': img_url}
