from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class Channel_Message_Image(db.Model, UserMixin):
    __tablename__ = "channel_message_images"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    img_url = db.Column(db.String(300))
    user_id = db.Column(db.Integer, db.Foreignkey(add_prefix_for_prod("channel_message.id")), nullable=False)



    def to_dict(self):
        return {"id": self.id, "img_url": self.img_url}
