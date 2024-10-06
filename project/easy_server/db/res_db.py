from db.db import db
from sqlalchemy import Index


class Resource(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    path = db.Column(db.String(500), nullable=False, unique=True)


Index("idx_path", Resource.path)
