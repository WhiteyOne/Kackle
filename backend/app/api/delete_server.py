from flask import Blueprint, request, jsonify
from app.models import User, db, Server
from app.forms import LoginForm
from flask_login import current_user, login_user, login_required
from api.auth_routes import auth_routes
from app.models.db import server


delete_server = Blueprint('delete', __name__)


# Delete Server Route

@delete_server.route('/', methods=['DELETE'])
@login_required
def delete_server(id):
    data = request.get_json()
    delete_server = data.get('name')

    servers = server.query.get(id)
    return server.to_dict()

