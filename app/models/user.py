from .db import db, environment, SCHEMA
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime
from .server_members import server_members
from .channel_members import channel_members


class User(db.Model, UserMixin):
    __tablename__ = 'users'


    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)
    bio = db.Column(db.String(255))
    profile_pic = db.Column(db.String, default='/public/userpic.png')
    created_at = db.Column(db.Date, default=datetime.now())
    updated_at = db.Column(db.Date, default=datetime.now())

    owned_servers = db.relationship('Server', back_populates='owner', cascade='all, delete-orphan')

    owned_channels = db.relationship('Channel', back_populates='owner', cascade='all, delete-orphan')

    sent_messages = db.relationship('Message', back_populates='sender', cascade='all, delete-orphan')

    servers = db.relationship('Server', secondary=server_members, back_populates='members')

    channels = db.relationship('Channel', secondary=channel_members, back_populates='members')

    reactions = db.relationship('Reaction', back_populates='user', cascade='all, delete-orphan')


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'bio': self.bio,
            'profile_pic': self.profile_pic,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
