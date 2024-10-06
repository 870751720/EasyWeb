import os
import time

from utils.mail import send_mail

verification_codes = {}


def send_verification_email(email, verification_code):
    subject = "注册用户"
    verification_link = f"http://{os.getenv('SERVER_IP')}/user/verify?email={email}&code={verification_code}"
    body = f"请点击以下链接进行验证: {verification_link}"
    send_mail(subject, email, body)


def store_verification_code(email, code, info):
    verification_codes[email] = (code, time.time(), info)


def verify_code(email, code):
    if email in verification_codes:
        stored_code, timestamp, info = verification_codes[email]
        if time.time() - timestamp < 300 and stored_code == code:
            del verification_codes[email]
            return info
    return False
