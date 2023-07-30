from flask import Blueprint
from flask_login import login_required, current_user
from app.models import User, Server, Channel, Message

test_routes = Blueprint('test', __name__)

@test_routes.route('/')
@login_required
def test_index():
    print(current_user)
    return {"message": "This is a test route"}