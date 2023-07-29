from app.models import db, environment, SCHEMA
from sqlalchemy.sql import text
from app.models.server_members import server_members

# Adds a demo user, you can add other users here if you want
def seed_server_members():
    connection = db.engine.connect()

    data = [
        {"server_id":1, "user_id":1},
        {"server_id":2, "user_id":1},
        {"server_id":3, "user_id":1},
        {"server_id":4, "user_id":1},
        {"server_id":1, "user_id":2},
        {"server_id":2, "user_id":2},
        {"server_id":3, "user_id":2},
        {"server_id":4, "user_id":2},
        {"server_id":2, "user_id":3},
        {"server_id":2, "user_id":4},
        {"server_id":2, "user_id":5},
        {"server_id":2, "user_id":6},
        {"server_id":2, "user_id":7},
        {"server_id":2, "user_id":8},
        {"server_id":2, "user_id":9},
        {"server_id":2, "user_id":10},
        {"server_id":3, "user_id":11},
        {"server_id":3, "user_id":12},
        {"server_id":4, "user_id":13},
        {"server_id":4, "user_id":14},
    ]

    for member in data:
        connection.execute(server_members.insert(), member)

    connection.close()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_server_members():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.server_members RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM server_members"))

    db.session.commit()
