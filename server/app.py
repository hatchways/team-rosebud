from flask import Flask
import os
from flask_sqlalchemy import SQLAlchemy
from api.ping_handler import ping_handler
from api.home_handler import home_handler


app = Flask(__name__)

app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


app.register_blueprint(home_handler)
app.register_blueprint(ping_handler)
