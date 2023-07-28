from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Message(db.Model):
    __tablename__ = 'messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    message_body = db.Column(db.Text)
    channel_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('channels.id')))
    sent_by = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    edited = db.Column(db.Boolean, default=False)
    parent_message_id = db.Column(db.Integer)
    created_at = db.Column(db.Date, default=datetime.now())
    updated_at = db.Column(db.Date, default=datetime.now())


    def to_dict(self):
          return {
            'id': self.id,
            'message_body': self.message_body,
            'channed_id': self.channed_id,
            'sent_by': self.sent_by,
            'edited': self.edited,
            'parent_message_id': self.parent_message_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
