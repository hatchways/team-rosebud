from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from marshmallow import Schema, fields, pre_load, validate


# Order matters: Initialize SQLAlchemy before Marshmallow
db = SQLAlchemy()
ma = Marshmallow()

class UserModel(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False, unique=True)
    password = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), nullable=False, unique=True)

    @classmethod
    def find_by_username(cls, username: str) -> "UserModel":
        return cls.query.filter_by(username=username).first()

    @classmethod
    def find_by_id(cls, _id: int) -> "UserModel":
        return cls.query.filter_by(id=_id).first()

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()


class UserSchema(ma.ModelSchema):
    class Meta:
        model = UserModel
        load_only = ("password",)
        dump_only = ("id",)


class Category(db.Model):
    __tablename__ = 'categories'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), unique=True, nullable=False)

    def __init__(self, name):
        self.name = name

class CategorySchema(ma.Schema):
    id = fields.Integer()
    name = fields.String(required=True)

class ProjectModel(db.Model):
    __tablename__ = 'projects'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False, unique=True)
    link = db.Column(db.String(120), nullable=False, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    @classmethod
    def find_by_name(cls, name: str) -> "ProjectModel":
        return cls.query.filter_by(name=name).first()

    @classmethod
    def find_by_id(cls, _id: int) -> "ProjectModel":
        return cls.query.filter_by(id=_id).first()

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()

class ProjectSchema(ma.ModelSchema):
    
    class Meta:
        model = ProjectModel
    user = ma.Nested(UserSchema)
