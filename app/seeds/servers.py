from app.models import db, Server, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_servers():
    corporate = Server(
        name='Corporate', created_by=1, is_public=True, description='Server for Corporate')
    scranton = Server(
        name='Scranton', created_by=3, is_public=True, description='Server for Scranton')
    stamford = Server(
        name='Stamford', created_by=8, is_public=True, description='Server for Stamford')
    utica = Server(
        name='Utica', created_by=13, is_public=True, description='Server for Utica')

    db.session.add(corporate)
    db.session.add(scranton)
    db.session.add(stamford)
    db.session.add(utica)
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
