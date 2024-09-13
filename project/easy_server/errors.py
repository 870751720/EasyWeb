from flask import jsonify


def init_error(app):
	@app.errorhandler(404)
	def handle_not_found_error(error):
		return jsonify({"error": "Page not found"}), 404

	@app.errorhandler(500)
	def handle_internal_error(error):
		return jsonify({"error": "Internal server error"}), 500
