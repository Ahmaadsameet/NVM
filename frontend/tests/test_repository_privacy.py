"""Check Git exclusions and scan publishable text/history without printing secrets."""
import re
import subprocess
from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[2]
PATTERNS = {
    'private key': re.compile(rb'-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----'),
    'provider token': re.compile(rb'(?:AKIA[0-9A-Z]{16}|gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,}|sk-(?:proj-)?[A-Za-z0-9_-]{32,}|xox[baprs]-[A-Za-z0-9-]{20,})'),
    'credential assignment': re.compile(rb'''(?im)(?:password|passwd|smtp_password|secret_key|api_key|access_token)\s*[=:]\s*["']([^"'\r\n]{8,})["']'''),
    'credential URL': re.compile(rb'[a-z]+://[^\s/:]+:[^\s/@]+@'),
}

def git(*args):
    return subprocess.check_output(['git', *args], cwd=ROOT)

def findings(data):
    found = []
    for name, pattern in PATTERNS.items():
        for match in pattern.finditer(data):
            value = match.group(1) if name == 'credential assignment' else match.group()
            if name == 'credential assignment' and (b'example' in value.lower() or b'getenv' in value.lower() or b'change' in value.lower()):
                continue
            found.append(name)
    return sorted(set(found))

class RepositoryPrivacy(unittest.TestCase):
    def test_private_paths_ignored(self):
        paths = ['.env', 'frontend/.env.production', 'credentials.json', 'private.key', 'frontend/dist.zip', 'documents/client.md', 'content/photo.jpg', 'pdf/report.pdf', 'tmp/test.txt', 'output/report.json', '.vscode/settings.json', 'frontend/dist/index.html', 'frontend/node_modules/a.js', 'capture.har']
        for path in paths:
            result = subprocess.run(['git', 'check-ignore', '--no-index', '-q', path], cwd=ROOT)
            self.assertEqual(result.returncode, 0, path)

    def test_source_files_not_ignored(self):
        for path in ['frontend/public/.htaccess', 'frontend/public/contact.php', 'frontend/src/main.jsx', 'frontend/tests/test_repository_privacy.py']:
            result = subprocess.run(['git', 'check-ignore', '--no-index', '-q', path], cwd=ROOT)
            self.assertEqual(result.returncode, 1, path)

    def test_current_publishable_files(self):
        paths = git('ls-files', '--cached', '--others', '--exclude-standard', '-z').decode().split('\0')
        problems = []
        for name in filter(None, paths):
            path = ROOT / name
            if not path.is_file() or path.resolve() == Path(__file__).resolve():
                continue
            if path.suffix.lower() in {'.zip', '.pdf', '.key', '.pem', '.pfx', '.sqlite3', '.db'} or path.name == '.env':
                problems.append(f'{name}: private/generated file tracked')
            data = path.read_bytes()
            if b'\0' not in data[:8192]:
                problems.extend(f'{name}: {kind}' for kind in findings(data))
        self.assertEqual(problems, [], '\n'.join(problems))

    def test_git_history(self):
        problems = []
        for row in git('rev-list', '--objects', '--all').decode().splitlines():
            oid, _, name = row.partition(' ')
            if not name or name == 'frontend/tests/test_repository_privacy.py':
                continue
            if git('cat-file', '-t', oid).strip() != b'blob':
                continue
            data = git('cat-file', 'blob', oid)
            if b'\0' not in data[:8192]:
                problems.extend(f'{name} ({oid[:8]}): {kind}' for kind in findings(data))
        self.assertEqual(problems, [], '\n'.join(problems))

if __name__ == '__main__':
    unittest.main()
