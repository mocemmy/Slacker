from .db import db

class ServerMembers(db.Model):
    __tablename__ = 'server_members'
    id = db.Column(db.Integer, primary_key=True)
    server_id = db.Column(db.Integer, db.ForeignKey('servers.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
