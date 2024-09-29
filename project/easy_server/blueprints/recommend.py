import random
from flask import Blueprint, request, jsonify
from db.db import db
from db.recommend_db import Recommend
from db.res_db import Resource
from utils.localize import _l
from utils.auth import token_and_roles_required


recommend_bp = Blueprint("recommend", __name__)


@recommend_bp.route("/add", methods=["POST"])
@token_and_roles_required(["admin", "superadmin"])
def recommend_add(_):
	data = request.get_json()
	res_info = data.get("res_info")
	res_type = data.get("res_type")
	if res_type in ["img", "video"]:
		existing_resource = Resource.query.filter_by(path=res_info).first()
		if not existing_resource:
			return jsonify({"error": _l("TID_COMMON_NOT_FOUND"), "status": 0})

	random_num = data.get("random_num")
	new_recommend = Recommend(res_info=res_info, res_type=res_type, random_num=random_num)
	db.session.add(new_recommend)
	db.session.commit()
	return jsonify({"message": _l("TID_COMMON_SUCCESS"), "status": 200})


@recommend_bp.route("/delete", methods=["GET"])
@token_and_roles_required(["admin", "superadmin"])
def recommend_delete(_):
	data = request.get_json()
	recommend_id = data.get("id")
	recommend = Recommend.query.get(recommend_id)
	db.session.delete(recommend)
	db.session.commit()
	return jsonify({"message": _l("TID_COMMON_SUCCESS"), "status": 200})


@recommend_bp.route("/update", methods=["POST"])
@token_and_roles_required(["admin", "superadmin"])
def recommend_update(_):
	data = request.get_json()
	recommend_id = data.get("id")
	recommend = Recommend.query.get(recommend_id)
	if not recommend:
		return jsonify({"error": _l("TID_COMMON_NOT_FOUND"), "status": 0})
	res_info = data.get("res_info")
	res_type = data.get("res_type")
	random_num = data.get("random_num")
	recommend.res_info = res_info
	recommend.res_type = res_type
	recommend.random_num = random_num
	db.session.commit()
	return jsonify({"message": _l("TID_COMMON_SUCCESS"), "status": 200})


@recommend_bp.route("/count", methods=["GET"])
@token_and_roles_required(["admin", "superadmin"])
def recommend_count(_):
	count = Recommend.query.count()
	return jsonify({"count": count, "status": 200})


@recommend_bp.route("/recommends", methods=["POST"])
@token_and_roles_required(["admin", "superadmin"])
def recommend_recommends(_):
	data = request.json
	page = data.get("page")
	page_size = data.get("page_size")
	recommends = Recommend.query.order_by(Recommend.random_num.desc()).offset((page - 1) * page_size).limit(page_size).all()
	recommends_info = []
	for recommend in recommends:
		recommends_info.append({
			"id": recommend.id,
			"res_info": recommend.res_info,
			"res_type": recommend.res_type,
			"random_num": recommend.random_num,
		})

	return jsonify({"recommends": recommends_info, "status": 200})


@recommend_bp.route("/get", methods=["GET"])
def recommend_get():
	recommends = Recommend.query.all()

	if not recommends:
		return jsonify({"error": _l("TID_COMMON_NOT_FOUND"), "status": 0})

	weights = [recommend.random_num for recommend in recommends]

	selected_recommend = random.choices(recommends, weights=weights, k=1)[0]

	return jsonify({
		"res_info": selected_recommend.res_info,
		"res_type": selected_recommend.res_type,
		"status": 200
	})
