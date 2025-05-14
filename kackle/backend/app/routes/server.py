from flask import Blueprint, jsonify

from app.models.db import Server

bp = Blueprint('server', __name__)

##Route Type: GET
@bp.route('/server', methods=['GET'])
def get_servers():
    servers = Server.query.all()
    return jsonify([server.to_dict() for server in servers])
