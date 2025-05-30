from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .user_server import user_server
from .users_channel import user_channel


class User(db.Model, UserMixin):
    __tablename__ = "users"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(30), nullable=False)
    last_name = db.Column(db.String(30), nullable=False)
    prefered_name = db.Column(db.String(30))
    profile_img = db.Column(db.String)
    about = db.Column(db.String(300))
    phone = db.Column(db.String(14))
    # many to many realtionships

    server_users = db.relationship(
        "Server",
        secondary=user_server,
        back_populates="user_servers",
        cascade="all, delete",
    )
    channel_users = db.relationship(
        "Channel",
        secondary=user_channel,
        back_populates="user_channels",
        cascade="all, delete",
    )

    # # relationships one to many
    channel_messages = db.relationship(
        "Channel_Message",
        back_populates="user_mess",
        cascade="all, delete-orphan",
    )
    channel_reactions = db.relationship(
        "Channel_Message_Reaction",
        back_populates="user_mess_react",
        cascade="all, delete-orphan",
    )
    user_owner = db.relationship(
        "Server", back_populates="server_owner", cascade="all, delete-orphan"
    )
    owner_channel = db.relationship(
        "Channel", back_populates="channel_owner", cascade="all, delete-orphan"
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
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "prefered_name": self.prefered_name,
            "profile_img": self.profile_img,
            "about": self.about,
            "phone": self.phone,
        }
