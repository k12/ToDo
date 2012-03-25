<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<title><?php echo CHtml::encode($this->pageTitle); ?></title>
    <link rel="stylesheet" type="text/css" href="http://extjs.cachefly.net/ext-4.0.2a/resources/css/ext-all.css"/>
    <link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->baseUrl; ?>/css/style.css">

    <script type="text/javascript" src="http://extjs.cachefly.net/ext-4.0.2a/ext-all-debug.js"></script>
</head>

<body>
    <?php echo $content; ?>
</body>

</html>