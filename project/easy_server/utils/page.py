import os

from flask import g, request, send_from_directory


def init_page(app):
    @app.before_request
    def set_language():
        language = request.headers.get("Accept-Language", "ch")
        g.language = language

    @app.route("/", defaults={"path": ""})
    @app.route("/<path:path>")
    def serve_react_app(path):
        if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
            return send_from_directory(app.static_folder, path)
        return send_from_directory(app.static_folder, "index.html")
