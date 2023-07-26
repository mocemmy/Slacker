from .db import db

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    email = db.Column(db.String)
    password = db.Column(db.String)
    bio = db.Column(db.String)
    profile_pic = db.Column(db.String)
    created_at = db.Column(db.Date)
    updated_at = db.Column(db.Date)
