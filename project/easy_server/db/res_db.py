from db.db import db

class Resource(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	path = db.Column(db.String(500), nullable=False)
	res_type = db.Column(db.String(10), nullable=False)

	def __repr__(self):
		return f"<Resource {self.path}, Type: {self.res_type}>"
