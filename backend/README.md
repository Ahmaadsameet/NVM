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

The frontend Nginx configuration proxies `/api/*` requests to the `backend` Docker host.

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
NWM_SMTP_PASSWORD=your-gmail-app-password
NWM_SMTP_SENDER=your-sending-account@gmail.com
```

The safe variable template is available in `.env.example`. Keep `.env`
private and never commit it. Docker Compose loads `.env` directly into the
backend container; the frontend container does not receive SMTP settings.

Do not put passwords, API keys, private certificates, or service-account files
in frontend source, `VITE_*` variables, or `.env.example`. Anything exposed to
the Vite frontend can be downloaded by website visitors.

Then restart the stack:

```powershell
docker compose up --build -d
```

The recipient is controlled by `NWM_NOTIFICATION_EMAIL` in the private `.env`
file. If SMTP credentials are not configured, submissions are still saved to
SQLite and the backend logs that email delivery was skipped.
