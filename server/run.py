from flask import Flask


def create_app(config_filename):
    app = Flask(__name__)
    app.config.from_object(config_filename)

    from app import api_bp
    app.register_blueprint(api_bp, url_prefix='/api')

    from api.ping_handler import ping_handler
    app.register_blueprint(ping_handler)

    from api.home_handler import home_handler
    app.register_blueprint(home_handler)

    from models import db
    db.init_app(app)

    return app


if __name__ == "__main__":
    app = create_app("config")
    app.run(debug=True)
