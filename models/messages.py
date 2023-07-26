from .db import db

class Message(db.Model):
    __tablename__ = 'messages'
    id = db.Column(db.Integer, primary_key=True)
    message_body = db.Column(db.Text)
    channel_id = db.Column(db.Integer, db.ForeignKey('channels.id'))
    sent_by = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.Date)
    updated_at = db.Column(db.Date)
    edited = db.Column(db.Boolean)
    parent_message_id = db.Column(db.Integer)
