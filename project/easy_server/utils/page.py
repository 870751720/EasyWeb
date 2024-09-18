from flask import send_from_directory, request, g


def init_page(app):
	@app.before_request
	def set_language():
		language = request.headers.get("Accept-Language", "ch")
		g.language = language

	@app.route("/", defaults={"path": ""})
	@app.route("/<path:path>")
	def serve_react_app(path):
		return send_from_directory(app.static_folder, "index.html")
