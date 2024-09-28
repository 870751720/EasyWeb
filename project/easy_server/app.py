import threading
import time
from flask import Flask
from flask_cors import CORS
from blueprints import init_blueprints
from db.db import init_db
from utils.page import init_page
from utils.mail import init_mail

def create_app():
	app = Flask(__name__, static_folder="./statics", static_url_path="/")
	init_mail(app)
	init_blueprints(app)
	init_page(app)
	init_db(app)
	CORS(app)
	return app

def delayed_function():
	from db.db import check_db
	time.sleep(3)
	check_db()


if __name__ == "__main__":
	app = create_app()

	threading.Thread(target=delayed_function).start()

	app.run(host="0.0.0.0")