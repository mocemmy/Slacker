from app.models import db, Message, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


#adds seed messages
def seed_messages():

    date_format = '%Y-%m-%d %H:%M:%S'

    message1 = Message(
        message_body="Jan, did you get those reports done?", channel_id=1, sent_by=1, created_at=datetime.strptime('2023-08-04 11:00:26', date_format)
    )
    message2 = Message(
        message_body="David, I told you my sister was in town!", channel_id=1, sent_by=2, created_at=datetime.strptime("2023-08-04 11:01:26", date_format)
    )
    message3 = Message(
        message_body="You smoke in your office and go to Scranton far too often, you're fired!!", channel_id=1, sent_by=1, created_at=datetime.strptime("2023-08-04 11:02:26", date_format)
    )
    message24 = Message(
        message_body="If it's because of my enhancement I'll see you in court!", channel_id=1, sent_by=2, created_at=datetime.strptime("2023-08-04 11:23:26", date_format)
    )
    message4 = Message(
        message_body="Goood morning Viet-Scranton!", channel_id=2, sent_by=3, created_at=datetime.strptime("2023-08-04 11:03:26", date_format)
    )
    message5 = Message(
        message_body="Good morning, Michael! I know you slept well, I saw you.", channel_id=2, sent_by=4, created_at=datetime.strptime("2023-08-04 11:04:26", date_format)
    )
    message6 = Message(
        message_body="...", channel_id=2, sent_by=5, created_at=datetime.strptime("2023-08-04 11:05:26", date_format)
    )
    message7 = Message(
        message_body="Ok Dwight", channel_id=2, sent_by=7, created_at=datetime.strptime("2023-08-04 11:06:26", date_format)
    )
    message8 = Message(
        message_body="Hey everyone, let's listen to Meredith because she's so innocent.", channel_id=2, sent_by=9, created_at=datetime.strptime("2023-08-04 11:07:26", date_format)
    )
    message9 = Message(
        message_body="This is a work channel people.", channel_id=2, sent_by=1, created_at=datetime.strptime("2023-08-04 11:08:26", date_format)
    )
    message10 = Message(
        message_body="Hi David, did you get a chance to look over my mockups yet?", channel_id=2, sent_by=6, created_at=datetime.strptime("2023-08-04 11:09:26", date_format)
    )
    message11 = Message(
        message_body="Call of Duty?", channel_id=3, sent_by=11, created_at=datetime.strptime("2023-08-04 11:10:26", date_format)
    )
    message12 = Message(
        message_body="Rit-Dit-Do-Do-Do you have to ask?!", channel_id=3, sent_by=12, created_at=datetime.strptime("2023-08-04 11:11:26", date_format)
    )
    message25 = Message(
        message_body="Don't go sniper in Carentan again, Andy.", channel_id=3, sent_by=11, created_at=datetime.strptime("2023-08-04 11:24:26", date_format)
    )
    message13 = Message(
        message_body="Free for dinner tonight?", channel_id=4, sent_by=13, created_at=datetime.strptime("2023-08-04 11:12:26", date_format)
    )
    message14 = Message(
        message_body="Always!", channel_id=4, sent_by=14, created_at=datetime.strptime("2023-08-04 11:13:26", date_format)
    )
    message26 = Message(
        message_body="Pick you up at 8?", channel_id=4, sent_by=13, created_at=datetime.strptime("2023-08-04 11:25:26", date_format)
    )
    message27 = Message(
        message_body="Great!", channel_id=4, sent_by=14, created_at=datetime.strptime("2023-08-04 11:26:26", date_format)
    )
    message15 = Message(
        message_body="Oscar, I need another advance on my paycheck.", channel_id=5, sent_by=3, created_at=datetime.strptime("2023-08-04 11:14:26", date_format)
    )
    message16 = Message(
        message_body="Michael, are you having money problems?", channel_id=5, sent_by=8, created_at=datetime.strptime("2023-08-04 11:15:26", date_format)
    )
    message17 = Message(
        message_body="Monkey problems?", channel_id=5, sent_by=9, created_at=datetime.strptime("2023-08-04 11:16:26", date_format)
    )
    message18 = Message(
        message_body="I know you saw that correctly.", channel_id=5, sent_by=8, created_at=datetime.strptime("2023-08-04 11:17:26", date_format)
    )
    message19 = Message(
        message_body="Attention Sales Staff: The new website will be live today, good luck!", channel_id=6, sent_by=3, created_at=datetime.strptime("2023-08-04 11:18:26", date_format)
    )
    message20 = Message(
        message_body="Do you really think a computer can beat me?", channel_id=6, sent_by=4, created_at=datetime.strptime("2023-08-04 11:19:26", date_format)
    )
    message21 = Message(
        message_body="It will, Dwight.", channel_id=6, sent_by=5, created_at=datetime.strptime("2023-08-04 11:20:26", date_format)
    )
    message28 = Message(
        message_body="Andy, get the counter.", channel_id=6, sent_by=4, created_at=datetime.strptime("2023-08-04 11:27:26", date_format)
    )
    message29 = Message(
        message_body="Right-O boss-O!", channel_id=6, sent_by=12, created_at=datetime.strptime("2023-08-04 11:28:26", date_format)
    )
    message22 = Message(
        message_body="911", channel_id=7, sent_by=3, created_at=datetime.strptime("2023-08-04 11:21:26", date_format)
    )
    message23 = Message(
        message_body="You know I hustled up the stairs....", channel_id=7, sent_by=10, created_at=datetime.strptime("2023-08-04 11:22:26", date_format)
    )
    message29 = Message(
        message_body="You could use it.", channel_id=7, sent_by=3, created_at=datetime.strptime("2023-08-04 11:28:26", date_format)
    )
    message30 = Message(
        message_body="Advertising team meeting in 10 minutes", channel_id=8, sent_by=2, created_at=datetime.strptime("2023-08-04 11:29:26", date_format)
    )
    message31 = Message(
        message_body="Make it 15, in a call.", channel_id=8, sent_by=1, created_at=datetime.strptime("2023-08-04 11:30:26", date_format)
    )
    message32 = Message(
        message_body="Ok, David.", channel_id=8, sent_by=2, created_at=datetime.strptime("2023-08-04 11:31:26", date_format)
    )
    message33 = Message(
        message_body="Scranton is trying to compete with us, lol", channel_id=9, sent_by=14, created_at=datetime.strptime("2023-08-04 11:32:26", date_format)
    )
    message34 = Message(
        message_body="Be nice...", channel_id=9, sent_by=13, created_at=datetime.strptime("2023-08-04 11:33:26", date_format)
    )
    message35 = Message(
        message_body="Scranton is trying very nicely to compete with us...", channel_id=9, sent_by=14, created_at=datetime.strptime("2023-08-04 11:34:26", date_format)
    )
    message36 = Message(
        message_body=":/", channel_id=9, sent_by=13, created_at=datetime.strptime("2023-08-04 11:35:26", date_format)
    )
    message37 = Message(
        message_body="What's up with my report scores?", channel_id=10, sent_by=12, created_at=datetime.strptime("2023-08-04 11:36:26", date_format)
    )
    message38 = Message(
        message_body="Maybe you should try selling something, Andy.", channel_id=10, sent_by=11, created_at=datetime.strptime("2023-08-04 11:37:26", date_format)
    )
    message39 = Message(
        message_body="Maybe you should try selling...your butt", channel_id=10, sent_by=12, created_at=datetime.strptime("2023-08-04 11:38:26", date_format)
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
    db.session.add(message23)
    db.session.add(message24)
    db.session.add(message25)
    db.session.add(message26)
    db.session.add(message27)
    db.session.add(message28)
    db.session.add(message29)
    db.session.add(message30)
    db.session.add(message31)
    db.session.add(message32)
    db.session.add(message33)
    db.session.add(message34)
    db.session.add(message35)
    db.session.add(message36)
    db.session.add(message37)
    db.session.add(message38)
    db.session.add(message39)
    db.session.commit()

def undo_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM messages"))

    db.session.commit()
