from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Channel

channel_routes = Blueprint('channels', __name__)

@channel_routes.route("/<int:id>/messages")
@login_required
def messages(id):
    """
    Query for all messages for the current channel
    """
    channel = Channel.query.get(id)

    return {"messages": [message.to_dict() for message in channel.messages]}