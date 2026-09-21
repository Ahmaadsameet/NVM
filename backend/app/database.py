from pathlib import Path
import sqlite3

from .settings import get_setting

DATABASE_PATH = Path(get_setting("NWM_DATABASE_PATH", str(Path(__file__).resolve().parents[1] / "nwm.sqlite3")))


def get_connection() -> sqlite3.Connection:
    connection = sqlite3.connect(DATABASE_PATH)
    connection.row_factory = sqlite3.Row
    return connection


def initialize_database() -> None:
    DATABASE_PATH.parent.mkdir(parents=True, exist_ok=True)
    with get_connection() as connection:
        connection.execute(
            """
            CREATE TABLE IF NOT EXISTS inquiries (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                message TEXT NOT NULL,
                created_at TEXT NOT NULL
            )
            """
        )
        connection.execute(
            """
            CREATE TABLE IF NOT EXISTS project_briefs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                brand_name TEXT NOT NULL,
                instagram TEXT,
                contact_email TEXT NOT NULL,
                product_type TEXT NOT NULL,
                total_pieces INTEGER NOT NULL,
                tech_packs_available INTEGER NOT NULL,
                colours TEXT NOT NULL,
                pieces_per_style TEXT NOT NULL,
                created_at TEXT NOT NULL
            )
            """
        )
        connection.commit()
