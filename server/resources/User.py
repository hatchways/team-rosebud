from flask_restful import Resource
from flask import request
from werkzeug.security import safe_str_cmp
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_refresh_token_required,
    get_jwt_identity,
    jwt_required,
    get_raw_jwt,
    fresh_jwt_required
)
from marshmallow import ValidationError
from models import db, ma, UserModel, UserSchema, SkillModel, SkillSchema
from blacklist import BLACKLIST
import ipdb

USER_ALREADY_EXISTS = "A user with that username already exists."
CREATED_SUCCESSFULLY = "User created successfully."
USER_NOT_FOUND = "User not found."
USER_DELETED = "User deleted."
INVALID_CREDENTIALS = "Invalid credentials!"
EMAIL_ALREADY_EXISTS = "A user with that email already exists."
USER_LOGGED_OUT = "User {} successfully logged out."

user_schema = UserSchema()
skill_schema = SkillSchema()

class UserRegister(Resource):
    @classmethod
    def post(cls):
        try:
            user = user_schema.load(request.get_json())
        except ValidationError as err:
            return err.messages, 400
     
        if UserModel.find_by_email(user.email):
            return {"message": EMAIL_ALREADY_EXISTS}, 400

        user.save_to_db()

        return {"message": CREATED_SUCCESSFULLY}, 201


class User(Resource):
    @classmethod
    def get(cls, user_id: int):
        user = UserModel.find_by_id(user_id)
        if not user:
            return {"message": USER_NOT_FOUND}, 404

        return user_schema.dump(user), 200

    @classmethod
    @fresh_jwt_required
    def delete(cls, user_id: int):
        user = UserModel.find_by_id(user_id)
        if not user:
            return {"message": USER_NOT_FOUND}, 404

        user.delete_from_db()
        return {"message": USER_DELETED}, 200

    @classmethod
    @fresh_jwt_required
    def put(cls, user_id: int):
        user_json = request.get_json()
        user = UserModel.find_by_id(user_id)
        current_user = get_jwt_identity()
        
        if user and user.id == current_user:
            try:
                #loading in form data through validation/clean by marshmallow
                user.username = user_json["username"]
                user.location = user_json["location"]
                user.yearsexp = user_json["yearsexp"]
                user.description = user_json["description"]

            except ValidationError as err:
                return err.messages, 400
            
            user.save_to_db()
            return user_schema.dump(user), 200
        else:
            return{"message": INVALID_CREDENTIALS}, 401

class UserSkill(Resource): #adding a new skill to a user
    @classmethod
    @jwt_required
    def put(cls, user_id: int):
        skill_user_json = request.get_json() #loading form data should be JSON header with skill name
        user = UserModel.find_by_id(user_id) # loading appropriate user from endpoint
        current_user = get_jwt_identity() #obtaining user ID from web token 

        if user and user.id == current_user: #ensuring user who is submitting the form is making the request
            try:
                skill_name = skill_user_json["name"]
            except ValidationError as err:
                return err.messages, 400

            skill = SkillModel.find_by_name(skill_name)
            if skill:
                if skill not in user.skills:
                    user.skills.append(skill) #append the skill object to the skills list in the user JSON object
                else:
                    return {"message": "User has already added that skill" }, 400

            else: #if skill is not found then create skill object in db and also append to skills list
                try:
                    skill = skill_schema.load(skill_user_json)
                except ValidationError as err:
                    return err.messages, 400
                
                skill.save_to_db()
                user.skills.append(skill)
            
            user.save_to_db()
            return user_schema.dump(user), 200
        else:
            return{"message": INVALID_CREDENTIALS}, 401

    @classmethod
    @jwt_required
    def patch(cls, user_id: int):
        skill_user_json = request.get_json()
        user = UserModel.find_by_id(user_id) 
        current_user = get_jwt_identity() 

        if user and user.id == current_user:
            try:
                skill_name = skill_user_json["name"]
            except ValidationError as err:
                return err.messages, 400

            skill = SkillModel.find_by_name(skill_name)

            if skill in user.skills:
                user.skills.remove(skill)
            else:
                return {"message": "Skill not found in user."}, 404

            user.save_to_db()
            return user_schema.dump(user), 200
        else:
            return{"message": INVALID_CREDENTIALS}, 401
        
class UserLogin(Resource):
    @classmethod
    def post(cls):
        user_json = request.get_json()
        user_data = user_schema.load(user_json)

        user = UserModel.find_by_email(user_data.email)

        if user and safe_str_cmp(user_data.password, user.password):
            access_token = create_access_token(identity=user.id, fresh=True)
            refresh_token = create_refresh_token(user.id)
            return {"access_token": access_token, "refresh_token": refresh_token, "user_id":user.id}, 200
        
        return{"message": INVALID_CREDENTIALS}, 401

class UserLogout(Resource):
    @classmethod
    @jwt_required
    def post(cls):
        jti = get_raw_jwt()["jti"] #jwt id for jwt
        user_id = get_jwt_identity()
        BLACKLIST.add(jti)
        return {"message": USER_LOGGED_OUT.format(user_id)}, 200

class TokenRefresh(Resource):
    @classmethod
    @jwt_refresh_token_required
    def post(cls):
        current_user = get_jwt_identity()
        new_token = create_access_token(identity=current_user, fresh=False)
        return {"access_token": new_token}, 200

