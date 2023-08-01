from .db import db, environment, SCHEMA, add_prefix_for_prod

server_members = db.Table(
    'server_members',
    db.Model.metadata,
    db.Column('id', db.Integer, primary_key=True, autoincrement=True),
    db.Column('server_id', db.Integer, db.ForeignKey(add_prefix_for_prod('servers.id'))),
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
)

if environment == "production":
    server_members.schema = SCHEMA
