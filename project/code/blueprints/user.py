from flask import Blueprint, request, jsonify
from project.code.db import db
from project.code.db.user_db import User


user_bp = Blueprint('user', __name__)


@user_bp.route('/register', methods=['POST'])
def register_user():
	data = request.json
	username = data.get('username')
	password = data.get('password')

	if not username or not password:
		return jsonify({'error': 'Username and password are required'}), 400

	if User.query.filter_by(username=username).first():
		return jsonify({'error': 'User already exists'}), 400

	new_user = User(username=username, password=password)
	db.session.add(new_user)
	db.session.commit()

	return jsonify({'message': 'User registered successfully'}), 201

@user_bp.route('/update', methods=['POST'])
def update_user_route():
	data = request.json
	user_id = data.get('user_id')
	new_username = data.get('username')

	if not user_id or not new_username:
		return jsonify({'error': 'User ID and new username are required'}), 400

	user = User.query.get(user_id)
	if not user:
		return jsonify({'error': 'User not found'}), 404

	user.username = new_username
	db.session.commit()

	return jsonify({'message': 'Username updated successfully'}), 200

@user_bp.route('/delete', methods=['POST'])
def delete_user_route():
	data = request.json
	user_id = data.get('user_id')

	if not user_id:
		return jsonify({'error': 'User ID is required'}), 400

	user = User.query.get(user_id)
	if not user:
		return jsonify({'error': 'User not found'}), 404

	db.session.delete(user)
	db.session.commit()

	return jsonify({'message': 'User deleted successfully'}), 200
