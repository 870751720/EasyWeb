import os
from flask_mail import Mail, Message


mail = Mail()


def init_mail(app):
	app.config["MAIL_SERVER"] = "smtp.qq.com"
	app.config["MAIL_PORT"] = 587
	app.config["MAIL_USE_TLS"] = True
	app.config["MAIL_USERNAME"] = os.getenv("MAIL_USERNAME")
	app.config["MAIL_PASSWORD"] = os.getenv("MAIL_PASSWORD")
	mail.init_app(app)


def send_mail(subject, to, body):
	msg = Message(subject, sender=os.getenv("MAIL_USERNAME"), recipients=[to])
	msg.body = body
	mail.send(msg)
