from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .server_members import ServerMembers

class Server(db.Model):
    __tablename__ = 'servers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    created_by = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    is_public = db.Column(db.Boolean, default=True)
    description = db.Column(db.String(255))
    created_at = db.Column(db.Date, default=datetime.now())
    updated_at = db.Column(db.Date, default=datetime.now())

    owner = db.relationship('User', back_populates='owned_servers')

    members = db.relationship('User', secondary=ServerMembers, back_populates='servers')

    channels = db.relationship('Channel', back_populates='servers', cascade='all, delete-orphan')


    def to_dict(self):
          return {
            'id': self.id,
            'name': self.name,
            'created_by': self.created_by,
            'is_public': self.is_public,
            'description': self.description,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
