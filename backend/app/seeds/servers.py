from app.models import db, Server, environment, SCHEMA
from sqlalchemy.sql import text


user_server_lists = []


# Adds a demo user, you can add other users here if you want
def seed_servers():
    demo = Server(name="Indostructable", owner_id=1)
    server_1 = Server(name="Fred_Myers", owner_id=1)
    server_2 = Server(name="Mark 1", owner_id=3)
    server_3 = Server(name="Jared", owner_id=1)
    server_4 = Server(name="Food", owner_id=3)
    server_5 = Server(name="Real Time Updates", owner_id=1)
    server_6 = Server(name="Canters", owner_id=2)
    server_7 = Server(name="Horses", owner_id=2)
    server_8 = Server(name="To-Do", owner_id=2)
    server_9 = Server(name="Freedom Writers", owner_id=2)
    server_10 = Server(name="Fungas", owner_id=3)

    server_list = [
        demo,
        server_1,
        server_2,
        server_3,
        server_4,
        server_5,
        server_6,
        server_7,
        server_8,
        server_9,
        server_10,
    ]

    for server in server_list:
        db.session.add(server)
        user_server_lists.append(server)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_servers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.servers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM servers"))

    db.session.commit()
