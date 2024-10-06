from flask import g
from utils.localize_data import localize_info


def _l(message_id):
    return localize_info.get(g.language, localize_info["ch"]).get(message_id, "")
