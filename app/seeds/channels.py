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
        name = 'all-staff-Scranton',
        server_id = 2,
        created_by = 3,
        is_public = True,
        description = 'This is a general channel for all Scranton staff'
    )
    channel3 = Channel(
        name = 'all-staff-Stamford',
        server_id = 3,
        created_by = 8,
        is_public = True,
        description = 'This is a general channel for all Stamford staff'
    )
    channel4 = Channel(
        name = 'all-staff-Utica',
        server_id = 4,
        created_by = 13,
        is_public = True,
        description = 'This is a general channel for all Utica staff'
    )
    channel5 = Channel(
        name='accounting-Scranton',
        server_id = 2,
        created_by = 3,
        is_public = True,
        description = 'This is the accounting channel for Scranton'
    )
    channel6 = Channel(
        name = 'sales-Scranton',
        server_id = 2,
        created_by = 3,
        is_public = True,
        description = 'This is the sales channel for Scranton'
    )
    channel7 = Channel(
        name = 'security-Scranton',
        server_id = 2,
        created_by = 3,
        is_public = True,
        description = 'This is the security channel for Scranton'
    )
    channel8 = Channel(
        name = 'general-Corpo',
        server_id = 1,
        created_by = 1,
        is_public = True,
        description = 'This is the general channel for Corporate'
    )
    channel9 = Channel(
        name = 'sales-Utica',
        server_id = 4,
        created_by = 13,
        is_public = True,
        description = 'This is the sales channel for Utica'
    )
    channel10 = Channel(
        name = 'service-Stamford',
        server_id = 3,
        created_by = 8,
        is_public = True,
        description = 'This is the customer service channel for Stamford'
    )
    channel11 = Channel(
        name = 'Creators',
        server_id = 1,
        created_by = 20,
        is_public = True,
        description = 'This is the channel for the devs to display our info!'
    )

    db.session.add(channel1)
    db.session.add(channel2)
    db.session.add(channel3)
    db.session.add(channel4)
    db.session.add(channel5)
    db.session.add(channel6)
    db.session.add(channel7)
    db.session.add(channel8)
    db.session.add(channel9)
    db.session.add(channel10)
    db.session.add(channel11)
    db.session.commit()

def undo_channels():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.channels RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM channels"))

    db.session.commit()
