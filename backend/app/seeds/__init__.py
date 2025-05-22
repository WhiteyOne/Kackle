from flask.cli import AppGroup
from .users import seed_users, undo_users
from .servers import seed_servers, undo_servers
from .channel import seed_channels, undo_channel
from .channel_message import seed_channel_messages, undo_channel_messages
from .channel_message_reaction import (
    undo_channel_message_reaction,
    seed_channel_message_reaction,
)
from .channel_message_image import (
    seed_channel_message_image,
    undo_channel_message_image,
)
from .user_server import seed_user_server, undo_user_server

# from .user_channel import seed_user_channel, undo_user_channel
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup("seed")


# Creates the `flask seed all` command
@seed_commands.command("all")
def seed():
    if environment == "production":
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        # undo_user_channel
        undo_channel_message_reaction()
        undo_channel_message_image()
        undo_channel_messages()
        undo_channel()
        undo_user_server()
        undo_servers()
        undo_users()

    seed_users()
    seed_servers()
    seed_user_server()
    seed_channels()
    seed_channel_messages()
    seed_channel_message_image()
    seed_channel_message_reaction()
    # seed_user_channel()

    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command("undo")
def undo():
    # undo_user_channel
    undo_channel_message_reaction()
    undo_channel_message_image()
    undo_channel_messages()
    undo_channel()
    undo_user_server()
    undo_servers()
    undo_users()


# Add other undo functions here
