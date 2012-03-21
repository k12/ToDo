<?php
require_once('db.php');

function updateToDo($id, $toDo)
{
    mysql_query('UPDATE todos SET toDo="'.$toDo.'" WHERE id='.$id);
}

$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

updateToDo($data['id'], $data['toDo']);

echo '{"success":true,"todos":[{"id":"'.$data['id'].'","toDo":"'.$data['toDo'].'","createdAt":"'.$data['createdAt'].'"}]}';