from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Message, db
import json

message_routes = Blueprint('messages', __name__)

@message_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_message(id):
    """
    Delete message by Id
    """
    message = Message.query.get(id)

    if not message:
        return {"message": "Message not found!"}
    elif (current_user.id == message.sent_by):
        db.session.delete(message)
        db.session.commit()
        return {"message": f"Message {id} successfully deleted"}
    else:
        return {"message": 'Not your message!'}

@message_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def update_message(id):
    """
    Edit Message by Id
    """
    message = Message.query.get(id)
    data = json.loads(request.data)

    message.message_body = data['message_body']

    db.session.commit()

    return message.to_dict()
