from sqlalchemy import ForeignKey
from .db import db, environment, SCHEMA, add_prefix_for_prod


user_server = db.Table(
    "user_servers",
    db.Column(
        "user_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("users.id")),
        primary_key=True,
    ),
    db.Column(
        "server_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("servers.id")),
        primary_key=True,
    ),
)


if environment == "production":
    user_server.schema = SCHEMA
