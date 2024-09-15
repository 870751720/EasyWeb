from flask import jsonify, send_from_directory, request, g


def init_page(app):
	@app.before_request
	def set_language():
		language = request.headers.get("Accept-Language", "ch")
		g.language = language

	@app.route("/")
	def server():
		return send_from_directory(app.static_folder, "index.html")

	@app.errorhandler(404)
	def handle_not_found_error(error):
		return jsonify({"error": "Page not found", "status": 404})

	@app.errorhandler(500)
	def handle_internal_error(error):
		return jsonify({"error": "Internal server error", "status": 500})
