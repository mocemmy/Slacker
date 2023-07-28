from .db import db, environment, SCHEMA, add_prefix_for_prod

server_members = db.Table(
    'server_members',
    db.Model.metadata,
    db.Column('server_id', db.Integer, db.ForeignKey(add_prefix_for_prod('servers.id'), primary_key=True)),
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), primary_key=True))
)

if environment == "production":
    server_members.schema = SCHEMA
