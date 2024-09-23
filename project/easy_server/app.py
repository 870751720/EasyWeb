from flask import Flask
from flask_cors import CORS
from blueprints import register_blueprints
from utils.page import init_page
from utils.mail import init_mail


def create_app():
	app = Flask(__name__, static_folder="./statics", static_url_path="/")
	init_mail(app)
	register_blueprints(app)
	init_page(app)
	CORS(app)

	from db.db import init_db  # to import all db model
	init_db(app)

	return app


if __name__ == "__main__":
	app = create_app()
	app.run(host="0.0.0.0")
