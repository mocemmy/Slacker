from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from app.models import ChannelMembers

class Channel(db.Model):
    __tablename__ = 'channels'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    server_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('servers.id')))
    created_by = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    is_public = db.Column(db.Boolean, default=True)
    description = db.Column(db.String(255))
    created_at = db.Column(db.Date, default=datetime.now())
    updated_at = db.Column(db.Date, default=datetime.now())

    servers = db.relationship('Server', back_populates='channels')

    messages = db.relationship('Message', back_populates='channel', cascade='all, delete-orphan')

    members = db.relationship('User', secondary=ChannelMembers, back_populates='channels')

    owner = db.relationship('User', back_populates='owned_channels')


    def to_dict(self):
          return {
            'id': self.id,
            'name': self.name,
            'server_id': self.server_id,
            'created_by': self.created_by,
            'is_public': self.is_public,
            'description': self.description,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
