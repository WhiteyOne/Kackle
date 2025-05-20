from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash


class Channel_Message(db.Model):
    __tablename__ = "channel_messages"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(300), nullable=False)
    user_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    channel_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("channels.id")), nullable=False
    )

    user_mess = db.relationship(
        "User",
        back_populates="channel_messages",
        cascade="all, delete",
        passive_deletes=True,
    )
    message_chan = db.relationship(
        "Channel",
        back_populates="channel_mess",
        cascade="all, delete",
        passive_deletes=True,
    )
    chan_mess = db.relationship(
        "Channel_Message_Image",
        back_populates="chan_mess_imges",
        cascade="all, delete",
        passive_deletes=True,
    )
    chan_react = db.relationship(
        "Channel_Message_Reaction",
        back_populates="chan_mess_react",
        cascade="all, delete",
        passive_deletes=True,
    )

    def to_dict(self):
        return {
            "id": self.id,
            "body": self.body,
            "channel_id": self.channel_id,
            "user_id": self.user_id,
        }
