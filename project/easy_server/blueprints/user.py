import random
from flask import Blueprint, request, jsonify
from db.db import db
from db.user_db import User
from utils.localize import _l
from utils.auth import token_and_roles_required, get_token
from utils.verification import send_verification_email, verify_code, store_verification_code
from werkzeug.security import generate_password_hash, check_password_hash


user_bp = Blueprint("user", __name__)


@user_bp.route("/register", methods=["POST"])
def register_user():
	data = request.json
	email = data.get("email")
	username = data.get("username")
	password = data.get("password")

	if not email or not username or not password:
		return jsonify({"error": _l("TID_USER_INFO_NEED"), "status": 0})

	if User.query.filter_by(email=email).first():
		return jsonify({"error": _l("TID_USER_EMAIL_EXIST"), "status": 1})
	hashed_password = generate_password_hash(password)
	verification_code = str(random.randint(1000, 9999))
	store_verification_code(email, verification_code, {"username": username, "password": hashed_password})
	send_verification_email(email, verification_code)

	return jsonify({"message": _l("TID_USER_SEND_DONE"), "status": 200})


@user_bp.route("/verify", methods=["GET"])
def verify_registration():
	email = request.args.get("email")
	verification_code = request.args.get("code")
	info = verify_code(email, verification_code)
	if info:
		new_user = User(username=info["username"], password=info["password"], email=email)
		db.session.add(new_user)
		db.session.commit()
		return jsonify({"message": _l("TID_USER_REGISTERED_SUCCESS"), "status": 200})
	else:
		return jsonify({"error": _l("TID_USER_INVALID_CODE"), "status": 0})


@user_bp.route("/login", methods=["POST"])
def login():
	data = request.json
	email = data.get("email")
	password = data.get("password")

	user = User.query.filter_by(email=email).first()

	if not user or not check_password_hash(user.password, password):
		return jsonify({"error": _l("TID_USER_LOGIN_INVALID"), "status": 0})

	token = get_token(user.id)

	return jsonify({"token": token, "status": 200})


@user_bp.route("/user_info", methods=["POST"])
def get_user_info():
	data = request.json
	user_id = data.get("user_id")
	username = data.get("username")
	email = data.get("email")

	if not user_id and not username and not email:
		return jsonify({"error": _l("TID_USER_BASE_REQUIRED"), "status": 0})

	user = None
	if user_id:
		user = User.query.get(user_id)
	elif username:
		user = User.query.filter_by(username=username).first()
	elif email:
		user = User.query.filter_by(email=email).first()

	if not user:
		return jsonify({"error": _l("TID_USER_NOT_FOUND"), "status": 1})

	user_info = {
		"user_id": user.id,
		"username": user.username,
		"email": user.email,
		"role": user.role,
	}

	return jsonify({"user_info": user_info, "status": 200})


@user_bp.route("/self_info", methods=["GET"])
@token_and_roles_required(["admin", "superadmin", "user"])
def get_self_info(current_user):
	user_id = current_user.id
	user = User.query.get(user_id)
	if not user:
		return jsonify({"error": _l("TID_USER_NOT_FOUND"), "status": 1})

	user_info = {
		"user_id": user.id,
		"username": user.username,
		"email": user.email,
		"role": user.role,
	}

	return jsonify({"user_info": user_info, "status": 200})


@user_bp.route("/update", methods=["POST"])
@token_and_roles_required(["admin", "superadmin", "user"])
def update_user(current_user):
	data = request.json
	user_id = data.get("user_id")
	new_username = data.get("username")
	new_email = data.get("email")

	if not user_id or not new_username:
		return jsonify({"error": _l("TID_USER_UP_NEED"), "status": 0})

	user = User.query.get(user_id)
	if not user:
		return jsonify({"error": _l("TID_USER_NOT_FOUND"), "status": 1})

	if current_user.role == "user":
		if current_user.id != user_id:
			return jsonify({"error": _l("TID_USER_UP_OTHER"), "status": 2})
		user.username = new_username
	elif current_user.role in ["admin", "superadmin"]:
		user.username = new_username
		if new_email:
			user.email = new_email

	db.session.commit()

	return jsonify({"message": _l("TID_USER_UP_SUCCESS"), "status": 200})


@user_bp.route("/users_count", methods=["GET"])
@token_and_roles_required(["admin", "superadmin"])
def get_users_count(_):
	users_count = User.query.count()
	return jsonify({"users_count": users_count, "status": 200})


@user_bp.route("/users", methods=["POST"])
@token_and_roles_required(["admin", "superadmin"])
def	get_users(_):
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
			"role": user.role,
		}
		users_info.append(user_info)
	return jsonify({"users": users_info, "status": 200})


@user_bp.route("/delete", methods=["POST"])
@token_and_roles_required(["superadmin"])
def delete_user_route(_):
	data = request.json
	user_id = data.get("user_id")

	if not user_id:
		return jsonify({"error": _l("TID_USER_ID_NEED"), "status": 0})

	user = User.query.get(user_id)
	if not user:
		return jsonify({"error": "TID_USER_NOT_FOUND", "status": 1})

	db.session.delete(user)
	db.session.commit()

	return jsonify({"message": _l("TID_USER_DELETE_SUCCESS"), "status": 200})
