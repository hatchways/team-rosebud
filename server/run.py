from flask import Flask
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv


def create_app(config_filename):
    load_dotenv(".env")
    app = Flask(__name__)
    app.config.from_object(config_filename)
    app.secret_key = "sanchit"

    from app import api_bp
    app.register_blueprint(api_bp, url_prefix='/api')

    from models import db, ma
    db.init_app(app)
    ma.init_app(app)

    jwt = JWTManager(app)
    
    #  This method will check if a token is blacklisted, and will be called automatically when blacklist is enabled
    from blacklist import BLACKLIST
    
    @jwt.token_in_blacklist_loader
    def check_if_token_in_blacklist(decrypted_token):
        return decrypted_token["jti"] in BLACKLIST

    return app



if __name__ == "__main__":
    app = create_app("config")
    app.run(debug=True)
