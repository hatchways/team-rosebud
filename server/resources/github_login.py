from flask import request, g
from flask_restful import Resource
from models import UserSchema
from oa import github

user_schema = UserSchema()


class GithubLogin(Resource):
    @classmethod
    def get(cls):
        return github.authorize(callback="http://localhost:5000/login/github/authorized")


class GithubAuthorize(Resource):
    @classmethod
    def get(cls):
        resp = github.authorized_response()
        g.access_token = resp['access_token']
        # this uses the access_token from the tokengetter function
        github_user = github.get('user')
        github_username = github_user.data['login']
        return github_username
