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

Build and run the backend image:

```powershell
docker build -f Dockerfile.backend -t nwm-backend .
docker run --rm -p 8000:8000 -v nwm-data:/app/data nwm-backend
```

Build the frontend image:

```powershell
docker build -f frontend/Dockerfile.frontend -t nwm-frontend .
docker run --rm -p 8080:80 --add-host=backend:host-gateway nwm-frontend
```

The frontend Nginx configuration proxies `/api/*` requests to the backend
service at `http://backend:8000`. This internal service name is the
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

- Frontend: `http://127.0.0.1:8080`
- Backend API docs are internal and are not published by Compose.

Stop both containers with:

```powershell
docker compose down
```

The SQLite database persists in the `nwm-data` Docker volume.

The root `.env` is the only runtime environment file. Provide that private
file on the staging or production server before starting Compose; do not
commit it. Docker Compose uses `NWM_FRONTEND_PORT` for the public frontend
mapping and passes the same root file to the backend container.
`NWM_DATABASE_PATH` must remain `/app/data/nwm.sqlite3` in Compose so it points
into the persistent `nwm-data` volume.

For a public server, place the frontend behind an HTTPS reverse proxy and
forward traffic to port `8080`. Keep the backend container private. Set
`NWM_CORS_ORIGINS` to the exact HTTPS frontend origin and configure a long
random `NWM_ADMIN_TOKEN` in the private `.env` file. Use that token as
`X-Admin-Token` only from a trusted administrative client when reading
inquiries.

Back up the `nwm-data` Docker volume regularly. The application does not
provide automatic backups.

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
