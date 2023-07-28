from app.models import db, Channel, environment, SCHEMA
from sqlalchemy.sql import text

def seed_channels():
    channel1 = Channel(
        name = 'General1',
        server_id = 1,
        created_by = 1,
        is_public = True,
        description = 'This is a general channel for everyone to use 1'
    )
    channel2 = Channel(
        name='General2',
        server_id = 2,
        created_by = 2,
        is_public = True,
        description = 'This is a general channel for everyone to use 2'
    )
    channel3 = Channel(
        name = 'General3',
        server_id = 3,
        created_by = 3,
        is_public = True,
        description = 'This is a general channel for everyone to use 3'
    )
    channel4 = Channel(
        name = 'General4',
        server_id = 4,
        created_by = 4,
        is_public = True,
        description = 'This is a general channel for everyone to use 4'
    )

    db.session.add(channel1)
    db.session.add(channel2)
    db.session.add(channel3)
    db.session.add(channel4)
    db.session.commit()

    def undo_channels():
        if environment == "production":
            db.session.execute(f"TRUNCATE table {SCHEMA}.channels RESTART IDENTITY CASCADE;")
        else:
            db.session.execute(text("DELETE FROM channels"))

        db.session.commit()