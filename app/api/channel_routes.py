from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Channel, db
import json
from datetime import datetime
from app.forms import ChannelForm
from app.api.auth_routes import validation_errors_to_error_messages


channel_routes = Blueprint('channels', __name__)

@channel_routes.route("/<int:id>/messages")
@login_required
def messages(id):
    """
    Query for all messages for the current channel
    """
    channel = Channel.query.get(id)

    return {"messages": [message.to_dict() for message in channel.messages]}

@channel_routes.route('/new', methods=['POST'])
@login_required
def create_channel():
    """
    Create a new channel for a server
    """
    form = ChannelForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        name = form.data['name']
        server_id = form.data['server_id']
        created_by = form.data['created_by']
        description = form.data['description']

        new_channel = Channel(name=name, server_id=server_id, created_by=created_by, description=description)

        new_channel.members.append(current_user)
        db.session.add(new_channel)
        db.session.commit()

        return new_channel.to_dict(), 201


    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



@channel_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_channel(id):
    """
    Delete a channel by Id
    """
    channel = Channel.query.get(id)

    if channel.created_by == current_user.id:
        db.session.delete(channel)
        db.session.commit()
        return {'message': f"{channel.name} was deleted successfully!"}

    return {'message': 'Not your channel!'}, 403

@channel_routes.route('<int:id>/edit', methods=["PUT"])
@login_required
def edit_channel(id):
    """
    Edit a channel by Id
    """
    channel = Channel.query.get(id)

    form = ChannelForm()
    print('*******************', ChannelForm())
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        name = form.data['name']
        description = form.data['description']

        channel.name = name
        channel.description = description
        channel.updated_at = datetime.now()

        db.session.commit()

        return channel.to_dict()


    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@channel_routes.route('/<int:id>/leave', methods=['DELETE'])
@login_required
def leave_channel(id):
    """
    leave a channel by ID
    """
    channel = Channel.query.get(id)
    if channel is None:
        return {'errors': ['Channel not found']}, 404
    if channel.created_by == current_user.id:
        return {'errors': ['Cannot leave channel you own']}, 400
    for member in channel.members:
        if member.id == current_user.id:
            channel.members.remove(current_user)
            db.session.commit()
            return {'message': 'You left the channel!'}

    return {"errors": ['User is not in channel']}, 400
