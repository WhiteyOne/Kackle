from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin

from sqlalchemy.dialects.postgresql import ARRAY


class Server(db.Model, UserMixin):
    __tablename__ = "server"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False, unique=True)
    private = db.Column(db.Boolean, nullable=False)
    admin = db.Column(ARRAY(db.String))
    # server to user
    user_id = db.Column(db.Integer, db.Foreignkey("user.id"), nullable=False)
    # user to server
    user = db.relationship("User", back_populates="servers")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "private": self.private,
            "admin": self.admin,
            "user_id": self.user_id,
        }
