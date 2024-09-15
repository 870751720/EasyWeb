import os
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

def get_database_uri():
	user = os.getenv("MYSQL_USER")
	password = os.getenv("MYSQL_PASSWORD")
	host = os.getenv("MYSQL_HOST")
	database = os.getenv("MYSQL_DB")

	return f"mysql+pymysql://{user}:{password}@{host}/{database}"

def init_db(app):
	app.config["SQLALCHEMY_DATABASE_URI"] = get_database_uri()
	app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
	db.init_app(app)
