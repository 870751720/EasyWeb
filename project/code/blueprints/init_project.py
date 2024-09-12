from flask import Blueprint, jsonify
from flask_migrate import upgrade, migrate, init as migrate_init
from project.code.db import db


init_bp = Blueprint('init', __name__)

@init_bp.route('/create_tables', methods=['POST'])
def create_tables():
	try:
		db.create_all()
		return jsonify({'message': 'All tables created successfully'}), 200
	except Exception as e:
		return jsonify({'error': str(e)}), 500


@init_bp.route('/run_migrations', methods=['POST'])
def run_migrations():
	try:
		migrate_init()
		migrate()
		upgrade()
		return jsonify({'message': 'Migrations run successfully'}), 200
	except Exception as e:
		return jsonify({'error': str(e)}), 500
