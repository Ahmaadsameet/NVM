# North Weave Mills API

## Run locally

From the project root:

```powershell
C:/Python314/python.exe -m uvicorn backend.app.main:app --reload --port 8000
```

The API stores inquiries in `backend/nwm.sqlite3`.

The backend is organized by responsibility:

- `app/main.py` — creates the FastAPI application and includes routes
- `app/database.py` — SQLite connection and initialization
- `app/schemas.py` — request and response validation models
- `app/routes/health.py` — health endpoint
- `app/routes/inquiries.py` — inquiry endpoints
- `app/routes/briefs.py` — detailed project brief endpoint
- `app/notifications.py` — SMTP email notifications

SQLite connections are short-lived and always closed after each request.
They use WAL journaling and a 30-second busy timeout so concurrent reads and
writes wait briefly instead of failing immediately with a database-locked
error. Keep database writes inside the connection context and complete them
before doing external work such as email notifications.

## Endpoints

- `GET /api/health` — service health check
- `POST /api/inquiries` — save an inquiry
- `GET /api/inquiries` — list saved inquiries; requires the `X-Admin-Token` header

Interactive API documentation is available at `http://127.0.0.1:8000/docs`.

## Docker

For the complete local checks and Azure Ubuntu VM deployment commands, see
[the deployment guide](../DEPLOYMENT.md).

Build and run both services from the project root:

```powershell
docker compose config --quiet
docker compose up --build --wait
```

Compose builds `nginx/Dockerfile` with the project root as its context. Its
build stage runs `npm ci` and `npm run build`; Nginx serves the resulting
static files. The backend uses the root `requirements.txt` and runs
`uvicorn backend.app.main:app --host 0.0.0.0 --port 8000`.

The Nginx configuration in the root-level `nginx/` folder proxies `/api/*`
requests to the backend service at `http://backend:8000`. This internal service name is the
relationship between the frontend and backend containers; browser requests
continue to use relative `/api/*` URLs.

The frontend source is organized under the project-level `frontend/` directory.
Run frontend commands from that directory:

```powershell
cd frontend
npm install
npm run dev
```

## Run frontend and backend together

From the project root:

```powershell
docker compose up --build
```

Then open:

- Frontend: `http://127.0.0.1`
- Backend API docs are internal and are not published by Compose.

Stop both containers with:

```powershell
docker compose down
```

The SQLite database persists in the `nwm-data` Docker volume.

The root `.env` is the only runtime environment file. Provide that private
file on the staging or production server before starting Compose; do not
commit it. Start from the credential-free root `.env.example` on a new host.
Docker Compose publishes Nginx on port 80 and passes `.env` only to the backend
container. `NWM_FRONTEND_PORT` is no longer used. Compose fixes
`NWM_DATABASE_PATH` at `/app/data/nwm.sqlite3` so the database and its sidecar
files always reside in the persistent `nwm-data` volume.

This demo is served over HTTP on port 80. Use sample data until HTTPS is
configured. Keep port 8000 private. Browser requests use the same origin, so
`NWM_CORS_ORIGINS` may be blank. Configure a long random `NWM_ADMIN_TOKEN` in
the private `.env` file and use it as `X-Admin-Token` only from a trusted
administrative client over an SSH tunnel or HTTPS when reading inquiries.

Back up the `nwm-data` Docker volume regularly. The application does not
provide automatic backups. Do not run `docker compose down -v`, which removes
the database volume. The local `backend/nwm.sqlite3` is not copied into the
image; a new VM starts with an empty database unless you restore a backup.

## Email notifications

New inquiries and project briefs are sent to the address configured in the
private root `.env` file when SMTP credentials are configured. For Gmail, use
an app password rather than your normal account password:

Set the values in the root `.env` file:

```text
NWM_NOTIFICATION_EMAIL=your-recipient@example.com
NWM_SMTP_HOST=smtp.gmail.com
NWM_SMTP_PORT=587
NWM_SMTP_USERNAME=your-sending-account@gmail.com
NWM_SMTP_PASSWORD=
NWM_SMTP_SENDER=your-sending-account@gmail.com
```

Keep `.env` private and never commit it. Docker Compose loads `.env` directly
into the backend container; the frontend container does not receive SMTP
settings.

Fill in `NWM_SMTP_PASSWORD` only in the private root `.env`. The blank value
above is intentional. Git and Docker exclude environment files, private keys,
and credential files, including copies in subdirectories. Vite does not load
environment files or expose prefixed environment variables to browser code.
Nginx rejects requests for hidden files and common credential/database files.

Do not put passwords, API keys, private certificates, or service-account files
in frontend source or `VITE_*` variables. Anything exposed to
the Vite frontend can be downloaded by website visitors.

Then restart the stack:

```powershell
docker compose up --build -d
```

The recipient is controlled by `NWM_NOTIFICATION_EMAIL` in the private `.env`
file. If SMTP credentials are not configured, submissions are still saved to
SQLite and the backend logs that email delivery was skipped.
