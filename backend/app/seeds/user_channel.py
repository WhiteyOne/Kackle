from app.models import db, user_server, environment, SCHEMA, Channel
from sqlalchemy.sql import text
from .users import list_of_users
from .channel import user_channel_list
from random import choice


# Adds a demo user, you can add other users here if you want
def seed_user_channel():
    for user in list_of_users:
        # This will grab a random number to determine how many servers a user will
        # be a part of
        amt_of_channels_to_join = choice([1, 3])
        for i in range(amt_of_channels_to_join):
            channel_id_to_join = choice([0, len(user_channel_list) - 1])
            random_channel = user_channel_list[channel_id_to_join]
            filtered_channel = Channel.query.filter(
                Channel.id == random_channel.id
            ).one()
            if user.id not in filtered_channel.user_channels:
                user.channel_users.extend([random_channel])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_user_channel():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.user_channel RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM user_channel"))

    db.session.commit()
