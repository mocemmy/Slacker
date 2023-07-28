from app.models import db, Server, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_servers():
    north = Server(
        name='North', created_by=1, is_public=True, description='Server for the North Side')
    south = Server(
        name='South', created_by=2, is_public=True, description='Server for the South Side')
    east = Server(
        name='East', created_by=3, is_public=True, description='Server for the East Side')
    west = Server(
        name='West', created_by=4, is_public=True, description='Server for the West Side')

    db.session.add(north)
    db.session.add(south)
    db.session.add(east)
    db.session.add(west)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_servers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.servers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM servers"))

    db.session.commit()
