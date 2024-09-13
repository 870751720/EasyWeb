from flask import Flask, send_from_directory
from flask_cors import CORS
from blueprints import register_blueprints
from db.db import init_db
from errors import init_error


def create_app():
	app = Flask(__name__, static_folder="./statics", static_url_path="/")

	@app.route("/")
	def server():
		return send_from_directory(app.static_folder, "index.html")

	init_db(app)
	init_error(app)
	register_blueprints(app)
	CORS(app)
	return app


if __name__ == "__main__":
	app = create_app()
	app.run(host="0.0.0.0")
