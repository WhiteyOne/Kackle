# from .db import db, environment, SCHEMA, add_prefix_for_prod
# from flask_login import UserMixin


# user_channel = db.Table(
#     "user-channels",
#     db.Column(
#         "user_id",
#         db.Integer,
#         db.ForeignKey(add_prefix_for_prod("users.id")),
#         primary_key=True,
#     ),
#     db.Column(
#         "channel_id",
#         db.Integer,
#         db.ForeignKey(add_prefix_for_prod("servers.id")),
#         primary_key=True,
#     ),
# )


# if environment == "production":
#     user_channel.schema = SCHEMA
