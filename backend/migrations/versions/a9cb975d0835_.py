"""empty message

Revision ID: a9cb975d0835
Revises: c76b22351f05
Create Date: 2025-05-21 12:14:10.367644

"""

from alembic import op
import sqlalchemy as sa

import os

environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = "a9cb975d0835"
down_revision = "c76b22351f05"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "user_channel",
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("channel_id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(
            ["channel_id"],
            ["channels.id"],
        ),
        sa.ForeignKeyConstraint(
            ["user_id"],
            ["users.id"],
        ),
        sa.PrimaryKeyConstraint("user_id", "channel_id"),
    )
    if environment == "production":
        op.execute(f"ALTER TABLE user_channel SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("user_channel")
    # ### end Alembic commands ###
