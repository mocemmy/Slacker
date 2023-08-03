from flask import Blueprint, request
from flask_login import login_required, current_user
from app.forms import ServerForm
from app.models import db, Server, Channel, Message, User

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

@server_routes.route('/current', methods=['GET'])
@login_required
def current_users_servers():
    """
    Query for all of the current user's servers
    """
    servers = current_user.owned_servers
    return {"servers": [server.to_dict() for server in servers]}

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
            name=form.data['name'],
            created_by=current_user.id,
            is_public=form.data['isPublic'],
            profile_pic=form.data['profilePic'],
            description=form.data['description']
        )
        server.members.append(current_user)
        db.session.add(server)
        db.session.commit()

        default_channel = Channel(
            name='General',
            server_id=server.id,
            created_by=current_user.id,
            is_public=True,
            description='A general chat for everyone to use'
        )
        default_channel.members.append(current_user)
        db.session.add(default_channel)
        db.session.commit()

        default_message = Message(
            message_body='Server created - this is a default channel created for you!',
            channel_id=default_channel.id,
            sent_by=current_user.id
        )
        db.session.add(default_message)
        db.session.commit()

        return server.to_dict(), 201
    else:
        return {'errors': form.errors}, 400


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

    if id not in server_id_list:
        return {'errors': ['Unauthorized']}, 401

    data = request.json
    # validation
    form = ServerForm(data=data)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # update
        server.name = form.data["name"]
        #server.created_by = data["created_by"]
        server.is_public = form.data["isPublic"]
        server.profile_pic = form.data["profilePic"]
        server.description = form.data["description"]
        #db.session.add(server)
        db.session.commit()
        return server.to_dict(), 200
    else:
        return {'errors': form.errors}, 400



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

@server_routes.route('/<int:id>/join', methods=['POST'])
@login_required
def request_join_server(id):
    """
    Join a server
    request body:
    {
        'id': 1
    }
    """
    # check id of server exist, if not return 404
    server = Server.query.get(id)
    if server is None:
        return {'errors': ['Resource not found']}, 404
    # check server is private, if the current_user is not the owner, return 401 unauthorized
    if server.is_public is False and server.created_by != current_user.id:
        return {'errors': ['Unauthorized']}, 401
    # check if the user exists
    data = request.json
    user = User.query.get(data["id"])
    if user is None:
        return {"errors": [f'Bad request, user with {data["id"]} does not exits']}, 400
    # check if the user is already in the server
    member_id_list = [member.id for member in server.members]
    if user.id in member_id_list:
        return {"errors": [f'Bad request, user with {data["id"]} is already in this workspace']}, 400
    # we can add the user to the server
    server.members.append(user)
    db.session.commit()
    # add the user to all public channel in the server as well
    channels = server.channels
    for channel in channels:
        channel.members.append(user)
    db.session.commit()
    return {'message': f'User with id {user.id} Successfully joined workspace with {server.id}'}

@server_routes.route('/<int:id>/leave', methods=['POST'])
@login_required
def request_leave_server(id):
    """
    leave a server by ID
    """

    # if server does not exist return error
    server = Server.query.get(id)
    if server is None:
        return {'errors': ['Workspace not found']}, 404

    # if you are owner of the server you cannot leave
    if server.created_by == current_user.id:
        return {'errors': ['Cannot leave server you own']}, 400

    # if you are not a member of the server should return error
    member_id_list = [member.id for member in server.members]
    if current_user.id not in member_id_list:
        return {"errors": ['User is not in workspace']}, 400

# @server_routes.route('/<int:id>/removeUser', methods=['POST'])
# @login_required