from flask import Blueprint, jsonify

from flask_login import login_required



from app.models.server import Server

bp = Blueprint('server', __name__)

##Route Type: GET
@bp.route('/server', methods=['GET'])
@login_required
def get_servers():

    servers = Server.query.all()
    return jsonify([server.to_dict() for server in servers])

##Route Type: Get 
# @bp.route(f"/server/{server_id}", methods=["GET"])
# @login_required
# def get_server(server_id):
#     server=Server.query(server_id)

#     ##auth check
#     if server.user_id !=current_user.id:
#         return jsonify({"error": "You do not have the right laughter level to acces this!"})
#     return jsonify(server.to_dict())

#     servers = Server.query.all()
#     return jsonify([server.to_dict() for server in servers])
