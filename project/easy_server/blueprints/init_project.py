from flask import Blueprint, jsonify
from db.db import db
from db.user_db import User
from utils.localize import _l
from utils.auth import token_and_roles_required
from sqlalchemy import inspect

init_project_bp = Blueprint("init_project", __name__)


@init_project_bp.route("/drop", methods=["GET"])
@token_and_roles_required(["superadmin"])
def drop(_):
	db.drop_all()
	return jsonify({"message": _l("TID_INIT_PROJECT_DROP_SUCCESS"), "status": 200})


@init_project_bp.route("/create", methods=["GET"])
def create():
	existing_tables = inspect(db.engine).get_table_names()
	if 'User' not in existing_tables:
		db.drop_all()
		db.create_all()
		superadmin = User(
			username="admin",
			# password => 123456
			password="scrypt:32768:8:1$msV2oG4Tv7pRB7Vd$8d3460d7058348538975f1d4ce60d0e0b4167d1320048f3b518c73497a92960fb7c61634c69781a6eeac8d1c892f3c96067be8061057cd9006c337cb2b659592",
			email="870751720@qq.com",
			role="superadmin"
		)
		db.session.add(superadmin)
		db.session.commit()
	return jsonify({"message": _l("TID_COMMON_SUCCESS"), "status": 200, "tables": str(existing_tables)})
