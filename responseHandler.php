#!/usr/bin/php
<?php

require_once __DIR__ . '/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


define('LOGGING', true);
l("[ " . date('Y-m-d H:i:s') . " ]\n");

# Get sms data
$sender = getenv('SMS_1_NUMBER');
$numParts = getenv('DECODED_PARTS');
if ($numParts) {
    $message = '';
    for ($i = 1; $i <= $numParts; $i++) {
        $message .= getenv("DECODED_{$i}_TEXT");
    }
} else {
    $message = getenv('SMS_1_TEXT');
}
l(json_encode(['sender' => $sender, 'message' => $message]) . "\n");

# Connect to DB
$db = new PDO('sqlite:' . __DIR__ . '/db.sqlite', null, null, [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
]);

# Find sent message
$stmt = $db->prepare('
SELECT 
    um.user_id,
    um.message_id,
    group_concat(s.TextDecoded, "") message
FROM users_messages um
JOIN sentitems s ON um.message_id = s.ID
WHERE um.message_id IN (
    SELECT MAX(ID) FROM sentitems
    WHERE DestinationNumber LIKE :sender
)
');
$stmt->execute(['sender' => "%$sender"]);
$outbox = $stmt->fetch();
if ($outbox) {
    l(json_encode($outbox) . "\n");
} else {
    l(" - Sender not found\n");
    die;
}

# Get procedures
$stmt = $db->prepare('
SELECT type, recipient
FROM procedures
WHERE user_id = :user_id
');
$stmt->execute(['user_id' => $outbox['user_id']]);
$procedures = $stmt->fetchAll();
if (!$procedures) {
    l(" - Procedures for user_id {$outbox['user_id']} not found\n");
}

# Execute procedures
foreach ($procedures as $procedure) {
    $text = "Sender: {$sender}\nMessage: {$message}\nResponse to: {$outbox['message']}";
    switch ($procedure['type']) {
        case 'sms':
            sms($procedure['recipient'], $text);
            break;
        case 'email':
            email($procedure['recipient'], $text);
            break;
    }
}

function l($text)
{
    if (!LOGGING) return;
    file_put_contents(__DIR__ . '/response_handler.log', $text, FILE_APPEND | LOCK_EX);
}

function sms($recipient, $message)
{
    exec("gammu-smsd-inject TEXT $recipient -text \"$message\" -len 400", $output);
    l(" - Send sms: " . join(" | ", $output) . "\n");
}

function email($recipient, $message)
{
    l(" - Send email: ");
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = '';
        $mail->Password = '';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;
        $mail->setFrom($mail->Username);
        $mail->addAddress($recipient);
        $mail->Subject = 'SMS Response';
        $mail->Body = $message;
        $mail->send();
        l("OK\n");
    } catch (Exception $e) {
        l("{$mail->ErrorInfo}\n");
    }
}
