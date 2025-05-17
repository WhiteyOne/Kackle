from Flask_socket.io import SocketIO, emit, join_room
from .models.message import Message
from .models import db

socket = SocketIO(cors_allowed_origins="*")