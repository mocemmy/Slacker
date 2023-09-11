from flask import Blueprint, request
from flask_login import login_required, current_user
from sqlalchemy import and_
from app.forms import ServerForm
from app.models import db, Server, Channel, Message, User

server_routes = Blueprint('servers', __name__)

# Get list of servers GET /api/servers/

@server_routes.route('/')
@login_required
def servers():
    """
    Query for all servers that the user belongs to and display them
    """
    servers = current_user.servers

    return {"servers": [server.to_dict() for server in servers]}

# Get current user's servers GET /api/servers/current

@server_routes.route('/current', methods=['GET'])
@login_required
def current_users_servers():
    """
    Query for all of the current user's servers
    """
    servers = current_user.owned_servers
    return {"servers": [server.to_dict() for server in servers]}

# Get channels in a server GET  /api/servers/:serverId/channels

@server_routes.route('/<int:id>/channels')
@login_required
def channels(id):
    """
    Query for all channels belonging to a server
    """
    all_channels = Channel.query.filter(Channel.server_id == id).order_by(Channel.created_at).all()

    user_channels = []

    for channel in all_channels:
        if current_user in channel.members:
            user_channels.append(channel.to_dict())

    return {"channels": user_channels}

# Create server POST /api/servers/new

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
        if form.data['profilePic']:
            server = Server(
                name=form.data['name'],
                created_by=current_user.id,
                profile_pic=form.data['profilePic'],
                description=form.data['description']
            )
        else:
            server = Server(
                name=form.data['name'],
                created_by=current_user.id,
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

# Get info of a single server GET /api/servers/:serverId

@server_routes.route('/<int:id>', methods=['GET'])
@login_required
def get_server_by_id(id):
    """
    Get info of a single server
    """
    # Verify this server exists
    server = Server.query.get(id)
    if server is None:
        return {'errors': ['Workspace not found']}, 404

    # Verify the user is in this server
    member_id_list = [member.id for member in server.members]
    if current_user.id not in member_id_list:
        return {'errors': ['Unauthorized']}, 401

    # load owner, members, channels and send it
    owner = server.owner
    #del owner['email']
    members = server.members
    channels = server.channels
    res = {
        'server': server.to_dict(),
        'owner': owner.to_dict_private(),
        'members': [member.to_dict_private() for member in members],
        'channels': [channel.to_dict() for channel in channels]
    }
    return res, 200

# Update server PUT /api/servers/:serverId

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
    print("", data)
    # validation
    form = ServerForm(data=data)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # update
        server.name = form.data["name"]
        #server.created_by = data["created_by"]
        server.profile_pic = form.data["profilePic"]
        server.description = form.data["description"]
        #db.session.add(server)
        db.session.commit()
        return server.to_dict(), 200
    else:
        return {'errors': form.errors}, 400

# Delete a server DELETE /api/servers/:serverId

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

#Join a server GET /api/servers/:serverId/join
@server_routes.route('/<int:id/join', methods=["GET"])
@login_required
def join_server(id):
    """
    Request to join a server by its id
    """
    server = Server.query.get(id)
    if server is None:
        return {'errors': ['Workspace not found']}, 404
    user = User.query.get(current_user.id)
    if user is None:
        return {"errors": [f'Bad request, user with ID {current_user.id} does not exits']}, 400
    member_id_list = [member.id for member in server.members]
    if user.id in member_id_list:
        return {"errors": [f'Bad request, user with ID {user.id} is already in this workspace']}, 400
    server.members.append(user)
    db.session.commit()

    return {'message': f'User with ID {user.id} Successfully joined workspace with {server.id}'}

# Join a server POST /api/servers/:serverId/join
@server_routes.route('/<int:id>/join', methods=['POST'])
@login_required
def request_join_server(id):
    """
    Join a server
    request body:
    {
        'userId': 1
    }
    """
    # check id of server exist, if not return 404
    server = Server.query.get(id)
    if server is None:
        return {'errors': ['Workspace not found']}, 404
    # check server is private, if the current_user is not the owner, return 401 unauthorized
    if server.is_public is False and server.created_by != current_user.id:
        return {'errors': ['Unauthorized']}, 401
    # check if the user exists
    data = request.json
    user = User.query.get(data["userId"])
    if user is None:
        return {"errors": [f'Bad request, user with ID {data["userId"]} does not exits']}, 400
    # check if the user is already in the server
    member_id_list = [member.id for member in server.members]
    if user.id in member_id_list:
        return {"errors": [f'Bad request, user with ID {data["userId"]} is already in this workspace']}, 400
    # we can add the user to the server
    server.members.append(user)
    db.session.commit()
    # add the user to all public channel in the server as well
    channels = server.channels
    for channel in channels:
        channel.members.append(user)
    db.session.commit()
    return {'message': f'User with ID {user.id} Successfully joined workspace with {server.id}'}

# Leave a server GET /api/servers/:serverId/leave

@server_routes.route('/<int:id>/leave', methods=['GET'])
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
        return {'errors': ['Cannot leave a workspace you own']}, 400

    member_id_list = [member.id for member in server.members]

    # if you are not a member of the server should return error
    if current_user.id not in member_id_list:
        return {"errors": ['User is not in workspace']}, 400

    user = User.query.get(current_user.id)

    for channel in server.channels:
        channel.members.remove(user)

    # Deletes user from the server
    server.members.remove(user)
    db.session.commit()

    return {'message': f"User with id {user.id} successfully left the workspace"}


# @server_routes.route('/<int:id>/removeUser', methods=['POST'])
# @login_required


#Search Server Route
@server_routes.route('/search', methods=['POST'])
@login_required
def search_servers():
    """
    Query for servers matching search terms
    """

    #search phrase from the request body
    search_terms = request.json
    search_words = search_terms.split()

    #search for server name, split by words to match Slack's search algorithm
    word_matches = []
    for word in search_words:
        word_matches.append(Server.name.ilike(f'%{word}%'))
    
    and_clauses = and_(*word_matches)
    servers = Server.query.filter(and_clauses).all()
    return {'servers': [server.to_dict() for server in servers]}