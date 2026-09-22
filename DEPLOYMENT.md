# Azure Ubuntu VM demo deployment

This deployment runs two containers on one Ubuntu 24.04 LTS VM:
`browser -> Nginx :80 -> backend:8000 -> SQLite`. Nginx serves the compiled
React application. Uvicorn runs `backend.app.main:app`. SQLite remains in
the existing `nwm-data` named volume at `/app/data/nwm.sqlite3`.

```text
Browser -> Nginx :80
             |-- page/assets -> /usr/share/nginx/html (built React)
             `-- /api/* -> backend:8000 (FastAPI + Uvicorn)
                              |-- commit submission -> SQLite named volume
                              `-- after commit -> SMTP STARTTLS :587 notification
```

Run every Compose command from the project root, where `docker-compose.yml`
and the private `.env` live. The frontend build uses that root as its context
and `nginx/Dockerfile` as its Dockerfile. Node is used only to build assets;
the running frontend container uses Nginx.

## 1. Check the containers locally

Install and start Docker Desktop with Linux containers, then run in
PowerShell from the project root. Preserve your existing `.env`; if one does
not exist, create it from the template and edit it before starting:

```powershell
if (-not (Test-Path -LiteralPath .env)) {
    Copy-Item -LiteralPath .env.example -Destination .env
}
notepad .env
docker compose config --quiet
docker compose up --build --wait
docker compose ps
docker compose exec frontend nginx -t
curl.exe -fsS http://localhost/api/health
curl.exe -fsS -o NUL -w "%{http_code}\n" http://localhost/
curl.exe -fsS -o NUL -w "%{http_code}\n" http://localhost/portfolio-preview
foreach ($path in @('/.env', '/.git/config', '/data/nwm.sqlite3')) {
    curl.exe -sS -o NUL -w "%{http_code}\n" "http://localhost$path"
}
docker compose logs --tail=100 backend frontend
```

Stop if a command fails. Health should return `{"status":"ok"}`; the root
and SPA fallback checks should return `200`; each private path should return
`404`. `docker compose ps` should publish port 80 for `frontend` only.
The backend may show `8000/tcp` internally, without a host port mapping.
The VM checks below repeat this validation on Linux; these commands are a
runbook, not a record of completed Docker runtime tests.

## 2. Prepare the Azure VM

Create an Ubuntu Server 24.04 LTS VM with an SSH key and a public IP. In the
VM's Azure network security group, allow inbound TCP 80 for visitors and
TCP 22 only from your own public IP. Do not add an inbound rule for 8000.
Connect through SSH and keep the private SSH key on your own computer.

The configuration here serves HTTP on port 80. Use sample data for this
portfolio demo. Keep administrative token requests inside SSH or the VM
until HTTPS is configured; HTTP does not encrypt submitted data or headers.

Install Docker Engine and the Compose plugin on the fresh VM using the
[official Docker Ubuntu repository](https://docs.docker.com/engine/install/ubuntu/):

```bash
sudo apt-get update
sudo apt-get install -y ca-certificates curl git nano python3
sudo install -d -m 0755 /etc/apt/keyrings
sudo curl --fail --silent --show-error --location \
  https://download.docker.com/linux/ubuntu/gpg \
  --output /etc/apt/keyrings/docker.asc
sudo chmod 0644 /etc/apt/keyrings/docker.asc

. /etc/os-release
sudo tee /etc/apt/sources.list.d/docker.sources > /dev/null <<EOF
Types: deb
URIs: https://download.docker.com/linux/ubuntu
Suites: ${UBUNTU_CODENAME:-$VERSION_CODENAME}
Components: stable
Architectures: $(dpkg --print-architecture)
Signed-By: /etc/apt/keyrings/docker.asc
EOF

sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io \
  docker-buildx-plugin docker-compose-plugin
sudo systemctl enable --now docker
sudo docker version
sudo docker compose version
```

If this VM already has Docker packages installed, follow the official
instructions for conflicting packages before installing. Commands below use
`sudo`, so adding your SSH user to the Docker group is unnecessary. Use the
Azure network security group for inbound restrictions; Docker-published
ports can bypass ordinary UFW rules, as described in the same Docker guide.

## 3. Copy the application and configure its private environment

Commit and push the deployment files through your usual Git workflow, then
clone that revision on the VM. Do not put an access token in the repository
URL. Use your normal SSH or credential-based authentication if it is private.

```bash
read -r -p 'Repository URL: ' nwm_repo_url
git clone "$nwm_repo_url" nwm-demo
cd nwm-demo
umask 077
cp -n .env.example .env
chmod 600 .env
nano .env
```

`cp -n` preserves an existing `.env`. Enter credentials only in that file.
If a value contains `$` or `#`, single-quote the value in `.env` so Compose
reads it literally. The template has blank credentials; the following command
fills a blank `NWM_ADMIN_TOKEN` (or adds it if missing), preserves a configured
token, and never prints its value:

```bash
python3 - <<'PY'
from pathlib import Path
import secrets

env_file = Path('.env')
lines = env_file.read_text(encoding='utf-8').splitlines()
for index, line in enumerate(lines):
    if line.startswith('NWM_ADMIN_TOKEN='):
        if not line.partition('=')[2].strip():
            lines[index] = 'NWM_ADMIN_TOKEN=' + secrets.token_urlsafe(32)
        break
else:
    lines.append('NWM_ADMIN_TOKEN=' + secrets.token_urlsafe(32))
env_file.write_text('\n'.join(lines) + '\n', encoding='utf-8')
PY
chmod 600 .env
```

| Variable | Value or purpose |
| --- | --- |
| `NWM_DATABASE_PATH` | `/app/data/nwm.sqlite3`; Compose fixes this path inside the persistent volume. |
| `NWM_ADMIN_TOKEN` | Generated secret for `X-Admin-Token` on `GET /api/inquiries`; keep it out of browser code. Blank disables that admin endpoint. |
| `NWM_CORS_ORIGINS` | May remain blank: the browser and `/api/` share an origin through Nginx. |
| `NWM_NOTIFICATION_EMAIL` | Notification recipient; configure with SMTP or leave blank to skip email. |
| `NWM_SMTP_HOST` | Your authenticated SMTP provider's host. |
| `NWM_SMTP_PORT` | `587`; the current backend connects with SMTP and STARTTLS. |
| `NWM_SMTP_USERNAME` | SMTP account username. |
| `NWM_SMTP_PASSWORD` | SMTP password or provider app password. |
| `NWM_SMTP_SENDER` | Authorized sender address; defaults to the SMTP username when blank. |

Use an authenticated SMTP service that supports STARTTLS on port 587. The
current implementation does not use implicit TLS on port 465. Azure restricts
outbound port 25 for many subscriptions; authenticated SMTP on 587 is the
[documented Azure approach](https://learn.microsoft.com/en-us/troubleshoot/azure/virtual-network/troubleshoot-outbound-smtp-connectivity).
If you restrict outbound traffic yourself, permit your SMTP service as well
as the DNS and HTTPS access required for installation and image builds.

`.env` stays out of Git and Docker images. Only the backend receives its
runtime settings. Vite does not load environment files, and the frontend
uses relative `/api/` URLs. Never add credentials to frontend source or
public assets. Use `docker compose config --quiet` for validation; ordinary
`docker compose config` can print resolved credentials.

## 4. Start and verify on the VM

```bash
sudo docker compose config --quiet
sudo docker compose up --build --wait
sudo docker compose ps
sudo docker compose exec frontend nginx -t
curl --fail --silent --show-error http://127.0.0.1/api/health
curl --fail --silent --show-error --output /dev/null --write-out '%{http_code}\n' http://127.0.0.1/
curl --fail --silent --show-error --output /dev/null --write-out '%{http_code}\n' http://127.0.0.1/portfolio-preview
for path in /.env /.git/config /data/nwm.sqlite3; do
  curl --silent --show-error --output /dev/null --write-out '%{http_code}\n' "http://127.0.0.1$path"
done
sudo docker compose logs --tail=100 backend frontend
```

Expect the same health, `200`, and `404` results as the local checks. Open
`http://YOUR_VM_PUBLIC_IP/` from another computer, then open
`http://YOUR_VM_PUBLIC_IP/api/health`. Submit a sample inquiry from the UI
and confirm it saves; confirm email arrives if SMTP is configured. SMTP
failure or omitted credentials do not prevent the saved SQLite submission.

Both containers restart automatically with Docker after a VM reboot unless
you explicitly stop them. The backend health check gates Nginx startup.
Nginx preserves `/api/` in upstream paths because the actual FastAPI routes
include that prefix. API docs on the backend's `/docs` are not publicly
proxied by this configuration.

For a `502`, check backend health and logs, then restart `frontend` if the
backend was recreated independently. For a connection timeout from outside
the VM, verify its public IP and Azure TCP 80 rule. The HTTP health endpoint
checks API availability; it does not verify SMTP delivery.

## 5. Updates, environment changes, and persistence

From the same clone directory, after backing up:

```bash
git pull --ff-only
sudo docker compose config --quiet
sudo docker compose up --build --force-recreate --wait
curl --fail --silent --show-error http://127.0.0.1/api/health
```

Recreating both services also refreshes Nginx's lookup of the backend's
Docker address. After changing `.env`, use the same Compose command to load
the new settings; a plain container restart does not update its environment.
If only restarting the running stack, use `sudo docker compose restart`.
To stop and remove its containers, use `sudo docker compose down`.

The named volume survives rebuilds, restarts, and ordinary `down`. **Do not
use `docker compose down -v` or delete/prune the data volume.** Keep the same
directory name and Compose project name: switching projects creates a
different volume. The local `backend/nwm.sqlite3` database is not bundled
into the image or automatically migrated to Azure. A first deployment
starts with an empty database; migrating existing demo data is a separate,
optional backup-and-restore step.

## 6. Back up SQLite

Run from the VM project root while the backend is running. SQLite's backup
API creates a consistent snapshot, including committed WAL data:

```bash
umask 077
mkdir -p "$HOME/nwm-backups"
chmod 700 "$HOME/nwm-backups"
nwm_backup_name="nwm-$(date -u +%Y%m%dT%H%M%SZ).sqlite3"
sudo docker compose exec -T backend python - <<'PY'
import sqlite3

source = sqlite3.connect('file:/app/data/nwm.sqlite3?mode=ro', uri=True)
target = sqlite3.connect('/tmp/nwm-backup.sqlite3')
try:
    source.backup(target)
finally:
    target.close()
    source.close()
PY
sudo docker compose cp backend:/tmp/nwm-backup.sqlite3 "$HOME/nwm-backups/$nwm_backup_name"
sudo chown "$(id -u):$(id -g)" "$HOME/nwm-backups/$nwm_backup_name"
chmod 600 "$HOME/nwm-backups/$nwm_backup_name"
sudo docker compose exec -T backend python -c "from pathlib import Path; Path('/tmp/nwm-backup.sqlite3').unlink()"
```

Copy snapshots to private storage outside the VM so loss of the VM's disk
does not lose the database. Do not copy only a live `.sqlite3` file while
WAL writes are active. Keep backups outside the repository and web root.
