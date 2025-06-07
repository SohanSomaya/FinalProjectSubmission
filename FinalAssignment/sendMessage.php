<?php
header('Content-Type: application/json');

$sender = $_POST['sender'] ?? $_GET['sender'] ?? '';
$recipient = $_POST['recipient'] ?? $_GET['recipient'] ?? '';
$message = $_POST['message'] ?? $_GET['message'] ?? '';

if ($sender && $recipient && $message) {
    $dir = './messages/';
    if (!file_exists($dir)) {
        mkdir($dir, 0777, true);
    }

    $filename = $dir . $recipient . '.txt';
    $entry = $sender . '|' . time() . '|' . $message . PHP_EOL;
    file_put_contents($filename, $entry, FILE_APPEND);

    echo json_encode(['status' => 'Message sent successfully']);
} else {
    echo json_encode(['status' => 'Missing parameters']);
}
?>
