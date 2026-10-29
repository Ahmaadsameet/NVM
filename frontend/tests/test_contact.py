"""Run with: py frontend/tests/test_contact.py (requires PHP; never sends email)."""
import concurrent.futures
import hashlib
import json
import os
from pathlib import Path
import shutil
import subprocess
import tempfile
import unittest

PHP = shutil.which('php') or ('C:/xampp/php/php.exe' if Path('C:/xampp/php/php.exe').exists() else None)


@unittest.skipUnless(PHP, 'PHP runtime is required')
class ContactTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name)
        shutil.copyfile(Path(__file__).resolve().parents[1] / 'public/contact.php', self.root / 'contact.php')
        (self.root / 'request.php').write_text('''<?php
$test = json_decode($argv[1], true);
$_POST = $test['post'];
$_SERVER['REQUEST_METHOD'] = 'POST';
$_SERVER['REMOTE_ADDR'] = $test['ip'];
$_SERVER['HTTP_ACCEPT'] = 'application/json';
$GLOBALS['mail_test'] = null;
function mail($to, $subject, $body, $headers) {
    $GLOBALS['mail_test'] = ['to' => $to, 'headers' => $headers, 'body' => base64_decode($body)];
    return !getenv('TEST_MAIL_FAIL');
}
register_shutdown_function(function () {
    echo "\\nTEST_META" . json_encode(['status' => http_response_code(), 'mail' => $GLOBALS['mail_test']]);
});
require __DIR__ . '/contact.php';
''', encoding='utf-8')

    def tearDown(self):
        self.temp.cleanup()

    def request(self, post=None, ip='192.0.2.1', fail=False):
        payload = post if post is not None else {'form_type': 'brief', 'brand_name': 'Test Brand', 'email': 'test@example.com'}
        env = dict(os.environ, TEST_MAIL_FAIL='1' if fail else '')
        result = subprocess.run([PHP, '-d', 'disable_functions=mail', '-d', 'sys_temp_dir=' + str(self.root), str(self.root / 'request.php'), json.dumps({'post': payload, 'ip': ip})], capture_output=True, text=True, env=env, check=True)
        body, meta = result.stdout.split('\nTEST_META')
        return json.loads(meta), json.loads(body)

    def test_both_forms_and_headers(self):
        for post in [None, {'form_type': 'inquiry', 'name': 'Test Person', 'email': 'test@example.com', 'message': 'An enquiry with umlauts: äöü.'}]:
            meta, body = self.request(post)
            self.assertEqual(meta['status'], 200)
            self.assertEqual(meta['mail']['to'], 'samoon@northweavemills.com')
            self.assertEqual(meta['mail']['headers']['Reply-To'], 'test@example.com')
            self.assertIn('samoon@northweavemills.com', meta['mail']['headers']['From'])
            self.assertIn('accepted for sending', body['message'])

    def test_invalid_fields_never_send(self):
        base = {'form_type': 'brief', 'brand_name': 'Test', 'email': 'test@example.com'}
        for changes in [{'brand_name': ''}, {'email': 'invalid'}, {'email': 'test@example.com\r\nBcc: bad@example.com'}, {'brand_name': 'ä' * 101}, {'total_pieces': '-1'}, {'tech_packs_available': 'bad'}, {'website': 'bot'}]:
            meta, body = self.request(dict(base, **changes))
            self.assertEqual(meta['status'], 422, changes)
            self.assertIsNone(meta['mail'])

    def test_mail_failure_is_not_success(self):
        meta, body = self.request(fail=True)
        self.assertEqual(meta['status'], 503)
        self.assertIn('could not be sent', body['message'])

    def test_parallel_limit_and_expiry(self):
        with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
            results = list(pool.map(lambda _: self.request(), range(8)))
        self.assertEqual(sorted(m['status'] for m, _ in results), [200] * 5 + [429] * 3)
        state_file = next(self.root.glob('nwm-contact-*.json'))
        raw = state_file.read_text()
        self.assertNotIn('192.0.2.1', raw)
        self.assertNotIn('test@example.com', raw)
        state = json.loads(raw)
        for entry in state['entries'].values():
            entry['expires'] = 1
        state_file.write_text(json.dumps(state))
        self.assertEqual(self.request()[0]['status'], 200)

    def test_broken_counter_storage_blocks_sending(self):
        self.request()
        next(self.root.glob('nwm-contact-*.json')).write_text('not JSON')
        meta, body = self.request()
        self.assertEqual(meta['status'], 503)
        self.assertIsNone(meta['mail'])
        self.assertIn('unavailable', body['message'])

    def test_different_address_has_its_own_limit(self):
        for _ in range(5):
            self.request()
        self.assertEqual(self.request()[0]['status'], 429)
        self.assertEqual(self.request(ip='192.0.2.2')[0]['status'], 200)


if __name__ == '__main__':
    unittest.main()
