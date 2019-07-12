from flask_restful import Resource
from flask import request
from marshmallow import ValidationError
from models import db, ma, ProjectModel, ProjectSchema

PROJECT_ALREADY_EXISTS = "A project with that name already exists."
CREATED_SUCCESSFULLY = "Project created successfully."
PROJECT_NOT_FOUND = "Project not found."
PROJECT_DELETED = "Project deleted."

project_schema = ProjectSchema()


class ProjectCreate(Resource):
    @classmethod
    def post(cls):
        try:
            project = project_schema.load(request.get_json())
        except ValidationError as err:
            return err.messages, 400

        if ProjectModel.find_by_name(project.name):
            return {"message": PROJECT_ALREADY_EXISTS}, 400

        project.save_to_db()

        return {"message": CREATED_SUCCESSFULLY}, 201

class Project(Resource):
    @classmethod
    def get(cls, project_id: int):
        project = ProjectModel.find_by_id(project_id)
        if not project:
            return {"message": PROJECT_NOT_FOUND}, 404

        return project_schema.dump(project), 200

    @classmethod
    def delete(cls, project_id: int):
        project = UserModel.find_by_id(user_id)
        if not project:
            return {"message": PROJECT_NOT_FOUND}, 404

        project.delete_from_db()
        return {"message": PROJECT_DELETED}, 200
