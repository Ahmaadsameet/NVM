# North Weave Mills API

The backend validates website form submissions and delivers them directly by
SMTP. Submissions are not stored in a database or written to disk.

## Run locally

Configure the SMTP settings in the private root `.env`, then run from the
project root:

```powershell
python -m pip install -r requirements.txt
python -m uvicorn backend.app.main:app --env-file .env --reload --port 8000
```

Required email settings:

- `NWM_NOTIFICATION_EMAIL` — address that receives both forms
- `NWM_SMTP_HOST` — SMTP server, such as `smtp.gmail.com`
- `NWM_SMTP_PORT` — STARTTLS port, normally `587`
- `NWM_SMTP_USERNAME` — SMTP login
- `NWM_SMTP_PASSWORD` — SMTP password or provider app password
- `NWM_SMTP_SENDER` — optional From address; defaults to the SMTP username

The email entered by the visitor is assigned to the message's `Reply-To`
header. The API returns success only after the SMTP server accepts the email.
If configuration or delivery fails, the API returns `503` and the frontend
shows the submission error.

## Endpoints

- `GET /api/health` — service health check
- `POST /api/inquiries` — email the short inquiry form
- `POST /api/project-briefs` — email the detailed project brief

Interactive API documentation is available at `http://127.0.0.1:8000/docs`.

## Docker

```powershell
docker compose config --quiet
docker compose up --build --wait
```

The frontend proxies `/api/*` requests to the backend container. SMTP secrets
remain server-side and must never be placed in frontend source or `VITE_*`
variables.
