from app.models import db, User, Channel, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_channels():
    channel_1 = Channel(name="Food", server_id=1)
    channel_2 = Channel(name="Water", server_id=1)
    channel_3 = Channel(name="Camping", server_id=3)
    channel_4 = Channel(name="Horses", server_id=3)
    channel_5 = Channel(name="Work", server_id=2)
    channel_6 = Channel(name="Recovery", server_id=1)

    channel_list = [channel_1, channel_2, channel_3, channel_4, channel_5, channel_6]

    for channel in channel_list:
        db.session.add(channel)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_channel():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.channels RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM channels"))

    db.session.commit()
