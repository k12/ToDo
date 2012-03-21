<?php

require_once('db.php');

function deleteToDo($id)
{
    mysql_query('DELETE FROM todos WHERE id='.$id);
}

$rawData = file_get_contents('php://input');
$data = json_decode($rawData, true);

deleteToDo($data['id']);

echo '{"success": true}';
