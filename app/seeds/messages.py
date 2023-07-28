from app.models import db, Message, environment, SCHEMA
from sqlalchemy.sql import text


#adds seed messages
def seed_messages():
    message1 = Message(
        message_body="Welcome to Channel 1", channel_id=1, sent_by=1
    )
    message2 = Message(
        message_body="Hello world!", channel_id=1, sent_by=2
    )
    message3 = Message(
        message_body="Welcome to Channel 2", channel_id=2, sent_by=1
    )
    message4 = Message(
        message_body="Hello world!", channel_id=2, sent_by=2
    )
    message5 = Message(
        message_body="Welcome to Channel 3", channel_id=3, sent_by=1
    )
    message6 = Message(
        message_body="Hello world!", channel_id=3, sent_by=2
    )
    message7 = Message(
        message_body="Welcome to Channel 4", channel_id=4, sent_by=1
    )
    message8 = Message(
        message_body="Hello world!", channel_id=4, sent_by=2
    )

    db.session.add(message1)
    db.session.add(message2)
    db.session.add(message3)
    db.session.add(message4)
    db.session.add(message5)
    db.session.add(message6)
    db.session.add(message7)
    db.session.add(message8)
    db.session.commit()

def undo_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM messages"))

    db.session.commit()