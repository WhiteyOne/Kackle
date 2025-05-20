# from .db import db, environment, SCHEMA, add_prefix_for_prod
# from flask_login import UserMixin


# class User_Channel(db.Model, UserMixin):
#     __tablename__ = "users_channels"

#     if environment == "production":
#         __table_args__ = {"schema": SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(
#         db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
#     )
#     channel_id = db.Column(
#         db.Integer, db.ForeignKey(add_prefix_for_prod("channels.id")), nullable=False
#     )

#     def to_dict(self):
#         return {"id": self.id, "user_id": self.user_id, "channel_id": self.channel_id}
