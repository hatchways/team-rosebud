from flask_restful import Resource
from flask import request
from marshmallow import ValidationError
from models import db, ma, ConnectionModel, ConnectionSchema

connection_schema = ConnectionSchema()


class Connections(Resource):
    @classmethod
    def get(cls):
        try:
            connection = connection_schema.load(request.get_json())
        except ValidationError as err:
            return err.messages, 400
        connected = ConnectionModel.find_by_connection(
            connection.user_id, connection.connected_to)
        if not connected:
            return {"message": "Not connected"}, 400

        return {"message": "Already connected"}, 200

    @classmethod
    def post(cls):
        try:
            connection = connection_schema.load(request.get_json())
        except ValidationError as err:
            return err.messages, 400
        connected = ConnectionModel.find_by_connection(
            connection.user_id, connection.connected_to)
        if connected:
            return {"message": "Already connected"}, 400

        connection.save_to_db()
        return {"message": "success"}, 200
