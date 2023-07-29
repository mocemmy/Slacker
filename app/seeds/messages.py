from app.models import db, Message, environment, SCHEMA
from sqlalchemy.sql import text


#adds seed messages
def seed_messages():
    message1 = Message(
        message_body="Jan, did you get those reports done?", channel_id=1, sent_by=1
    )
    message2 = Message(
        message_body="David, I told you my sister was in town!", channel_id=1, sent_by=2
    )
    message3 = Message(
        message_body="You smoke in your office and go to Scranton far too often, you're fired!!", channel_id=1, sent_by=1
    )
    message4 = Message(
        message_body="Goood morning Scranton!", channel_id=2, sent_by=3
    )
    message5 = Message(
        message_body="Good morning, Michael! I know you slept well, I saw you.", channel_id=2, sent_by=4
    )
    message6 = Message(
        message_body="...", channel_id=2, sent_by=5
    )
    message7 = Message(
        message_body="Dwight is creepy", channel_id=2, sent_by=7
    )
    message8 = Message(
        message_body="Hey everyone, let's listen to Meredith because she's so innocent.", channel_id=2, sent_by=9
    )
    message9 = Message(
        message_body="This is a work channel, please be respectful.", channel_id=2, sent_by=1
    )
    message10 = Message(
        message_body="Hi David, did you get a chance to look over my mockups yet?", channel_id=2, sent_by=6
    )
    message11 = Message(
        message_body="Call of Duty?", channel_id=3, sent_by=11
    )
    message12 = Message(
        message_body="Rit-Dit-Do-Do-Do you have to ask?!", channel_id=3, sent_by=12
    )
    message13 = Message(
        message_body="Free for dinner tonight?", channel_id=4, sent_by=13
    )
    message14 = Message(
        message_body="Always!", channel_id=4, sent_by=14
    )
    message15 = Message(
        message_body="Oscar, I need another advance on my paycheck.", channel_id=5, sent_by=3
    )
    message16 = Message(
        message_body="Michael, are you having money problems?", channel_id=5, sent_by=8
    )
    message17 = Message(
        message_body="Monkey problems?", channel_id=5, sent_by=9
    )
    message18 = Message(
        message_body="Attention Sales Staff: The new website will be live today, good luck!", channel_id=6, sent_by=3
    )
    message19 = Message(
        message_body="Do you really think a computer can beat me?", channel_id=6, sent_by=4
    )
    message20 = Message(
        message_body="It will.", channel_id=6, sent_by=5
    )
    message21 = Message(
        message_body="911", channel_id=7, sent_by=3
    )
    message22 = Message(
        message_body="Next time I hustle up the stairs for no reason you're paying the price.", channel_id=7, sent_by=10
    )

    db.session.add(message1)
    db.session.add(message2)
    db.session.add(message3)
    db.session.add(message4)
    db.session.add(message5)
    db.session.add(message6)
    db.session.add(message7)
    db.session.add(message8)
    db.session.add(message9)
    db.session.add(message10)
    db.session.add(message11)
    db.session.add(message12)
    db.session.add(message13)
    db.session.add(message14)
    db.session.add(message15)
    db.session.add(message16)
    db.session.add(message17)
    db.session.add(message18)
    db.session.add(message19)
    db.session.add(message20)
    db.session.add(message21)
    db.session.add(message22)
    db.session.commit()

def undo_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM messages"))

    db.session.commit()
