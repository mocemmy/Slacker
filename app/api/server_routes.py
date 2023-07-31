from flask import Blueprint, jsonify
from flask_login import login_required, current_user

server_routes = Blueprint('servers', __name__)

@server_routes.route('/')
@login_required
def servers():
    """
    Query for all servers that the user belongs to and display them
    """
    servers = current_user.servers

    return {"servers": [server.to_dict() for server in servers]}
