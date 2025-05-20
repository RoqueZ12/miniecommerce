<?php
// Allowed origins
$allowed_origins = [
    "http://localhost:5173",
    "https://miniecommerce-dun.vercel.app"
];

// Check and set CORS headers if origin is allowed
if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Authorization, Content-Type, Accept");
    header("Content-Type: application/json");
} else {
    // You can choose to block or allow default behavior here
    // header("Access-Control-Allow-Origin: *"); // avoid if credentials:true
    header("Content-Type: application/json");
}

// Handle preflight OPTIONS request and exit early
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// --- Your actual backend code below ---
require_once '../database/db.php';
require_once '../config/firebase.php';
require_once '../controllers/AuthController.php';

$data = json_decode(file_get_contents("php://input"), true);
$idToken = $data['idToken'] ?? null;

$authController = new AuthController($pdo, $auth);
$result = $authController->loginWithGoogle($idToken);

if (isset($result['success']) && $result['success'] && isset($result['token'])) {
    session_start();
    $payload = json_decode(base64_decode(explode('.', $result['token'])[1]), true);
    $_SESSION['user_id'] = $payload['uid'];
}

echo json_encode($result);
