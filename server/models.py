from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from marshmallow import Schema, fields, pre_load, validate
from typing import List

# Order matters: Initialize SQLAlchemy before Marshmallow
db = SQLAlchemy()
ma = Marshmallow()

users_skills = db.Table('users_skills',
                        db.Column('user_id', db.Integer,
                                  db.ForeignKey('users.id')),
                        db.Column('skill_id', db.Integer, db.ForeignKey('skills.id')))


class ConnectionModel(db.Model):
    __tablename__ = 'connections'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        "users.id", ondelete='CASCADE'), nullable=False)
    connected_to = db.Column(
        db.Integer, db.ForeignKey("users.id", ondelete='CASCADE'), nullable=False)

    @classmethod
    def find_by_user_id(cls, _id: int) -> "ConnectionModel":
        return cls.query.filter_by(user_id=_id).first()

    @classmethod
    def find_by_connection(cls, _id: int, _to: int) -> "ConnectionModel":
        return cls.query.filter_by(user_id=_id, connected_to=_to).first()

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()


class SkillModel(db.Model):
    __tablename__ = 'skills'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False, unique=True)

    @classmethod
    def find_by_name(cls, name: str) -> "SkillModel":
        return cls.query.filter_by(name=name).first()

    @classmethod
    def find_by_id(cls, _id: int) -> "SkillModel":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls) -> List["SkillModel"]:
        return cls.query.all()

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()


class UserModel(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80))
    password = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), nullable=False, unique=True)
    location = db.Column(db.String(120))
    yearsexp = db.Column(db.Integer)
    description = db.Column(db.String(256))

    projects = db.relationship("ProjectModel", back_populates="user")
    skills = db.relationship(
        'SkillModel', secondary="users_skills", backref='users', lazy="joined")

    @classmethod
    def find_by_username(cls, username: str) -> "UserModel":
        return cls.query.filter_by(username=username).first()

    @classmethod
    def find_by_email(cls, email: str) -> "UserModel":
        return cls.query.filter_by(email=email).first()

    @classmethod
    def find_by_id(cls, _id: int) -> "UserModel":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls) -> List["UserModel"]:
        return cls.query.all()

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()


class ProjectModel(db.Model):
    __tablename__ = 'projects'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    demoLink = db.Column(db.String(120))
    githubLink = db.Column(db.String(120))
    image = db.Column(db.String(), unique=True)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user = db.relationship("UserModel", back_populates="projects")

    @classmethod
    def find_by_name(cls, name: str) -> "ProjectModel":
        return cls.query.filter_by(name=name).first()

    @classmethod
    def find_by_id(cls, _id: int) -> "ProjectModel":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all_user(cls, user_id: int) -> List["ProjectModel"]:
        return cls.query.filter_by(user_id=user_id).all()

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()


class ProjectSchema(ma.ModelSchema):
    class Meta:
        model = ProjectModel
        include_fk = True


class ConnectionSchema(ma.ModelSchema):
    class Meta:
        model = ConnectionModel
        include_fk = True


class SkillSchema(ma.ModelSchema):
    class Meta:
        model = SkillModel
        load_only = ("users",)
        include_fk = True


class UserSchema(ma.ModelSchema):

    class Meta:
        model = UserModel
        load_only = ("password",)
        dump_only = ("id",)
        include_fk = True

    projects = ma.Nested(ProjectSchema, many=True)
    skills = ma.Nested(SkillSchema, many=True)
