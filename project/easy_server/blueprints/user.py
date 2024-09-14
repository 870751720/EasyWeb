import random
from flask import Blueprint, request, jsonify
from db.db import db
from db.user_db import User
from utils.verification import send_verification_email, verify_code, store_verification_code


user_bp = Blueprint("user", __name__)


@user_bp.route("/register", methods=["POST"])
def register_user():
	data = request.json
	email = data.get("email")
	username = data.get("username")
	password = data.get("password")

	if not email or not username or not password:
		return jsonify({"error": "Email, username and password are required"}), 400

	if User.query.filter_by(email=email).first():
		return jsonify({"error": "Email already exists"}), 400

	verification_code = str(random.randint(1000, 9999))
	store_verification_code(email, verification_code, {"username": username, "password": password})
	send_verification_email(email, verification_code)

	return jsonify({"message": "Verification code sent to email"}), 200


@user_bp.route("/verify", methods=["GET"])
def verify_registration():
	email = request.args.get("email")
	verification_code = request.args.get("code")
	info = verify_code(email, verification_code)
	if info:
		new_user = User(username=info["username"], password=info["password"], email=email)
		db.session.add(new_user)
		db.session.commit()
		return jsonify({"message": "User registered successfully"}), 201
	else:
		return jsonify({"error": "Invalid verification code"}), 400


@user_bp.route("/update", methods=["POST"])
def update_user_route():
	data = request.json
	user_id = data.get("user_id")
	new_username = data.get("username")

	if not user_id or not new_username:
		return jsonify({"error": "User ID and new username are required"}), 400

	user = User.query.get(user_id)
	if not user:
		return jsonify({"error": "User not found"}), 404

	user.username = new_username
	db.session.commit()

	return jsonify({"message": "Username updated successfully"}), 200


@user_bp.route("/delete", methods=["POST"])
def delete_user_route():
	data = request.json
	user_id = data.get("user_id")

	if not user_id:
		return jsonify({"error": "User ID is required"}), 400

	user = User.query.get(user_id)
	if not user:
		return jsonify({"error": "User not found"}), 404

	db.session.delete(user)
	db.session.commit()

	return jsonify({"message": "User deleted successfully"}), 200


@user_bp.route("/user_info", methods=["POST"])
def get_user_info():
	data = request.json
	user_id = data.get("user_id")

	if not user_id:
		return jsonify({"error": "User ID is required"}), 400

	user = User.query.get(user_id)
	if not user:
		return jsonify({"error": "User not found"}), 404

	user_info = {
		"user_id": user.id,
		"username": user.username,
	}

	return jsonify({"user_info": user_info}), 200


@user_bp.route("/users_count", methods=["GET"])
def get_users_count():
	users_count = User.query.count()
	return jsonify({"users_count": users_count}), 200


@user_bp.route("/users", methods=["POST"])
def	get_users():
	data = request.json
	page = data.get("page")
	page_size = data.get("page_size")
	users = User.query.offset((page - 1) * page_size).limit(page_size).all()
	users_info = []
	for user in users:
		user_info = {
			"user_id": user.id,
			"username": user.username,
			"email": user.email,
		}
		users_info.append(user_info)
	return jsonify({"users": users_info}), 200