from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    david = User(username='david', first_name='David', last_name='Wallace', email='david@office.com', password='password') #1
    jan = User(username='jan', first_name='Jan', last_name='Levinson', email='jan@office.com', password='password') #2
    michael = User(username='michael', first_name='Michael', last_name='Scott', email='michael@office.com', password='password') #3
    dwight = User(username='dwight', first_name='Dwight', last_name='Schrute', email='dwight@office.com', password='password') #4
    jim = User(username='jim', first_name='Jim', last_name='Halpert', email='jim@office.com', password='password') #5
    pam = User(username='pam', first_name='Pam', last_name='Beesley', email='pam@office.com', password='password') #6
    meredith = User(username='meredith', first_name='Meredith', last_name='Palmer', email='meredith@office.com', password='password') #7
    oscar = User(username='oscar', first_name='Oscar', last_name='Martinez', email='oscar@office.com', password='password') #8
    angela = User(username='angela', first_name='Angela', last_name='Martin', email='angela@office.com', password='password') #9
    hank = User(username='hank', first_name='Hank', last_name='Security', email='hank@office.com', password='password') #10
    karen = User(username='karen', first_name='Karen', last_name='Filippelli', email='karen@office.com', password='password') #11
    andy = User(username='andy', first_name='Andy', last_name='Bernard', email='andy@office.com', password='password') #12
    holly = User(username='holly', first_name='Holly', last_name='Flax', email='holly@office.com', password='password') #13
    aj = User(username='aj', first_name='AJ', last_name='Sales', email='aj@office.com', password='password') #14   
    stanley = User(username='stanley', first_name='Stanley', last_name='Hudson', email='stanley@office.com', password='password') #15
    robert = User(username='robert', first_name='Robert', last_name='California', email='robert@office.com', password='password') #16


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
    db.session.add(stanley)
    db.session.add(robert)
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
