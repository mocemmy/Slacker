from .db import db

class Server(db.Model):
    __tablename__ = 'servers'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    created_by = db.Column(db.Integer, db.ForeignKey('users.id'))
    is_public = db.Column(db.Boolean)
    description = db.Column(db.String)
    created_at = db.Column(db.Date)
    updated_at = db.Column(db.Date)
