from app.models import db, User_Server, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_user_server():
    demo = User_Server(user_id=1, server_id=1)
    demo2 = User_Server(user_id=2, server_id=1)
    demo3 = User_Server(user_id=3, server_id=1)
    demo4 = User_Server(user_id=1, server_id=2)
    demo5 = User_Server(user_id=1, server_id=3)
    demo6 = User_Server(user_id=2, server_id=2)
    demo7 = User_Server(user_id=2, server_id=3)

    message_list = [demo, demo2, demo3, demo4, demo5, demo6, demo7]
    for message in message_list:
        db.session.add(message)
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
