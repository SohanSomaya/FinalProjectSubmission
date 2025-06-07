<?php
header('Content-Type: application/json');

$recipient = $_GET['recipient'] ?? '';

if ($recipient) {
    $filename = './messages/' . $recipient . '.txt';
    $messages = [];

    if (file_exists($filename)) {
        $lines = file($filename, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            list($sender, $timestamp, $message) = explode('|', $line);
            $messages[] = "$sender [" . date('Y-m-d H:i:s', $timestamp) . "]: $message";
        }
    }

    echo json_encode(['messages' => $messages]);
} else {
    echo json_encode(['messages' => [], 'status' => 'Missing recipient parameter']);
}
?>
