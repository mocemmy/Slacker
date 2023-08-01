from app.models import db, environment, SCHEMA
from sqlalchemy.sql import text
from app.models.channel_members import channel_members

# Adds a demo user, you can add other users here if you want
def seed_channel_members():
    connection = db.engine.connect()

    data = [
        {"channel_id":1, "user_id":1},
        {"channel_id":2, "user_id":1},
        {"channel_id":3, "user_id":1},
        {"channel_id":4, "user_id":1},
        {"channel_id":5, "user_id":1},
        {"channel_id":6, "user_id":1},
        {"channel_id":7, "user_id":1},
        {"channel_id":8, "user_id":1},
        {"channel_id":9, "user_id":1},
        {"channel_id":10, "user_id":1},
        {"channel_id":1, "user_id":2},
        {"channel_id":2, "user_id":2},
        {"channel_id":3, "user_id":2},
        {"channel_id":4, "user_id":2},
        {"channel_id":5, "user_id":2},
        {"channel_id":6, "user_id":2},
        {"channel_id":7, "user_id":2},
        {"channel_id":8, "user_id":2},
        {"channel_id":9, "user_id":2},
        {"channel_id":10, "user_id":2},
        {"channel_id":2, "user_id":3},
        {"channel_id":5, "user_id":3},
        {"channel_id":6, "user_id":3},
        {"channel_id":7, "user_id":3},
        {"channel_id":2, "user_id":4},
        {"channel_id":6, "user_id":4},
        {"channel_id":2, "user_id":5},
        {"channel_id":6, "user_id":5},
        {"channel_id":2, "user_id":6},
        {"channel_id":2, "user_id":7},
        {"channel_id":2, "user_id":8},
        {"channel_id":5, "user_id":8},
        {"channel_id":2, "user_id":9},
        {"channel_id":5, "user_id":9},
        {"channel_id":2, "user_id":10},
        {"channel_id":7, "user_id":10},
        {"channel_id":3, "user_id":11},
        {"channel_id":3, "user_id":12},
        {"channel_id":4, "user_id":13},
        {"channel_id":9, "user_id":13},
        {"channel_id":4, "user_id":14},
        {"channel_id":9, "user_id":14},
    ]

    for member in data:
        connection.execute(channel_members.insert(), member)

    connection.close()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_channel_members():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.channel_members RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM channel_members"))

    db.session.commit()
