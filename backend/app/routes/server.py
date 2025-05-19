from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from .models.db import Server, server_id

bp = Blueprint('server', __name__)

##Route Type: GET
@bp.route('/server', methods=['GET'])
@login_required
def get_servers():
    servers = Server.query.filter_by(owner_id=current_user.id).all()
    return jsonify([server.to_dict() for server in servers])

##Route Type: Get 
@bp.route(f"/server/{server_id}", methods=["GET"])
@login_required
def get_server(server_id):
    server=Server.query(server_id)
    ##Server not found check
    if not server:
        return jsonify({"error": "Server not found or is offline"}), 404
    
    ##auth check
    if server.user_id !=current_user.id:
        return jsonify({"error": "You do not have the right laughter level to acces this!"}), 401
    
    return jsonify(server.to_dict())
