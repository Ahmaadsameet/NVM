import os


def get_setting(name: str, default: str = "") -> str:
    return os.getenv(name, default).strip()


def get_cors_origins() -> list[str]:
    return [
        origin.strip()
        for origin in get_setting("NWM_CORS_ORIGINS").split(",")
        if origin.strip()
    ]


def get_admin_token() -> str:
    return get_setting("NWM_ADMIN_TOKEN")
