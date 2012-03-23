<?php
    $this->pageTitle=Yii::app()->name . ' - Error';
?>

<div class="error">
    <h2>Error <?php echo $code; ?></h2>
    <p></p><?php echo CHtml::encode($message); ?></p>
</div>