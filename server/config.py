import os

# TEAM_NAME = os.environ['TEAM_NAME']

basedir = os.path.abspath(os.path.dirname(__file__))
SQLALCHEMY_ECHO = False
SQLALCHEMY_TRACK_MODIFICATIONS = True
SQLALCHEMY_DATABASE_URI = "postgresql://localhost/rosebud"
PROPAGATE_EXCEPTIONS = True
JWT_BLACKLIST_ENABLED = True  # enable blacklist feature
JWT_BLACKLIST_TOKEN_CHECKS = [
    "access",
    "refresh",
]
