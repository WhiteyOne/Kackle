from app.models import db, Channel_Message, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_channel_messages():
    demo = Channel_Message(
        body="Dude you slapped a Fish, you... you hit it?", channel_id=1, owner_id=3
    )
    channel_messages_1 = Channel_Message(
        body="Everythings fine *fires all around*", channel_id=1, owner_id=2
    )
    channel_messages_2 = Channel_Message(
        body="There is no good version of me, I'm just a jinx.",
        channel_id=1,
        owner_id=1,
    )
    channel_messages_3 = Channel_Message(
        body="Mason The Goat, The Bees Knees, The Titan, must we go on",
        channel_id=2,
        owner_id=1,
    )
    channel_messages_4 = Channel_Message(
        body="Raina CSS QUEEEN PLEASE",
        channel_id=2,
        owner_id=2,
    )
    channel_messages_5 = Channel_Message(
        body="Mikaela's Sad Songs and Coding like a PRO",
        channel_id=2,
        owner_id=3,
    )
    channel_messages_6 = Channel_Message(
        body="Corey Cheif of the Many Playwrite Champ",
        channel_id=2,
        owner_id=3,
    )
    channel_messages_7 = Channel_Message(
        body="Steph, mom, mom, mom, MOM, MOMMY, MOM, MUM! Hi hehehe. BOSS MOM Multi-task champion.",
        channel_id=2,
        owner_id=2,
    )
    channel_messages_8 = Channel_Message(
        body="Cayden and his PRCIOUS SEEDERS, no touch...",
        channel_id=2,
        owner_id=1,
    )
    channel_messages_9 = Channel_Message(
        body="Thank you for being such a hard working team",
        channel_id=3,
        owner_id=1,
    )
    channel_messages_10 = Channel_Message(
        body="Couldn't have done it with out you all! Good luck on Cap stone and getting a job! 😘",
        channel_id=3,
        owner_id=2,
    )

    message_list = [
        demo,
        channel_messages_1,
        channel_messages_2,
        channel_messages_3,
        channel_messages_4,
        channel_messages_5,
        channel_messages_6,
        channel_messages_7,
        channel_messages_8,
        channel_messages_9,
        channel_messages_10,
    ]
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
