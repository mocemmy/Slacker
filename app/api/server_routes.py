from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Server

server_routes = Blueprint('servers', __name__)

@server_routes.route('/')
@login_required
def servers():
    """
    Query for all servers that the user belongs to and display them
    """
    servers = current_user.servers

    return {"servers": [server.to_dict() for server in servers]}

# Update Server PUT /api/servers/:serverId



@server_routes.route('/<int:id>/channels')
@login_required
def channels(id):
    """
    Query for all channels belonging to a server
    """
    server = Server.query.get(id)

    return {"channels": [channel.to_dict() for channel in server.channels]}


@server_routes.route('/<int:id>', methods=['PUT'])
@login_required
def updateServerById(id):
    print(dir(current_user))
    owned_servers = current_user.owned_servers
    server_id_list = [server.id for server in owned_servers]
    print(server_id_list)
    if id in server_id_list:
        data = request.json
        # update
        server = Server.query.get(id)
        server.name = data["name"]
        #server.created_by = data["created_by"]
        server.is_public = data["is_public"]
        server.profile_pic = data["profile_pic"]
        server.description = data["description"]
        #db.session.add(server)
        db.session.commit()
        return server.to_dict(), 200
    else:
        # error, not authorized
        pass
    return {"message":"Update Done"}, 200