from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db
from app.forms import EditUserForm
from app.api.auth_routes import validation_errors_to_error_messages

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

@user_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_user(id):
    """
    Delete user by id
    """
    if current_user.id != id:
        return {"message": "You can't delete someone else!"}

    user = User.query.get(id)
    if user :
        db.session.delete(user)
        db.session.commit()
        return {"message": "You deleted yourself :)"} 
    else:
        return {"message": "User not found"}, 404



@user_routes.route('/<int:id>/edit', methods=["PUT"])
@login_required
def edit_user(id):
    """
    Edit user information by id
    """
    user = User.query.get(id)
    if not user:
        return {"message": "User not found"}, 404

    form = EditUserForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user.first_name = form.data['first_name']
        user.last_name = form.data['last_name']
        user.bio = form.data['bio']
        user.profile_pic = form.data['profile_pic']
        db.session.commit()
        return {"message": "User Updated"}
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
        

@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

