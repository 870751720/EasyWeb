from flask import Blueprint, jsonify
from flask_migrate import upgrade, migrate, init as migrate_init
from db.db import db
from utils.auth import token_and_roles_required


init_project_bp = Blueprint("init_project", __name__)

@init_project_bp.route("/create_tables", methods=["GET"])
def create_tables():
	try:
		db.drop_all()
		db.create_all()
		return jsonify({"message": "All tables created successfully", "status": 200})
	except Exception as e:
		return jsonify({"error": str(e), "status": 0})


@init_project_bp.route("/run_migrations", methods=["POST"])
@token_and_roles_required(["superadmin"])
def run_migrations():
	try:
		migrate_init()
		migrate()
		upgrade()
		return jsonify({"message": "Migrations run successfully", "status": 200})
	except Exception as e:
		return jsonify({"error": str(e), "status": 0})
