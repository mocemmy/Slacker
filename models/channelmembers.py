from .db import db

class ChannelMembers(db.Model):
    __tablename__ = 'channel_members'
    id = db.Column(db.Integer, primary_key=True)
    channel_id = db.Column(db.Integer, db.ForeignKey('channels.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
