<?php
declare(strict_types=1);

// ALL-INKL executes this file; Vite copies it unchanged into dist/.
const CONTACT_RECIPIENT = 'samoon@northweavemills.com';
const CONTACT_SENDER = 'samoon@northweavemills.com';

header('Content-Type: text/html; charset=UTF-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('Referrer-Policy: same-origin');

$language = $_POST['language'] ?? $_GET['language'] ?? 'en';
if (!is_string($language) || !in_array($language, ['en', 'de', 'fr'], true)) {
    $language = 'en';
}
$messages = [
    'en' => [
        'success' => 'Thank you. Your message has been accepted for sending. We will be in touch shortly.',
        'invalid' => 'Please go back and check all required fields, including your email address.',
        'failed' => 'Your message could not be sent. Please try again or email us directly.',
        'method' => 'Please use the contact form to send a message.',
        'back' => 'Back to website',
        'title' => 'Contact North Weave Mills',
    ],
    'de' => [
        'success' => 'Vielen Dank. Ihre Nachricht wurde zum Versand angenommen. Wir melden uns in Kürze.',
        'invalid' => 'Bitte gehen Sie zurück und prüfen Sie alle Pflichtfelder sowie Ihre E-Mail-Adresse.',
        'failed' => 'Ihre Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt.',
        'method' => 'Bitte verwenden Sie das Kontaktformular, um eine Nachricht zu senden.',
        'back' => 'Zurück zur Website',
        'title' => 'Kontakt zu North Weave Mills',
    ],
    'fr' => [
        'success' => 'Merci. Votre message a été accepté pour envoi. Nous vous contacterons bientôt.',
        'invalid' => 'Veuillez revenir en arrière et vérifier tous les champs obligatoires et votre adresse e-mail.',
        'failed' => 'Votre message n’a pas pu être envoyé. Réessayez ou écrivez-nous directement.',
        'method' => 'Veuillez utiliser le formulaire de contact pour envoyer un message.',
        'back' => 'Retour au site',
        'title' => 'Contacter North Weave Mills',
    ],
];

function escape(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function respond(int $status, string $key): void
{
    global $language, $messages;
    http_response_code($status);
    $copy = $messages[$language];
    ?>
    <!doctype html>
    <html lang="<?= escape($language) ?>">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="robots" content="noindex">
        <title><?= escape($copy['title']) ?></title>
        <link rel="icon" type="image/png" href="/favicon.png">
        <style>
            body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #0e0e0d; color: #fafaf9; font: 17px/1.6 Arial, sans-serif; }
            main { max-width: 580px; padding: 40px 24px; }
            h1 { font-size: 28px; line-height: 1.2; }
            a { color: inherit; overflow-wrap: anywhere; }
            .back { display: inline-block; margin-top: 24px; padding: 12px 20px; background: #fafaf9; color: #20201e; text-decoration: none; }
        </style>
    </head>
    <body><main>
        <h1><?= escape($copy['title']) ?></h1>
        <p role="status"><?= escape($copy[$key]) ?></p>
        <p><a href="mailto:<?= escape(CONTACT_RECIPIENT) ?>"><?= escape(CONTACT_RECIPIENT) ?></a></p>
        <a class="back" href="/#book"><?= escape($copy['back']) ?></a>
    </main></body>
    </html>
    <?php
    exit;
}

function field(string $name, int $maxLength, bool $required = true): string
{
    $value = $_POST[$name] ?? '';
    if (!is_string($value) || strlen($value) > $maxLength || strpos($value, "\0") !== false) {
        respond(422, 'invalid');
    }
    $value = trim($value);
    if ($required && $value === '') {
        respond(422, 'invalid');
    }
    return $value;
}

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
if ($method === 'GET' && ($_GET['sent'] ?? '') === '1') {
    respond(200, 'success');
}
if ($method !== 'POST') {
    header('Allow: POST');
    respond(405, 'method');
}
if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > 32768) {
    respond(413, 'invalid');
}
// Honeypot: automated submissions that fill this invisible field are rejected.
if (field('website', 500, false) !== '') {
    respond(422, 'invalid');
}

$type = field('form_type', 20);
$email = field('email', 254);
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || preg_match('/[\r\n]/', $email)) {
    respond(422, 'invalid');
}

if ($type === 'inquiry') {
    $name = field('name', 200);
    $message = field('message', 10000);
    if (strlen($message) < 10) {
        respond(422, 'invalid');
    }
    $subject = 'New North Weave Mills inquiry';
    $body = "Name: {$name}\nEmail: {$email}\n\n{$message}";
} elseif ($type === 'brief') {
    $brand = field('brand_name', 200);
    $instagram = field('instagram', 200, false);
    $product = field('product_type', 1000);
    $total = field('total_pieces', 10);
    $techPacks = field('tech_packs_available', 3);
    $colours = field('colours', 1000);
    $pieces = field('pieces_per_style', 2000);
    if (!preg_match('/^[1-9][0-9]{0,8}$/', $total) || !in_array($techPacks, ['yes', 'no'], true)) {
        respond(422, 'invalid');
    }
    $subject = 'New North Weave Mills project brief';
    $body = implode("\n", [
        "Brand: {$brand}",
        'Instagram: ' . ($instagram !== '' ? $instagram : 'Not provided'),
        "Contact email: {$email}",
        "Product: {$product}",
        "Total pieces: {$total}",
        'Tech packs available: ' . ($techPacks === 'yes' ? 'Yes' : 'No'),
        "Colours: {$colours}",
        "Pieces per style: {$pieces}",
    ]);
} else {
    respond(422, 'invalid');
}

// Only the validated email enters a header. Recipient, sender and subjects
// are fixed here and cannot be overridden by submitted form fields.
$headers = [
    'From' => 'North Weave Mills <' . CONTACT_SENDER . '>',
    'Reply-To' => $email,
    'MIME-Version' => '1.0',
    'Content-Type' => 'text/plain; charset=UTF-8',
    'Content-Transfer-Encoding' => 'base64',
];
$body = str_replace(["\r\n", "\r"], "\n", $body);
$encodedBody = chunk_split(base64_encode(str_replace("\n", "\r\n", $body)));
$sent = function_exists('mail') && @mail(CONTACT_RECIPIENT, $subject, $encodedBody, $headers);
if (!$sent) {
    error_log('North Weave Mills contact form: mail transport did not accept the message.');
    respond(503, 'failed');
}
// Redirect after POST so refreshing the confirmation does not resend mail.
header('Location: /contact.php?sent=1&language=' . rawurlencode($language), true, 303);
exit;
