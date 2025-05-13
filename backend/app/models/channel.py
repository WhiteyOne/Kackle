from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class Channel(db.Model, UserMixin):
    __tablename__ = "channels"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False, unique=True)
    public = db.Column(db.Boolean, nullable=False)
    server_id = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.Foreignkey("user.id"), nullable=False)


    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "public": self.public,
            "server_id": self.server_id,
            "user_id": self.user_id,
        }
