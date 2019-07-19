from flask_restful import Resource
from flask import request
from werkzeug.security import safe_str_cmp
from flask_jwt_extended import (
    jwt_refresh_token_required,
    get_jwt_identity,
    jwt_required,
    get_raw_jwt,
    fresh_jwt_required
)
from marshmallow import ValidationError
from models import db, ma, ProjectModel, ProjectSchema, UserModel, UserSchema

PROJECT_ALREADY_EXISTS = "A project with that name already exists."
CREATED_SUCCESSFULLY = "Project created successfully."
PROJECT_NOT_FOUND = "Project not found."
PROJECT_DELETED = "Project deleted."
INVALID_CREDENTIALS = "Invalid credentials!"

project_schema = ProjectSchema()
user_schema = UserSchema()

class ProjectCreate(Resource):
    @classmethod
    @jwt_required
    def put(cls, user_id: int):
        project_json = request.get_json()
        user = UserModel.find_by_id(user_id)
        current_user = get_jwt_identity()

        if user and user.id == current_user:
            try:
                project = project_schema.load(request.get_json())
            except ValidationError as err:
                return err.messages, 400
            
            if project in user.projects:
                return {"message": "Project exists"}, 400
            else:
                user.projects.append(project)
            
            project.save_to_db()
            user.save_to_db()
            return user_schema.dump(user), 200
        else:
            return{"message": INVALID_CREDENTIALS}, 401

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

