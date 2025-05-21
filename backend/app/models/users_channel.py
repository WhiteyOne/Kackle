from sqlalchemy import ForeignKey
from .db import db, environment, SCHEMA, add_prefix_for_prod


user_channel = db.Table(
    "user_channel",
    db.Column(
        "user_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("users.id")),
        primary_key=True,
    ),
    db.Column(
        "channel_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("channels.id")),
        primary_key=True,
    ),
)


if environment == "production":
    user_channel.schema = SCHEMA
