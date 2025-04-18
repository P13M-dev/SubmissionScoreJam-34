<?php


$dbFile = '../scores.db';

if (!file_exists($dbFile)) {
    
    try {

        $db = new SQLite3($dbFile);
        
        $db->exec("CREATE TABLE scores(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nickname TEXT NOT NULL UNIQUE,
            score INTEGER NOT NULL,
            lost_score INTEGER NOT NULL,
            kills INTEGER NOT NULL,
            layer INTEGER NOT NULL,
            time_alive INTEGER NOT NULL,
            secHash TEXT NOT NULL
        )");
        
        
    } catch (Exception $e) {
        if (file_exists($dbFile)) {
            unlink($dbFile);
        }
        exit(-1);
    }
} else {
    $dbOperationType = $_POST['db'];
    try {
        
        $db = new SQLite3($dbFile);
        switch ($dbOperationType) {
            case 'new Score':
                break;
            case 'retrive scores':
                break;
        }
    } catch (Exception $e) {
        exit(-1);
    }
}

$result = $db->query("SELECT sqlite_version()");
$version = $result->fetchArray()[0];

$db->close();
?>