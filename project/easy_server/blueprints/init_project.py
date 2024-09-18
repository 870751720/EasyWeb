import subprocess
from flask import Blueprint, jsonify
from flask_migrate import upgrade, migrate, init as migrate_init
from db.db import db
from db.user_db import User
from utils.auth import token_and_roles_required
from utils.localize import _l


init_project_bp = Blueprint("init_project", __name__)

@init_project_bp.route("/create_tables", methods=["GET"])
@token_and_roles_required(["superadmin"])
def create_tables(_):
# def create_tables():
	try:
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
		return jsonify({"message": _l("TID_INIT_PROJECT_CREAT_TABLE_SUCCESS"), "status": 200})
	except Exception as e:
		return jsonify({"error": str(e), "status": 0})


@init_project_bp.route("/run_migrations", methods=["POST"])
@token_and_roles_required(["superadmin"])
def run_migrations():
	try:
		migrate_init()
		migrate()
		upgrade()
		return jsonify({"message": _l("TID_INIT_PROJECT_MIGRATIONS_SUCCESS"), "status": 200})
	except Exception as e:
		return jsonify({"error": str(e), "status": 0})


@init_project_bp.route("/docker_logs", methods=["GET"])
@token_and_roles_required(["superadmin"])
def get_docker_logs():
	try:
		logs = subprocess.check_output(["docker-compose", "logs"], universal_newlines=True)
		return jsonify({"logs": logs, "status": 200})
	except subprocess.CalledProcessError as e:
		return jsonify({"error": str(e), "status": 0})
