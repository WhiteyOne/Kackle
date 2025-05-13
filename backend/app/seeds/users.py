from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username="Demo",
        password="password",
        email="demo@aa.io",
        first_name="Demoni",
        last_name="Passwordy",
    )
    marnie = User(
        username="marnie",
        password="password",
        email="marnie@aa.io",
        first_name="Marnie",
        last_name="Mooos",
    )
    bobbie = User(
        username="bobbie",
        password="password",
        email="bobbie@aa.io",
        first_name="Bobbie",
        last_name="Flays",
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users RESTART IDENTITY"))

    db.session.commit()
