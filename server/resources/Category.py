from flask import request
from flask_restful import Resource
from models import db, Category, CategorySchema

categories_schema = CategorySchema(many=True)
category_schema = CategorySchema()


class CategoryResource(Resource):
    def get(self):
        categories = Category.query.all()
        categories = categories_schema.dump(categories).data
        return {'status': 'success', 'data': categories}, 200
