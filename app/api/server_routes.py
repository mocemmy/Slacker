from flask import Blueprint, request
from flask_login import login_required, current_user
from app.forms import ServerForm
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


@server_routes.route('/new', methods=['POST'])
@login_required
def create_new_server():
    """
    Creates a new server
    """
    data = request.json
    form = ServerForm(data=data)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        server = Server(
            name = data['name'],
            created_by = current_user.id,
            is_public = data['isPublic'],
            profile_pic = data['profilePic'],
            description = data['description']
        )
        # db.session.add(server)
        # db.session.commit()
    else:
        return {'errors': [form.errors]}


@server_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_server_by_id(id):
    """
    Updates a server by Id
    """
    owned_servers = current_user.owned_servers
    server_id_list = [server.id for server in owned_servers]
    server = Server.query.get(id)

    if server is None:
        return {'errors': ['Resource not found']}, 404

    if id in server_id_list:
        data = request.json
        # update
        server.name = data["name"]
        #server.created_by = data["created_by"]
        server.is_public = data["is_public"]
        server.profile_pic = data["profile_pic"]
        server.description = data["description"]
        #db.session.add(server)
        db.session.commit()
        return server.to_dict(), 200
    else:
        return {'errors': ['Unauthorized']}, 401


@server_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_server_by_id(id):
    """
    Deletes a server by Id
    """
    owned_servers = current_user.owned_servers
    server_id_list = [server.id for server in owned_servers]
    server = Server.query.get(id)

    if server is None:
        return {'errors': ['Resource not found']}, 404
    
    if id in server_id_list:
        db.session.delete(server)
        db.session.commit()
        return {'message': 'Successfully deleted'}
    else:
        return {'errors': ['Unauthorized']}, 401