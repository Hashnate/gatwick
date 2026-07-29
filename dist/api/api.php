<?php
// ============================================================
// GCBT Website - MySQL REST API Backend
// File: /var/www/gatwick/api/api.php
//
// IMPORTANT: Update the DB credentials below before deploying.
// ============================================================

// ---- Database Configuration ----
define('DB_HOST', 'localhost');
define('DB_NAME', 'gcbt_db');
define('DB_USER', 'gcbt_user');
define('DB_PASS', 'gcbt_secure_2026!');
define('DB_CHARSET', 'utf8mb4');

// ---- CORS & Response Headers ----
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// ---- Database Connection ----
function getDB() {
    static $pdo = null;
    if ($pdo === null) {
        $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=' . DB_CHARSET;
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
    }
    return $pdo;
}

// ---- Helpers ----
function jsonResponse($data, $code = 200) {
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function getBody() {
    $raw = file_get_contents('php://input');
    return json_decode($raw, true) ?? [];
}

function decodeModules($row) {
    if (isset($row['modules']) && is_string($row['modules'])) {
        $row['modules'] = json_decode($row['modules'], true) ?? [];
    }
    if (isset($row['mode']) && is_string($row['mode'])) {
        $decoded = json_decode($row['mode'], true);
        $row['mode'] = is_array($decoded) ? $decoded : [$row['mode']];
    }
    if (isset($row['campus']) && is_string($row['campus'])) {
        $decoded = json_decode($row['campus'], true);
        $row['campus'] = is_array($decoded) ? $decoded : [$row['campus']];
    }
    if (isset($row['credits'])) {
        $row['credits'] = (int)$row['credits'];
    }
    return $row;
}

// ---- Route Dispatcher ----
$action = $_GET['action'] ?? '';
$method = $_SERVER['REQUEST_METHOD'];

try {
    $db = getDB();

    switch ($action) {

        // ======================================
        // COURSES
        // ======================================
        case 'get_courses':
            $rows = $db->query("SELECT * FROM courses ORDER BY level, title")->fetchAll();
            jsonResponse(array_map('decodeModules', $rows));

        case 'save_courses':
            // Replaces the entire courses table with the provided array
            $courses = getBody();
            if (!is_array($courses)) jsonResponse(['error' => 'Invalid data'], 400);

            $db->beginTransaction();
            $db->exec("DELETE FROM courses");
            $stmt = $db->prepare("
                INSERT INTO courses (id, title, school, level, mode, campus, duration, credits, description, modules, image, ofqual, fee_local, fee_international)
                VALUES (:id, :title, :school, :level, :mode, :campus, :duration, :credits, :desc, :modules, :image, :ofqual, :fee_local, :fee_international)
                ON DUPLICATE KEY UPDATE
                  title=VALUES(title), school=VALUES(school), level=VALUES(level),
                  mode=VALUES(mode), campus=VALUES(campus), duration=VALUES(duration),
                  credits=VALUES(credits), description=VALUES(description),
                  modules=VALUES(modules), image=VALUES(image), ofqual=VALUES(ofqual),
                  fee_local=VALUES(fee_local), fee_international=VALUES(fee_international)
            ");
            foreach ($courses as $c) {
                $stmt->execute([
                    ':id'     => $c['id'] ?? uniqid('c_'),
                    ':title'  => $c['title'] ?? '',
                    ':school' => $c['school'] ?? '',
                    ':level'  => $c['level'] ?? '',
                    ':mode'   => is_array($c['mode']) ? json_encode($c['mode']) : json_encode([$c['mode'] ?? 'Full-Time']),
                    ':campus' => is_array($c['campus']) ? json_encode($c['campus']) : json_encode([$c['campus'] ?? 'Both Campuses']),
                    ':duration' => $c['duration'] ?? '12 Months',
                    ':credits'  => (int)($c['credits'] ?? 120),
                    ':desc'   => $c['description'] ?? $c['desc'] ?? '',
                    ':modules' => json_encode($c['modules'] ?? []),
                    ':image'  => $c['image'] ?? '',
                    ':ofqual' => $c['ofqual'] ?? $c['ofqualNum'] ?? '',
                    ':fee_local' => $c['feeLocal'] ?? $c['fee_local'] ?? null,
                    ':fee_international' => $c['feeInternational'] ?? $c['fee_international'] ?? null
                ]);
            }
            $db->commit();
            jsonResponse(['success' => true, 'count' => count($courses)]);

        // ======================================
        // EVENTS
        // ======================================
        case 'get_events':
            $rows = $db->query("SELECT * FROM events ORDER BY date")->fetchAll();
            jsonResponse($rows);

        case 'save_events':
            $events = getBody();
            if (!is_array($events)) jsonResponse(['error' => 'Invalid data'], 400);

            $db->beginTransaction();
            $db->exec("DELETE FROM events");
            $stmt = $db->prepare("
                INSERT INTO events (id, title, date, time, location, category, description, map_url, map_embed)
                VALUES (:id, :title, :date, :time, :location, :category, :desc, :mapUrl, :mapEmbed)
            ");
            foreach ($events as $e) {
                $stmt->execute([
                    ':id'       => $e['id'] ?? uniqid('e_'),
                    ':title'    => $e['title'] ?? '',
                    ':date'     => $e['date'] ?? '',
                    ':time'     => $e['time'] ?? '',
                    ':location' => $e['location'] ?? '',
                    ':category' => $e['category'] ?? 'academic',
                    ':desc'     => $e['description'] ?? '',
                    ':mapUrl'   => $e['mapUrl'] ?? '',
                    ':mapEmbed' => $e['mapEmbed'] ?? ''
                ]);
            }
            $db->commit();
            jsonResponse(['success' => true, 'count' => count($events)]);

        // ======================================
        // FACULTY
        // ======================================
        case 'get_faculty':
            $rows = $db->query("SELECT * FROM faculty ORDER BY name")->fetchAll();
            jsonResponse($rows);

        case 'save_faculty':
            $faculty = getBody();
            if (!is_array($faculty)) jsonResponse(['error' => 'Invalid data'], 400);

            $db->beginTransaction();
            $db->exec("DELETE FROM faculty");
            $stmt = $db->prepare("
                INSERT INTO faculty (id, name, title, department, campus, bio, image, email, phone)
                VALUES (:id, :name, :title, :dept, :campus, :bio, :image, :email, :phone)
            ");
            foreach ($faculty as $f) {
                $stmt->execute([
                    ':id'     => $f['id'] ?? uniqid('f_'),
                    ':name'   => $f['name'] ?? '',
                    ':title'  => $f['title'] ?? '',
                    ':dept'   => $f['department'] ?? '',
                    ':campus' => $f['campus'] ?? '',
                    ':bio'    => $f['bio'] ?? '',
                    ':image'  => $f['image'] ?? '',
                    ':email'  => $f['email'] ?? '',
                    ':phone'  => $f['phone'] ?? ''
                ]);
            }
            $db->commit();
            jsonResponse(['success' => true, 'count' => count($faculty)]);

        // ======================================
        // INQUIRIES
        // ======================================
        case 'get_inquiries':
            $rows = $db->query("SELECT * FROM inquiries ORDER BY created_at DESC")->fetchAll();
            jsonResponse($rows);

        case 'add_inquiry':
            $data = getBody();
            if (empty($data['name']) || empty($data['email'])) {
                jsonResponse(['error' => 'Name and email are required'], 400);
            }
            $id = 'inq-' . time() . '-' . rand(1000, 9999);
            $stmt = $db->prepare("
                INSERT INTO inquiries (id, name, email, phone, campus, course, message, status, notes)
                VALUES (:id, :name, :email, :phone, :campus, :course, :msg, 'New', '')
            ");
            $stmt->execute([
                ':id'     => $data['id'] ?? $id,
                ':name'   => $data['name'],
                ':email'  => $data['email'],
                ':phone'  => $data['phone'] ?? '',
                ':campus' => $data['campus'] ?? '',
                ':course' => $data['course'] ?? '',
                ':msg'    => $data['message'] ?? ''
            ]);
            jsonResponse(['success' => true, 'id' => $data['id'] ?? $id]);

        case 'save_inquiries':
            $inquiries = getBody();
            if (!is_array($inquiries)) jsonResponse(['error' => 'Invalid data'], 400);

            $db->beginTransaction();
            $db->exec("DELETE FROM inquiries");
            $stmt = $db->prepare("
                INSERT INTO inquiries (id, name, email, phone, campus, course, message, status, notes, created_at)
                VALUES (:id, :name, :email, :phone, :campus, :course, :msg, :status, :notes, :created)
            ");
            foreach ($inquiries as $i) {
                $stmt->execute([
                    ':id'      => $i['id'] ?? uniqid('inq_'),
                    ':name'    => $i['name'] ?? '',
                    ':email'   => $i['email'] ?? '',
                    ':phone'   => $i['phone'] ?? '',
                    ':campus'  => $i['campus'] ?? '',
                    ':course'  => $i['course'] ?? '',
                    ':msg'     => $i['message'] ?? '',
                    ':status'  => $i['status'] ?? 'New',
                    ':notes'   => $i['notes'] ?? '',
                    ':created' => $i['createdAt'] ?? date('Y-m-d H:i:s')
                ]);
            }
            $db->commit();
            jsonResponse(['success' => true]);

        // ======================================
        // AUTH
        // ======================================
        case 'check_auth':
            // Auth is stateless — handled on the frontend with localStorage
            // Return false so frontend always uses localStorage for auth session
            jsonResponse(false);

        case 'set_auth':
            // No server-side session tracking in this version
            jsonResponse(['success' => true]);

        // ======================================
        // DEFAULT
        // ======================================
        default:
            jsonResponse(['error' => 'Unknown action: ' . htmlspecialchars($action)], 404);
    }

} catch (PDOException $e) {
    // Log error server-side, never expose DB details to client
    error_log('[GCBT API] DB Error: ' . $e->getMessage());
    jsonResponse(['error' => 'Database error. Please try again later.'], 500);
} catch (Exception $e) {
    error_log('[GCBT API] Error: ' . $e->getMessage());
    jsonResponse(['error' => 'Server error. Please try again later.'], 500);
}
