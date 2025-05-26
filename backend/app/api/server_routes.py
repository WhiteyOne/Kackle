from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from ..models import db, Server
from ..forms import CreateServer

server_routes = Blueprint("servers", __name__)


##Route Type: GET ------------------------------
@server_routes.route("/server", methods=["GET"])
@login_required
def get_servers():

    servers = Server.query.all()

    return jsonify([server.to_dict() for server in servers])


@server_routes.route(f"/server/<int:server_id>", methods=["GET"])
@login_required
def get_server(server_id):

    server = Server.query.get(server_id)

    return jsonify(server.to_dict())


# End Get Route --------------------

# """ Create Server """ ------------------
@server_routes.route("/server", methods=["POST"])
@login_required
def create_server():
    form = CreateServer()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        new_server = Server(
            name=form.name.data,
            owner_id=current_user.id,)
        db.session.add(new_server)
        db.session.commit()

        return new_server.to_dict()

    return {"errors": form.errors}

# UPDATE SERVER ------------------
@server_routes.route(f"/server/<int:server_id>", methods=["PUT"])
@login_required
def server_edit(server_id):
    server = Server.query.get(server_id)
    data = request.json

    server.name = data["name"]
    db.session.commit()
    return server.to_dict()
