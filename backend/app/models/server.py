from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user_server import user_server


class Server(db.Model):
    __tablename__ = "servers"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False, unique=True)
    owner_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    user_servers = db.relationship(
        "User", secondary=user_server, back_populates="server_users"
    )
    # one to many
    server_owner = db.relationship("User", back_populates="user_owner")
    channel_servers = db.relationship(
        "Channel",
        back_populates="server_channels",
        cascade="all, delete-orphan",
        # passive_deletes=True,
    )

    def to_dict(self):
        return {"id": self.id, "name": self.name, "owner_id": self.owner_id}
