from flask import Blueprint, jsonify

from app.models.db import server

bp = Blueprint('server', __name__)

##Route Type: GET
@bp.route('/server', methods=['GET'])
def get_servers():
    servers = server.query.all()
    return jsonify([server.to_dict() for server in servers])