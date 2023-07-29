from app.models import db, Reaction, environment, SCHEMA
from sqlalchemy.sql import text

# Adds a demo user, you can add other users here if you want
def seed_reactions():


    reaction1 = Reaction(message_id=1, user_id=2, reaction_type='&#128512')
    reaction2 = Reaction(message_id=2, user_id=1, reaction_type='&#128545')
    reaction3 = Reaction(message_id=3, user_id=2, reaction_type='&#128545')
    reaction4 = Reaction(message_id=4, user_id=5, reaction_type='&#128526')
    reaction4 = Reaction(message_id=4, user_id=6, reaction_type='&#128526')
    reaction5 = Reaction(message_id=5, user_id=6, reaction_type='&#128550')
    reaction6 = Reaction(message_id=7, user_id=8, reaction_type='&#128070')
    reaction7 = Reaction(message_id=7, user_id=9, reaction_type='&#128070')
    reaction8 = Reaction(message_id=8, user_id=5, reaction_type='&#128514')
    reaction9 = Reaction(message_id=10, user_id=1, reaction_type='&#128528')
    reaction10 = Reaction(message_id=11, user_id=12, reaction_type='&#128077')
    reaction11 = Reaction(message_id=13, user_id=13, reaction_type='&#128151')
    reaction12 = Reaction(message_id=14, user_id=14, reaction_type='&#128151')
    reaction13 = Reaction(message_id=15, user_id=8, reaction_type='&#128078')
    reaction14 = Reaction(message_id=15, user_id=9, reaction_type='&#128078')
    reaction15 = Reaction(message_id=16, user_id=3, reaction_type='&#128532')
    reaction16 = Reaction(message_id=17, user_id=9, reaction_type='&#128545')
    reaction17 = Reaction(message_id=18, user_id=4, reaction_type='&#128545')
    reaction18 = Reaction(message_id=18, user_id=5, reaction_type='&#128526')
    reaction19 = Reaction(message_id=19, user_id=5, reaction_type='&#128514')
    reaction20 = Reaction(message_id=20, user_id=4, reaction_type='&#128545')
    reaction21 = Reaction(message_id=21, user_id=10, reaction_type='&#128077')

    db.session.add(reaction1)
    db.session.add(reaction2)
    db.session.add(reaction3)
    db.session.add(reaction4)
    db.session.add(reaction5)
    db.session.add(reaction6)
    db.session.add(reaction7)
    db.session.add(reaction8)
    db.session.add(reaction9)
    db.session.add(reaction10)
    db.session.add(reaction11)
    db.session.add(reaction12)
    db.session.add(reaction13)
    db.session.add(reaction14)
    db.session.add(reaction15)
    db.session.add(reaction16)
    db.session.add(reaction17)
    db.session.add(reaction18)
    db.session.add(reaction19)
    db.session.add(reaction20)
    db.session.add(reaction21)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reactions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reactions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reactions"))

    db.session.commit()
