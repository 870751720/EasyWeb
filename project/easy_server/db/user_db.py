from db.db import db


class User(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	username = db.Column(db.String(80), nullable=False)
	password = db.Column(db.String(120), nullable=False)
	email = db.Column(db.String(120), unique=True, nullable=True)
	role = db.Column(db.String(20), default="guest")  # guest user admin superadmin

	def __repr__(self):
		return f"<User {self.username}>, Role: {self.role}"
