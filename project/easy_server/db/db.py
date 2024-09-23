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
	app.config["SECRET_KEY"] = "4d362127bea8fb5f6cd1fb9a06b2e32a4c4bff33838c9fa8"
	db.init_app(app)

def check_db():
	from db.user_db import User
	db.create_all()
	superadmin = User(
		username="admin",
		# password => 123456
		password="scrypt:32768:8:1$msV2oG4Tv7pRB7Vd$8d3460d7058348538975f1d4ce60d0e0b4167d1320048f3b518c73497a92960fb7c61634c69781a6eeac8d1c892f3c96067be8061057cd9006c337cb2b659592",
		email="870751720@qq.com",
		role="superadmin"
	)
	db.session.add(superadmin)
	db.session.commit()
