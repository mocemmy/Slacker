import os
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager
from app.models import db, User, Message
from flask_socketio import SocketIO, emit, join_room, leave_room
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.server_routes import server_routes
from .api.channel_routes import channel_routes
from .api.message_routes import message_routes
from .seeds import seed_commands
from .config import Config

app = Flask(__name__, static_folder='../react-app/build', static_url_path='/')

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(server_routes, url_prefix='/api/servers')
app.register_blueprint(channel_routes, url_prefix='/api/channels')
app.register_blueprint(message_routes, url_prefix='/api/messages')

origins = ""

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "https://slacker-chat-collab.onrender.com"
    ]
else:
    origins = "*"

socketio = SocketIO(app, cors_allowed_origins=origins)

@socketio.on('join')
def handle_join(data):
    room = data['room']
    join_room(room)
    # emit('my_message', {'message': 'You joined the room: ' + room}, room=room)

@socketio.on('leave')
def handle_leave(data):
    room = data['room']
    leave_room(room)
    # emit('my_message', {'message': 'You left the room: ' + room}, room=room)

@socketio.on('my_message')
def handle_message(data):
    message = data['message']
    room = data['channel']
    sent_by = data['sent_by']
    profile_pic = data['profile_pic']
    created_at = data['created_at']
    first_name = data['firstName']
    last_name = data['lastName']
    newMessage = Message(message_body=message, channel_id=room, sent_by=sent_by)

    db.session.add(newMessage)

    db.session.commit()

    id = newMessage.id

    emit('my_message', {'message_body': message, 'first_name': first_name, 'last_name': last_name, 'profile_pic': profile_pic, 'created_at': created_at, 'sent_by': sent_by, 'id': id, 'channel_id': room}, room=room)



db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)


# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........
@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response


@app.route("/api/docs")
def api_help():
    """
    Returns all API routes and their doc strings
    """
    acceptable_methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    route_list = { rule.rule: [[ method for method in rule.methods if method in acceptable_methods ],
                    app.view_functions[rule.endpoint].__doc__ ]
                    for rule in app.url_map.iter_rules() if rule.endpoint != 'static' }
    return route_list


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    """
    This route will direct to the public directory in our
    react builds in the production environment for favicon
    or index.html requests
    """
    if path == 'favicon.ico':
        return app.send_from_directory('public', 'favicon.ico')
    return app.send_static_file('index.html')


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')
