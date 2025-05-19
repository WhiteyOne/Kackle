from flask import Blueprint, jsonify, render_template
from flask_login import login_required, current_user
from ..models import db, Server
from ..forms import CreateServer

server_routes = Blueprint('servers', __name__)


""" Create Server """
@server_routes.route('/create-server', methods=['POST'])
@login_required
def create_server():
    form = CreateServer()
    if form.validate_on_submit():
        new_server = Server(name=form.server_name.data)
        db.session.add(new_server)
        db.session.commit()

        new_server.users_append(current_user)
        db.session.commit()
        
        return jsonify(new_server.to_dict())
    
    return jsonify({'errors': form.errors})