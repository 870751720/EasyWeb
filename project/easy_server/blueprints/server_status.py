import psutil
from flask import Blueprint, jsonify
from utils.auth import token_and_roles_required
from utils.localize import _l

server_status_bp = Blueprint("server_status", __name__)


@server_status_bp.route("/get", methods=["GET"])
@token_and_roles_required(["superadmin"])
def server_status_get(_):
    memory = psutil.virtual_memory()
    cpu = psutil.cpu_percent(interval=1)
    disk = psutil.disk_usage("/")
    net = psutil.net_io_counters()

    return jsonify(
        {
            "status": 200,
            "memory": {
                "total": memory.total,
                "available": memory.available,
                "used": memory.used,
                "percent": memory.percent,
            },
            "cpu": {"percent": cpu},
            "disk": {
                "total": disk.total,
                "used": disk.used,
                "free": disk.free,
                "percent": disk.percent,
            },
            "network": {"bytes_sent": net.bytes_sent, "bytes_recv": net.bytes_recv},
        }
    )
