from app.models import db, environment, SCHEMA
from sqlalchemy.sql import text

# Adds a demo user, you can add other users here if you want
def seed_server_members():

    member1 = ServerMembers(server_id=1, user_id=1)
    member2 = ServerMembers(server_id=2, user_id=2)
    member3 = ServerMembers(server_id=3, user_id=3)
    member4 = ServerMembers(server_id=4, user_id=4)
    member5 = ServerMembers(server_id=1, user_id=4)
    member6 = ServerMembers(server_id=2, user_id=3)
    member7 = ServerMembers(server_id=3, user_id=2)
    member8 = ServerMembers(server_id=4, user_id=1)

    db.session.add(member1)
    db.session.add(member2)
    db.session.add(member2)
    db.session.add(member3)
    db.session.add(member4)
    db.session.add(member5)
    db.session.add(member6)
    db.session.add(member7)
    db.session.add(member8)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_server_members():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.servermembers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM servermembers"))

    db.session.commit()
