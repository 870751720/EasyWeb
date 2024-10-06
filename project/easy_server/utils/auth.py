from datetime import datetime, timedelta
from functools import wraps

import jwt
from db.user_db import User
from flask import current_app, jsonify, request
from utils.localize import _l


def token_and_roles_required(allowed_roles=None):
    def decorator(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            token = None
            if "Authorization" in request.headers:
                token = request.headers["Authorization"]
            if not token:
                return jsonify({"error": _l("TID_AUTH_NO_TOKEN"), "status": -1})

            try:
                data = jwt.decode(
                    token, current_app.config["SECRET_KEY"], algorithms=["HS256"]
                )
                current_user = User.query.filter_by(id=data["user_id"]).first()
            except jwt.ExpiredSignatureError:
                return jsonify({"error": _l("TID_AUTH_EXPIRED_TOKEN"), "status": -2})
            except jwt.InvalidTokenError:
                return jsonify({"error": _l("TID_AUTH_INVALID_TOKEN"), "status": -3})

            if allowed_roles and current_user.role not in allowed_roles:
                return jsonify({"error": _l("TID_AUTH_NO_PERMISSION"), "status": -4})

            return f(current_user, *args, **kwargs)

        return decorated

    return decorator


def get_token(user_id):
    token = jwt.encode(
        {"user_id": user_id, "exp": datetime.utcnow() + timedelta(weeks=10)},
        current_app.config["SECRET_KEY"],
        algorithm="HS256",
    )
    return token
