from flask import Blueprint
from flask_login import login_required, current_user
from flask_socketio import join_room as join_channel, leave_room as leave_channel, send
from app import socketio
from app.models import db, User, Server, Channel, Message

test_routes = Blueprint('test', __name__)

@test_routes.route('/')
@login_required
def test_index():
    return {"current_user": current_user.to_dict()}

@test_routes.route('/servers-and-channels')
@login_required
def test_get_servers_and_channels():
    print('---------------test route----------------')
    servers = current_user.servers
    channels = current_user.channels
    print('---------------end route----------------')
    return {"servers": [server.to_dict() for server in servers],
            "channels": [channel.to_dict() for channel in channels]}

@test_routes.route('/channel/<int:channel_id>/messages')
@login_required
def test_get_messages_in_channel(channel_id):
    messages = Message.query.filter(Message.channel_id == channel_id).order_by(Message.created_at)
    return {"messages": [message.to_dict() for message in messages]}

@socketio.on('message')
def handle_message(message):
    print(message)
    send(message)

@socketio.on('join')
def on_join(data):
    print('server data', data)
    user = data['user_id']
    channel = data['channel_id']
    join_channel(channel)
    send(user + ' has entered the channel.', to=channel)

@socketio.on('leave')
def on_leave(data):
    user = data['user_id']
    channel = data['channel_id']
    leave_channel(channel)
    send(user + ' has left the channel.', to=channel)