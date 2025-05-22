from app.models import db, user_server, environment, SCHEMA, Server
from sqlalchemy.sql import text
from .users import list_of_users
from .servers import user_server_lists
from random import choice


# Adds a demo user, you can add other users here if you want
def seed_user_server():
    for user in list_of_users:
        # This will grab a random number to determine how many servers a user will
        # be a part of
        amt_of_servers_to_join = choice([1, 3])
        for i in range(amt_of_servers_to_join):
            server_id_to_join = choice([0, len(user_server_lists) - 1])
            random_server = user_server_lists[server_id_to_join]
            filtered_server = Server.query.filter(Server.id == random_server.id).one()
            if user.id not in filtered_server.user_servers:
                user.server_users.extend([random_server])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_user_server():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users_servers RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM users_servers"))

    db.session.commit()
