# Azure Ubuntu VM demo deployment

This deployment runs two containers on one Ubuntu 24.04 LTS VM:
`browser -> Nginx :80 -> backend:8000 -> SMTP`. Nginx serves the compiled
React application. Uvicorn runs `backend.app.main:app`. Form submissions are
emailed directly and are not stored on the VM.

```text
Browser -> Nginx :80
             |-- page/assets -> /usr/share/nginx/html (built React)
             `-- /api/* -> backend:8000 (FastAPI + Uvicorn)
                              `-- validated form -> SMTP STARTTLS :587
```

Run every Compose command from the project root, where `docker-compose.yml`
and the private `.env` live. This is the project's only environment file;
keep deployment settings and credentials there. The frontend build uses that
root as its context and `nginx/Dockerfile` as its Dockerfile. Node is used only
to build assets; the running frontend container uses Nginx.

## 1. Check the containers locally

Install and start Docker Desktop with Linux containers, then run in
PowerShell from the project root. Preserve your existing `.env`; if one does
not exist, create it and enter the settings from the table in section 3 before
starting. For these Docker checks, set `NWM_FRONTEND_PORT` to `80` and configure
the SMTP settings in that same file. Clear exported `NWM_*` shell variables
when relying on `.env`; shell values take precedence over file values.

```powershell
if (-not (Test-Path -LiteralPath .env)) {
    New-Item -Path .env -ItemType File | Out-Null
}
notepad .env
docker compose config --quiet
docker compose up --build --wait
docker compose ps
docker compose exec frontend nginx -t
curl.exe -fsS http://localhost/api/health
curl.exe -fsS -o NUL -w "%{http_code}\n" http://localhost/
curl.exe -fsS -o NUL -w "%{http_code}\n" http://localhost/portfolio-preview
foreach ($path in @('/.env', '/.git/config')) {
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
touch .env
chmod 600 .env
nano .env
```

`touch` preserves an existing `.env`. On a new clone, enter the keys from the
table below as `NAME=value` lines in this file, or securely transfer your
existing private `.env` to the VM. Enter credentials only in that file.
If a value contains `$` or `#`, single-quote the value in `.env` so Compose
reads it literally.

| Variable | Value or purpose |
| --- | --- |
| `NWM_FRONTEND_PORT` | `80`; public Nginx port used by Compose and the commands in this guide. Required and must be nonblank. |
| `NWM_CORS_ORIGINS` | May remain blank: the browser and `/api/` share an origin through Nginx. |
| `NWM_NOTIFICATION_EMAIL` | Required recipient for inquiry and project-brief emails. |
| `NWM_SMTP_HOST` | Your authenticated SMTP provider's host. |
| `NWM_SMTP_PORT` | `587`; the current backend connects with SMTP and STARTTLS. |
| `NWM_SMTP_USERNAME` | SMTP account username. |
| `NWM_SMTP_PASSWORD` | SMTP password or provider app password. |
| `NWM_SMTP_SENDER` | Authorized sender address; defaults to the SMTP username when blank. |

Compose reads the public port and SMTP settings from the root `.env`. Clear
exported `NWM_*` shell variables when relying on `.env`, because shell values
take precedence. Do not pass a different environment file with these instructions.

For a native backend run outside Docker, follow the
[backend development instructions](backend/README.md#run-locally), install the
requirements, and start Uvicorn with `--env-file .env`.

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
for path in /.env /.git/config; do
  curl --silent --show-error --output /dev/null --write-out '%{http_code}\n' "http://127.0.0.1$path"
done
sudo docker compose logs --tail=100 backend frontend
```

Expect the same health, `200`, and `404` results as the local checks. Open
`http://YOUR_VM_PUBLIC_IP/` from another computer, then open
`http://YOUR_VM_PUBLIC_IP/api/health`. Submit a sample inquiry from the UI
and confirm that the recipient receives it. Missing credentials or SMTP
delivery failure returns `503`, and the frontend displays an error.

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

There is no submission database or persistent data volume to back up. Keep the
private `.env` and SMTP credentials in an approved secrets-management system.
