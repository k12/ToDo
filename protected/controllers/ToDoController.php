<?php

class ToDoController extends CController
{
    public function actionIndex()
    {
        $this->render('index');
    }

    public function actionRead($page, $start, $limit)
    {
        if(Yii::app()->request->isAjaxRequest) {
            $todos = ToDo::model()->findAll(array(
                'select'=>'*',
                'offset'=>$start,
                'limit'=>$limit,
                'order'=>'id DESC'
            ));

            $respond['success'] = true;
            $respond['total'] = ToDo::model()->count();

            foreach($todos as $todo) {
                $respond['todos'][] = $todo->attributes;
            }

            echo json_encode($respond);
        }
    }

    public function actionDelete()
    {
        if(Yii::app()->request->isAjaxRequest) {
            $rawData = file_get_contents('php://input');
            $data = json_decode($rawData, true);

            $respond['success'] = (ToDo::model()->deleteByPk($data['id'])) ? true : false;

            echo json_encode($respond);
        }
    }

    public function actionCreate()
    {
        if(Yii::app()->request->isAjaxRequest) {
            $rawData = file_get_contents('php://input');
            $data = json_decode($rawData, true);

            $toDo = new ToDo;
            $toDo->toDo = $data['toDo'];
            $toDo->createdAt = date('Y-m-d');

            if($toDo->save()) {
                $respond['success'] = true;
                $respond['todos'][] = $toDo->attributes;
            }
            else {
                $respond['success'] = false;
            }

            echo json_encode($respond);
        }
    }

    public function actionUpdate()
    {
        if(Yii::app()->request->isAjaxRequest) {
            $rawData = file_get_contents('php://input');
            $data = json_decode($rawData, true);

            $toDo = ToDo::model()->findByPk($data['id']);
            $toDo->toDo = $data['toDo'];

            if($toDo->save()) {
                $respond['success'] = true;
                $respond['todos'][] = $toDo->attributes;
            }
            else {
                $respond['success'] = false;
            }

            echo json_encode($respond);
        }
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