"""Exercise actual PHP multipart parsing; the mail transport is stubbed."""
import base64
import json
from email import policy
from email.parser import BytesParser
from pathlib import Path
import shutil
import socket
import subprocess
import tempfile
import time
import unittest
import urllib.error
import urllib.request

PHP = shutil.which('php') or ('C:/xampp/php/php.exe' if Path('C:/xampp/php/php.exe').exists() else None)


@unittest.skipUnless(PHP, 'PHP runtime is required')
class UploadTests(unittest.TestCase):
    def test_attachment_delivery_and_rejection(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            shutil.copyfile(Path(__file__).resolve().parents[1] / 'public/contact.php', root / 'contact.php')
            (root / 'router.php').write_text("""<?php
function mail($to, $subject, $body, $headers) {
    file_put_contents(__DIR__ . '/mail.json', json_encode(['headers' => $headers, 'body' => $body]));
    return true;
}
require __DIR__ . '/contact.php';
""")
            with socket.socket() as sock:
                sock.bind(('127.0.0.1', 0))
                port = sock.getsockname()[1]
            process = subprocess.Popen([PHP, '-d', 'disable_functions=mail', '-d', 'upload_max_filesize=6M', '-d', 'post_max_size=8M', '-d', 'sys_temp_dir=' + tmp, '-S', f'127.0.0.1:{port}', str(root / 'router.php')], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            try:
                for _ in range(50):
                    try:
                        with socket.create_connection(('127.0.0.1', port), timeout=.2):
                            break
                    except OSError:
                        time.sleep(.1)
                def send(data):
                    boundary = 'test-nwm-boundary'
                    fields = {'form_type': 'brief', 'name': 'Jane', 'brand_name': 'Test', 'email': 'test@example.com', 'product_type': 'denim', 'phone': '+49 123', 'country': 'Germany', 'target_delivery_date': '2027-01-20', 'target_price': 'EUR 25'}
                    parts = [f'--{boundary}\r\nContent-Disposition: form-data; name="{key}"\r\n\r\n{value}\r\n'.encode() for key, value in fields.items()]
                    parts.append(f'--{boundary}\r\nContent-Disposition: form-data; name="attachment"; filename="brief.png"\r\nContent-Type: image/png\r\n\r\n'.encode() + data + b'\r\n')
                    parts.append(f'--{boundary}--\r\n'.encode())
                    request = urllib.request.Request(f'http://127.0.0.1:{port}/', data=b''.join(parts), headers={'Accept': 'application/json', 'Content-Type': f'multipart/form-data; boundary={boundary}'})
                    try:
                        response = urllib.request.urlopen(request)
                    except urllib.error.HTTPError as error:
                        response = error
                    return response.status, json.loads(response.read())
                png = base64.b64decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=')
                self.assertEqual(send(png)[0], 200)
                mail = json.loads((root / 'mail.json').read_text())
                raw = ''.join(f'{key}: {value}\r\n' for key, value in mail['headers'].items()).encode() + b'\r\n' + mail['body'].encode()
                message = BytesParser(policy=policy.default).parsebytes(raw)
                attachment = list(message.iter_attachments())[0]
                self.assertEqual(attachment.get_payload(decode=True), png)
                body = message.get_body(preferencelist=('plain',)).get_content()
                for value in ['Jane', '+49 123', 'Germany', '2027-01-20', 'EUR 25', 'denim']:
                    self.assertIn(value, body)
                self.assertEqual(send(png + b'x' * (5 * 1024 * 1024))[0], 200)
                (root / 'mail.json').unlink()
                for invalid in [b'<?php echo "bad";']:
                    status, result = send(invalid)
                    self.assertEqual(status, 422)
                    self.assertEqual(result['field'], 'attachment')
                    self.assertFalse((root / 'mail.json').exists())
            finally:
                process.terminate()
                process.wait(timeout=5)


if __name__ == '__main__':
    unittest.main()
