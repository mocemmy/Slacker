from .db import db

class Channel(db.Model):
    __tablename__ = 'channels'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    server_id = db.Column(db.Integer, db.ForeignKey('servers.id'))
    created_by = db.Column(db.Integer, db.ForeignKey('users.id'))
    is_public = db.Column(db.Boolean)
    description = db.Column(db.String)
    created_at = db.Column(db.Date)
    updated_at = db.Column(db.Date)
