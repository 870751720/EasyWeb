from flask import Blueprint, jsonify
from db.db import db
from utils.localize import _l
from utils.auth import token_and_roles_required

init_project_bp = Blueprint("init_project", __name__)


@init_project_bp.route("/drop", methods=["GET"])
@token_and_roles_required(["superadmin"])
def drop(_):
	db.drop_all()
	return jsonify({"message": _l("TID_INIT_PROJECT_DROP_SUCCESS"), "status": 200})


@init_project_bp.route("/add", methods=["GET"])
def add():
	from db.db import check_db
	check_db()
	return jsonify({"message": _l("TID_INIT_PROJECT_DROP_SUCCESS"), "status": 200})
