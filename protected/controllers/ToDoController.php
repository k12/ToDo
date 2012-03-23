<?php

class ToDoController extends CController
{
    public function actionIndex()
    {
        $this->render('index');
    }

    public function actionRead($page, $start, $limit)
    {
        $todos = ToDos::model()->findAll(array(
            'select'=>'*',
            'offset'=>$start,
            'limit'=>$limit
        ));

        $respond['success'] = true;
        $respond['total'] = ToDos::model()->count();

        foreach($todos as $todo) {
            $respond['todos'][] = $todo->attributes;
        }

        echo json_encode($respond);
    }

    public function actionDelete()
    {
        $rawData = file_get_contents('php://input');
        $data = json_decode($rawData, true);

        $respond['success'] = (ToDos::model()->deleteByPk($data['id'])) ? true : false;

        echo json_encode($respond);
    }

    public function actionError()
    {
        if($error=Yii::app()->errorHandler->error)
        {
            if(Yii::app()->request->isAjaxRequest)
                echo $error['message'];
            else
                $this->render('error', $error);
        }
    }
}