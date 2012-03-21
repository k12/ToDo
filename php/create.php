<?php
require_once('db.php');

function createToDo($toDo)
{
    mysql_query('INSERT INTO todos SET toDo="'.$toDo.'", createdAt=NOW()');
    echo '{"success":true,"todos":[{"id":"'.mysql_insert_id().'","toDo":"'.$toDo.'","createdAt":"'.date('Y-m-d').'"}]}';
}

$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

createToDo($data['toDo']);


