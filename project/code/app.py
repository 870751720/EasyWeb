from flask import Flask
from project.code.blueprints import register_blueprints
from project.code.db.db import init_db
from project.code.errors import init_error


def create_app():
	app = Flask(__name__)
	init_db(app)
	init_error(app)
	register_blueprints(app)
	return app


if __name__ == '__main__':
	app = create_app()
	app.run(host='0.0.0.0')
