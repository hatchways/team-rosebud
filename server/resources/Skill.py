from flask_restful import Resource
from flask import request
from marshmallow import ValidationError
from models import db, ma, SkillModel, SkillSchema

SKILL_ALREADY_EXISTS = "A skill with that name already exists."
CREATED_SUCCESSFULLY = "Skill created successfully."
SKILL_NOT_FOUND = "Skill not found."
SKILL_DELETED = "Skill deleted."

skill_schema = SkillSchema()


class SkillCreate(Resource):
    @classmethod
    def post(cls):
        try:
            skill = skill_schema.load(request.get_json())
        except ValidationError as err:
            return err.messages, 400

        if SkillModel.find_by_name(skill.name):
            return {"message": SKILL_ALREADY_EXISTS}, 400

        skill.save_to_db()

        return {"message": CREATED_SUCCESSFULLY}, 201


class Skill(Resource):
    @classmethod
    def get(cls, skill_id: int):
        skill = SkillModel.find_by_id(skill_id)
        if not skill:
            return {"message": SKILL_NOT_FOUND}, 404

        return skill_schema.dump(skill), 200

    @classmethod
    def delete(cls, skill_id: int):
        skill = SkillModel.find_by_id(skill_id)
        if not skill:
            return {"message": SKILL_NOT_FOUND}, 404

        skill.delete_from_db()
        return {"message": SKILL_DELETED}, 200
