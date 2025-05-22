from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from .users_channel import user_channel


class Channel(db.Model):
    __tablename__ = "channels"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False, unique=True)
    server_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("servers.id")), nullable=False
    )
    owner_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    # # many to many
    user_channels = db.relationship(
        "User", secondary=user_channel, back_populates="channel_users"
    )

    # one to many
    server_channels = db.relationship(
        "Server",
        back_populates="channel_servers",
    )
    channel_mess = db.relationship(
        "Channel_Message",
        back_populates="message_chan",
        cascade="all, delete-orphan",
    )
    channel_owner = db.relationship("User", back_populates="owner_channel")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "public": self.public,
            "server_id": self.server_id,
            "user_id": self.userid,
        }
