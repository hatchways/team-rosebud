from flask import Flask, Blueprint
from flask_restful import Api
from resources.Hello import Hello
from resources.Category import CategoryResource
from resources.User import UserRegister, User
from resources.Project import ProjectCreate, Project

api_bp = Blueprint('api', __name__)
api = Api(api_bp)

api.add_resource(Hello, '/Hello')
api.add_resource(CategoryResource, '/Category')
api.add_resource(UserRegister, "/register")
api.add_resource(User, "/user/<int:user_id>")
api.add_resource(ProjectCreate, "/create")
api.add_resource(Project, "/project/<int:project_id>")
