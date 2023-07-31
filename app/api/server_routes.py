from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Server

server_routes = Blueprint('servers', __name__)

@server_routes.route('/')
@login_required
def servers():
    """
    Query for all servers that the user belongs to and display them
    """
    servers = current_user.servers

    return {"servers": [server.to_dict() for server in servers]}


@server_routes.route('/<int:id>/channels')
@login_required
def channels(id):
    """
    Query for all channels belonging to a server
    """
    server = Server.query.get(id)

    return {"channels": [channel.to_dict() for channel in server.channels]}