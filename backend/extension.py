from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask import Flask
# Initialize the extensions
db = SQLAlchemy()
bcrypt = Bcrypt()
jwt = JWTManager()

