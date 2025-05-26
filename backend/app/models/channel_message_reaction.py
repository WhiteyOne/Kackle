from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash


class Channel_Message_Reaction(
    db.Model,
):
    __tablename__ = "channel_message_reactions"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    emoji = db.Column(db.String(1), nullable=False)
    channel_message_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("channel_messages.id")),
        nullable=False,
    )
    user_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("users.id")),
        nullable=False,
    )
    user_mess_react = db.relationship(
        "User",
        back_populates="channel_reactions",
    )
    chan_mess_react = db.relationship(
        "Channel_Message",
        back_populates="chan_react",
    )

    def to_dict(self):
        return {
            "id": self.id,
            "emoji": self.emoji,
            "channel_message_id": self.channel_message_id,
            "user_id": self.user_id,
        }
