<?php

require_once('db.php');

function countRows($tableName)
{
    $r = mysql_query('SELECT COUNT(*) FROM '.$tableName);
    return mysql_fetch_row($r);
}

function getToDos()
{
    $sql = 'SELECT *
            FROM  todos
            ORDER BY createdAt DESC
            LIMIT '.$_GET['start'].', '.$_GET['limit'];

    $r = mysql_query($sql);

    $rows['success'] = true;
    $rows['total'] = countRows('todos');

    while($row = mysql_fetch_assoc($r)) {
        $rows['todos'][] = $row;
    }

    echo (json_encode($rows));
}

getToDos();
