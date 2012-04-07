<?php

class TodoController extends CController
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
            $data = $this->getRequestPayloadData();

            $respond['success'] = (ToDo::model()->deleteByPk($data['id'])) ? true : false;

            echo json_encode($respond);
        }
    }

    public function actionCreate()
    {
        if(Yii::app()->request->isAjaxRequest) {
            $data = $this->getRequestPayloadData();

            $toDo = new ToDo;
            $toDo->toDo = $data['toDo'];
            $toDo->dueDate = $data['dueDate'];
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
            $data = $this->getRequestPayloadData();

            $toDo = ToDo::model()->findByPk($data['id']);
            $toDo->toDo = $data['toDo'];
            $toDo->dueDate = date('Y-m-d', strtotime($data['dueDate'])); //FIXIT: it should be done by client side not server

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

    private function getRequestPayloadData()
    {
        $data = file_get_contents('php://input');
        return json_decode($data, true);
    }
}