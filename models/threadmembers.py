from .db import db

class ThreadMembers(db.Model):
    __tablename__ = 'thread_members'
    id = db.Column(db.Integer, primary_key=True)
    thread_id = db.Column(db.Integer, db.ForeignKey('threads.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
