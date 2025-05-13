from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class Channel_Message(db.Model, UserMixin):
    __tablename__ = "channel_messages"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(300), nullable=False)
    channel_id = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.Foreignkey(add_prefix_for_prod("channel_message.id")), nullable=False)

 
    def to_dict(self):
        return {
            "id": self.id,
            "body": self.body,
            "channel_id": self.channel_id,
            "user_id": self.user_id,
        }
