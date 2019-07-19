from flask import Flask, Blueprint
from flask_restful import Api
from resources.Hello import Hello
from resources.User import UserRegister, User, UserLogout, TokenRefresh, UserLogin, UserSkill
from resources.Project import ProjectCreate, Project
from resources.Skill import SkillCreate, Skill, SkillList

api_bp = Blueprint('api', __name__)
api = Api(api_bp)

api.add_resource(Hello, '/Hello')
api.add_resource(UserRegister, "/register")
api.add_resource(User, "/user/<int:user_id>")
api.add_resource(UserLogin, "/login")
api.add_resource(UserSkill, "/user/<int:user_id>/addskill")
api.add_resource(TokenRefresh, "/refresh")
api.add_resource(UserLogout, "/logout")
api.add_resource(ProjectCreate, "/create")
api.add_resource(Project, "/project/<int:project_id>")
api.add_resource(SkillCreate, "/skill")
api.add_resource(Skill, "/skill/<int:skill_id>")
api.add_resource(SkillList, "/skills")
