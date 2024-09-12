from flask import Blueprint, jsonify
from flask_migrate import upgrade, migrate, init as migrate_init
from db.db import db


init_project_bp = Blueprint('init_project', __name__)

@init_project_bp.route('/create_tables', methods=['POST'])
def create_tables():
	try:
		db.create_all()
		return jsonify({'message': 'All tables created successfully'}), 200
	except Exception as e:
		return jsonify({'error': str(e)}), 500


@init_project_bp.route('/run_migrations', methods=['POST'])
def run_migrations():
	try:
		migrate_init()
		migrate()
		upgrade()
		return jsonify({'message': 'Migrations run successfully'}), 200
	except Exception as e:
		return jsonify({'error': str(e)}), 500
