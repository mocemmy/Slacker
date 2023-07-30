import os
from flask_socketio import SocketIO

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "https://slacker-chat-collab.onrender.com"
    ]
else:
    origins = "*"

# create your SocketIO instance
socketio = SocketIO(cors_allowed_origins=origins)