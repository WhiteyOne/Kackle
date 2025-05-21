from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user_server import user_server


class Server(db.Model):
    __tablename__ = "servers"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False, unique=True)
    user_servers = db.relationship(
        "User", secondary=user_server, back_populates="server_users"
    )
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