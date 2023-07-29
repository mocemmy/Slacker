from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    david = User(username='david', email='david@office.com', password='password')
    jan = User(username='jan', email='jan@office.com', password='password')
    michael = User(username='michael', email='michael@office.com', password='password')
    dwight = User(username='dwight', email='dwight@office.com', password='password')
    jim = User(username='jim', email='jim@office.com', password='password')
    pam = User(username='pam', email='pam@office.com', password='password')
    meredith = User(username='meredith', email='meredith@office.com', password='password')
    oscar = User(username='oscar', email='oscar@office.com', password='password')
    angela = User(username='angela', email='angela@office.com', password='password')
    hank = User(username='hank', email='hank@office.com', password='password')
    karen = User(username='karen', email='karen@office.com', password='password')
    andy = User(username='andy', email='andy@office.com', password='password')
    holly = User(username='holly', email='holly@office.com', password='password')
    aj = User(username='aj', email='aj@office.com', password='password')


    db.session.add(david)
    db.session.add(jan)
    db.session.add(michael)
    db.session.add(dwight)
    db.session.add(jim)
    db.session.add(pam)
    db.session.add(meredith)
    db.session.add(oscar)
    db.session.add(angela)
    db.session.add(hank)
    db.session.add(karen)
    db.session.add(andy)
    db.session.add(holly)
    db.session.add(aj)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
