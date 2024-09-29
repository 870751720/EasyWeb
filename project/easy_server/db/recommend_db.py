from db.db import db


class Recommend(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	res_info = db.Column(db.String(500), nullable=False)
	res_type = db.Column(db.String(10), default="txt", nullable=False)  # txt img video
	random_num = db.Column(db.Integer, default=0, nullable=False)
