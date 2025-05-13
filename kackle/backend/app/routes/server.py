from flask import Blueprint, render_template
from app.models.db import server

bp = Blueprint('server', __name__)

# home page
@bp.route('/')
def index():
    return render_template('home_page.html')


##Route Type: GET
@bp.route('/server', methods=['GET'])
def get_servers():
    servers = server.query.all()
    return jsonify([server.to_dict() for server in servers])