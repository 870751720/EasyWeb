from flask import Flask
from flask_cors import CORS
from blueprints import init_blueprints
from db.db import init_db, check_db
from utils.page import init_page
from utils.mail import init_mail

def create_app():
	app = Flask(__name__, static_folder="./statics", static_url_path="/")

	init_mail(app)
	init_blueprints(app)
	init_page(app)
	init_db(app)
	CORS(app)

	with app.app_context():
		check_db()

	return app

if __name__ == "__main__":
	app = create_app()
	app.run(host="0.0.0.0")