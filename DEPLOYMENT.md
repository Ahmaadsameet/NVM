# ALL-INKL deployment

The website is a static React/Vite build with one PHP email handler,
`contact.php`. No Python, database, Docker or Node server is required on
ALL-INKL. Node.js and npm are only used on your computer to build the files.
The hosting directory must execute PHP 8.x and allow PHP's `mail()` function.

## Build

From the project folder:

```powershell
cd frontend
npm ci
npm run build
```

The finished website is in `frontend/dist/`. Vite copies
`frontend/public/contact.php` to `frontend/dist/contact.php` automatically.
Use `npm run preview` to preview the layout, but Vite does **not** execute PHP;
the forms must be tested on PHP hosting.

If PHP is installed locally, serve the finished build with:

```powershell
php -S 127.0.0.1:8080 -t dist
```

Local email delivery also needs a configured mail transport.

## Upload to ALL-INKL

1. In ALL-INKL KAS, find the directory assigned to your domain. This build
   expects the domain root, such as `https://northweavemills.com/`.
2. Back up any existing website before replacing files.
3. Upload the **contents** of `frontend/dist/` using your FTP client.
   `index.html`, `contact.php` and `assets/` must sit directly in the domain's
   directory. Do not upload the enclosing `dist` folder.
4. Enable PHP 8.x and HTTPS for the domain. Check the site using HTTPS.
5. Submit both forms and verify the messages in the recipient inbox.

The build includes `404.html` and static entry files under `impressum/` and
`datenschutz/` for direct URL access and refresh. Only upload the build contents. Do not upload `.env`, `.git`, `.venv`,
`node_modules` or the source checkout. Existing local Python environment and
SMTP configuration files are unused. No rewrite rules are required.

## Email configuration

Both forms submit to `/contact.php`. The handler sends to
**samoon@northweavemills.com**, using the same address as its From address.
Make sure the mailbox exists and your hosting account permits this sender.
The visitor's validated email becomes Reply-To.

The handler validates required fields, lengths, email format, quantities and
tech-pack choices. It rejects header injection and uses an invisible honeypot
for basic spam filtering. Recipient and subjects are fixed on the server.
It does not save submissions to a database or send automatic replies.
The honeypot is basic filtering, not a CAPTCHA or comprehensive rate limit.

FormSubmit is no longer used, so no third-party activation is needed.
The footer's existing general contact address is unchanged. To change the form
recipient later, update the constants in `frontend/public/contact.php` and the
email link in `frontend/src/data/contact.js`, then rebuild and upload.

## Verify delivery

Submit one inquiry and one complete project brief from the live domain.
Check all fields, any non-English characters, and the Reply-To address in the
received messages. Check spam if necessary.

PHP's `mail()` returning success means the server accepted the message for
delivery; it does not guarantee inbox delivery. See the
[PHP mail documentation](https://www.php.net/manual/en/function.mail.php).
If the handler reports an error, check the hosting PHP error log and confirm
that `mail()` is enabled. If it reports success but nothing arrives, check
the mailbox, spam folder and hosting mail configuration with ALL-INKL.

The confirmation page uses a redirect so refreshing it does not resend the
form. Validation and transport failures show an error plus a direct email link.

## Updates

Run `npm run build` after changes and upload the new contents of
`frontend/dist/`. Upload assets and `contact.php` before replacing `index.html`.

## Custom 404 page

Upload the hidden `.htaccess` file included in `frontend/dist/`. Its
`ErrorDocument 404 /404.html` directive serves the branded page for unknown
URLs on Apache hosting while keeping the HTTP 404 status. If the server
already has an `.htaccess`, merge this directive with its existing rules.
Verify an unknown URL after deployment; Vite development does not test
Apache error handling.

## Form reliability and rate limits

Both forms submit to the same-origin `contact.php` endpoint using JSON responses.
Errors remain inside the form, keeping the entered details in the current page
for a manual retry. Nothing is saved in browser storage. The send and close
buttons are disabled during a request. A network timeout reports that sending
could not be confirmed; it does not automatically retry.

The PHP handler permits five validated send attempts per connection IP address
per 15-minute window, shared by both forms. Failed mail attempts count too.
Further attempts return HTTP 429 with `Retry-After`. Invalid fields and honeypot
submissions never reach the mail handler. Browser and server field limits use
UTF-8 byte lengths, including for German text.

Rate counters are stored in the PHP temporary directory, outside the public web
root, in `nwm-contact-<hash-of-handler-directory>.json`. The file holds a random
HMAC key, keyed hashes of connection IP addresses, counts, and expiry times; it
contains no raw IPs, email addresses or submission text. Entries expire after
15 minutes and are physically removed on the next validated submission. With
no further submissions, expired entries remain until the host cleans its temp
directory. The file is limited to 1,000 active entries and protected by an
exclusive lock. If its storage cannot be read, locked, or written, sending is
blocked with HTTP 503. Hosting must permit writable private temporary files.
This limiter assumes one web server and uses `REMOTE_ADDR`; a reverse proxy
requires a separately reviewed trusted-client-IP configuration. It does not
provide distributed bot protection.

Run `py frontend/tests/test_contact.py` to test validation, sender/Reply-To,
mail failure responses, concurrent limits and expiry. Set `php` on PATH if it
is not installed at `C:/xampp/php/php.exe`. These tests stub `mail()` and never
send real messages. Before launch, submit both forms on PHP hosting and verify
the recipient inbox, spam folder and Reply-To. Also confirm mail quotas and
SPF/DKIM configuration with the host. No successful local test proves inbox
delivery. The exact client-supplied legal text has not been changed; include
the counter-storage details in the server handover/privacy review.
