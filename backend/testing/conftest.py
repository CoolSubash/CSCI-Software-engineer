import pytest
from app import createApp
from extension import db
from models.User import User
from models.UserDetails import UserDetails
from config.config import TestConfig  # Make sure this import is correct and exists

@pytest.fixture(scope="session")
def app():
    app = createApp(config_class=TestConfig)
    
    with app.app_context():
        db.create_all()
        yield app
        # db.session.remove()
        db.drop_all()


@pytest.fixture
def client(app):
    return app.test_client()

