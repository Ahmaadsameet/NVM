from contextlib import contextmanager
from pathlib import Path
import sqlite3
from collections.abc import Generator

from .settings import get_setting

DATABASE_PATH = Path(get_setting("NWM_DATABASE_PATH", str(Path(__file__).resolve().parents[1] / "nwm.sqlite3")))
SQLITE_BUSY_TIMEOUT_MS = 30_000


@contextmanager
def get_connection() -> Generator[sqlite3.Connection, None, None]:
    connection = sqlite3.connect(DATABASE_PATH, timeout=SQLITE_BUSY_TIMEOUT_MS / 1000)
    connection.row_factory = sqlite3.Row
    try:
        connection.execute(f"PRAGMA busy_timeout = {SQLITE_BUSY_TIMEOUT_MS}")
        connection.execute("PRAGMA foreign_keys = ON")
        connection.execute("PRAGMA journal_mode = WAL")
        connection.execute("PRAGMA synchronous = NORMAL")
        yield connection
    finally:
        connection.close()


def initialize_database() -> None:
    DATABASE_PATH.parent.mkdir(parents=True, exist_ok=True)
    with get_connection() as connection:
        connection.executescript(
            """
            CREATE TABLE IF NOT EXISTS inquiries (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                message TEXT NOT NULL,
                created_at TEXT NOT NULL
            );

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
            );
            """
        )
