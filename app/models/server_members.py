from .db import db, environment, SCHEMA, add_prefix_for_prod

class ServerMembers(db.Model):
    __tablename__ = 'server_members'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    server_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('servers.id')), primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True)
