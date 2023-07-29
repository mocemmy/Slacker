from app.models import db, Channel, environment, SCHEMA
from sqlalchemy.sql import text

def seed_channels():
    channel1 = Channel(
        name = 'all-staff',
        server_id = 1,
        created_by = 1,
        is_public = True,
        description = 'This is a general channel for all Corporate staff'
    )
    channel2 = Channel(
        name = 'all-staff',
        server_id = 2,
        created_by = 3,
        is_public = True,
        description = 'This is a general channel for all Scranton staff'
    )
    channel3 = Channel(
        name = 'all-staff',
        server_id = 3,
        created_by = 8,
        is_public = True,
        description = 'This is a general channel for all Stamford staff'
    )
    channel4 = Channel(
        name = 'all-staff',
        server_id = 4,
        created_by = 13,
        is_public = True,
        description = 'This is a general channel for all Utica staff'
    )
    channel5 = Channel(
        name='accounting',
        server_id = 2,
        created_by = 3,
        is_public = True,
        description = 'This is the accounting channel for Scranton'
    )
    channel6 = Channel(
        name = 'sales',
        server_id = 2,
        created_by = 3,
        is_public = True,
        description = 'This is the sales channel for Scranton'
    )
    channel7 = Channel(
        name = 'security',
        server_id = 2,
        created_by = 3,
        is_public = True,
        description = 'This is the security channel for Scranton'
    )

    db.session.add(channel1)
    db.session.add(channel2)
    db.session.add(channel3)
    db.session.add(channel4)
    db.session.add(channel5)
    db.session.add(channel6)
    db.session.add(channel7)
    db.session.commit()

def undo_channels():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.channels RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM channels"))

    db.session.commit()
