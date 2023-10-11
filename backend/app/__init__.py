from flask import Flask
from .courses import courses

def create_app():
    app = Flask(__name__)
    app.register_blueprint(courses)
    
    return app
