import os
from flask import Blueprint, request, jsonify, send_from_directory
from db.db import db
from db.res_db import Resource
from utils.localize import _l
from utils.auth import token_and_roles_required
from werkzeug.utils import secure_filename

upload_bp = Blueprint("upload", __name__)

MAX_FILE_SIZE = 20 * 1024 * 1024
UPLOAD_FOLDER = '/app/uploads'
if not os.path.exists(UPLOAD_FOLDER):
	os.makedirs(UPLOAD_FOLDER)

@upload_bp.route("/upload", methods=["POST"])
@token_and_roles_required(["admin", "superadmin"])
def update_user(_):
	file = request.files['file']
	if 'file' not in request.files:
		return jsonify({"error": _l("TID_UPLOAD_NO_FILE_PART"), "status": 0})
	if file.filename == '':
		return jsonify({"error": _l("TID_UPLOAD_NO_SELECTED_FILE"), "status": 1})

	if request.content_length > MAX_FILE_SIZE:
		return jsonify({"error": _l("TID_UPLOAD_FILE_SIZE_EXCEEDED"), "status": 2})
	filename = secure_filename(file.filename)

	file.save(os.path.join(UPLOAD_FOLDER, filename))
	new_resource = Resource(path=filename, res_type="file")
	db.session.add(new_resource)
	db.session.commit()
	return jsonify({"message": _l("TID_UPLOAD_SUCCESS"), "status": 200})


@upload_bp.route("/file/<filename>", methods=["GET"])
def get_file(filename):
	try:
		return send_from_directory(UPLOAD_FOLDER, filename)
	except FileNotFoundError:
		return jsonify({"error": _l("TID_UPLOAD_FILE_NOT_FOUND"), "status": 404})


@upload_bp.route("/delete", methods=["POST"])
@token_and_roles_required(["admin", "superadmin"])
def delete_file(_):
	data = request.get_json()
	resource_id = data.get("id")

	if not resource_id:
		return jsonify({"error": _l("TID_UPLOAD_NO_RESOURCE_ID"), "status": 0})

	resource = Resource.query.get(resource_id)
	if not resource:
		return jsonify({"error": _l("TID_UPLOAD_RESOURCE_NOT_FOUND"), "status": 1})

	file_path = os.path.join(UPLOAD_FOLDER, resource.path)

	if os.path.exists(file_path):
		os.remove(file_path)
	else:
		return jsonify({"error": _l("TID_UPLOAD_FILE_NOT_FOUND_SERVER"), "status": 2})

	db.session.delete(resource)
	db.session.commit()

	return jsonify({"message": _l("TID_UPLOAD_DELETE_SUCCESS"), "status": 200})


@upload_bp.route("/resources_count", methods=["GET"])
def get_resources_count(_):
	resources_count = Resource.query.count()
	return jsonify({"resources_count": resources_count, "status": 200})


@upload_bp.route("/resources", methods=["POST"])
@token_and_roles_required(["admin", "superadmin"])
def get_resources(_):
	data = request.json
	page = data.get("page", 1)
	page_size = data.get("page_size", 10)

	resources = Resource.query.offset((page - 1) * page_size).limit(page_size).all()

	resources_info = []
	for resource in resources:
		resource_info = {
			"resource_id": resource.id,
			"path": resource.path,
			"res_type": resource.res_type,
		}
		resources_info.append(resource_info)

	return jsonify({"resources": resources_info, "status": 200})
