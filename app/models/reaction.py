from .db import db, environment, SCHEMA, add_prefix_for_prod

class Reaction(db.Model):
    __tablename__ = 'reactions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    message_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('messages.id')))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    reaction_type = db.Column(db.Integer)


    def to_dict(self):
          return {
            'id': self.id,
            'message_id': self.message_id,
            'user_id': self.user_id,
            'reaction_type': self.reaction_type,
        }
