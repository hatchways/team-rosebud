from flask import Flask, Blueprint
from flask_restful import Api
from resources.Hello import Hello
from resources.User import UserRegister, User, UserLogout, TokenRefresh, UserLogin, UserSkill, UserList
from resources.Project import ProjectCreate, Project, ProjectList
from resources.Skill import SkillCreate, Skill, SkillList
from resources.Image import UploadImage, upload_s3, FileStorageArgument
from resources.Connections import Connections

api_bp = Blueprint('api', __name__)
api = Api(api_bp)

api.add_resource(Hello, '/Hello')
api.add_resource(UserRegister, "/register")
api.add_resource(User, "/user/<int:user_id>")
api.add_resource(UserLogin, "/login")
api.add_resource(UserList, "/users")  # user list added for global view
api.add_resource(UserSkill, "/user/<int:user_id>/skill")
api.add_resource(TokenRefresh, "/refresh")
api.add_resource(UserLogout, "/logout")
api.add_resource(ProjectCreate, "/user/<int:user_id>/project")
api.add_resource(Project, "/project/<int:project_id>")
api.add_resource(ProjectList, "/user/<int:user_id>/projects")
api.add_resource(SkillCreate, "/skill")  # to remove
api.add_resource(Skill, "/skill/<int:skill_id>")
api.add_resource(SkillList, "/skills")
#api.add_resource(Connections, "/connections")
api.add_resource(Connections, "/connect")
