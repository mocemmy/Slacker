from .db import db, environment, SCHEMA, add_prefix_for_prod

channel_members = db.Table(
    'channel_members',
    db.Model.metadata,
    channel_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('channels.id')), primary_key=True),
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True)
)

if environment == "production":
    channel_members.schema = SCHEMA
