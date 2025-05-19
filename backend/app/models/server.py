from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin


class Server(db.Model, UserMixin):
    __tablename__ = "servers"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False, unique=True)

    user_server = db.relationship("User", secondary="users_servers")
    chan_serv = db.relationship(
        "Channel",
        back_populates="server_chan",
        cascade="all, delete",
        passive_deletes=True,
    )

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
        }
