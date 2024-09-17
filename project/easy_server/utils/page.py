import os
from flask import jsonify, send_from_directory, request, g
from utils.localize import _l


def init_page(app):
	@app.before_request
	def set_language():
		language = request.headers.get("Accept-Language", "ch")
		g.language = language

	@app.route("/", defaults={"path": ""})
	@app.route("/<path:path>")
	def serve_react_app(path):
		if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
			return send_from_directory(app.static_folder, path)
		return send_from_directory(app.static_folder, "index.html")

	@app.errorhandler(404)
	def handle_not_found_error(error):
		return jsonify({"error": _l("TID_PAGE_NOT_FOUND"), "status": 404})

	@app.errorhandler(500)
	def handle_internal_error(error):
		return jsonify({"error": _l("TID_PAGE_SERVER_ERROR"), "status": 500})
