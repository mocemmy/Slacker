from .db import db

class ThreadMessage(db.Model):
    __tablename__ = 'thread_messages'
    id = db.Column(db.Integer, primary_key=True)
    thread_id = db.Column(db.Integer, db.ForeignKey('threads.id'))
    message_id = db.Column(db.Integer, db.ForeignKey('messages.id'))
