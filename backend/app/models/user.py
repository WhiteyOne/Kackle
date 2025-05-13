from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = "users"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    first_name = db.Column(db.String(30), nullable=False)
    last_name = db.Column(db.String(30), nullable=False)
    prefered_name = db.Column(db.String(30))
    profile_img = db.Column(db.String)
    about = db.Column(db.String(300))
    phone = db.Column(db.String(14))

    # relationships one to many
    servers = db.relationship(
        "Server",
        back_populates="user",
        cascade="all, delete",
        passive_deletes=True,
    )
    channels = db.relationship(
        "Channel",
        back_populates="user_chan",
        cascade="all, delete",
        passive_deletes=True,
    )
    channel_messages = db.relationship(
        "Channel_Message",
        back_populates="user_mess",
        cascade="all, delete",
        passive_deletes=True,
    )
    channel_reactions = db.relationship(
        "Channel_Message_Reaction",
        back_populates="user_mess_react",
        cascade="all, delete",
        passive_deletes=True,
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    @property
    def check_url(self, profile_img):
        if self.profile_img:
            url = self.profile_img.lower()
            if not (url.endswith(".jpeg") or url.endswith(".png")):
                raise ValueError("Must End With .png, .jpeg")

    def to_dict(self):
        return {"id": self.id, "username": self.username, "email": self.email}
