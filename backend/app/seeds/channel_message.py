from app.models import db, Channel_Message, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_channel_messages():
    demo = Channel_Message(body="Indostructable", channel_id=1, user_id=1)
    channel_messages_1 = Channel_Message(body="Fred_Myers", channel_id=1, user_id=3)
    channel_messages_2 = Channel_Message(body="Mark 1", channel_id=1, user_id=2)

    message_list = [demo, channel_messages_1, channel_messages_2]
    for message in message_list:
        db.session.add(message)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_channel_messages():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.channel_messages RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM channel_messages"))

    db.session.commit()
