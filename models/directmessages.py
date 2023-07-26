from .db import db

class DirectMessage(db.Model):
    __tablename__ = 'direct_messages'
    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    recipient_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    message_body = db.Column(db.Text)
    edited = db.Column(db.Boolean)
    created_at = db.Column(db.Date)
    updated_at = db.Column(db.Date)
