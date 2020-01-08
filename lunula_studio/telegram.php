<?php

if ($_POST) {

	$mess = '';

	if($_POST['name']) $name = trim(strip_tags($_POST['name']));
	if($_POST['phone']) {
		$phone = stripslashes($_POST['phone']);
		$phone = preg_replace('/\s|\+|-|\(|\)/','', $phone);
	}

	if ($name) {
		$mess .= "Имя: " . $name . "\r\n";
	}
	if ($phone) {
		$mess .= "Телефон: " . $phone . "\r\n";
	}

	//Осуществляется отправка данных в переменной $sendToTelegram
	$tokenTelegram = "951691103:AAHwF9zDdT4b11ohrKS3u-gscE4ZcnVQcHM";
	$chat_id = "-237796775";
	//$sendToTelegram = fopen("https://api.telegram.org/bot{$tokenTelegram}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$mess}","r");
	$sendToTelegram = fopen("https://api.telegram.org/bot".$tokenTelegram."/sendMessage?chat_id=".$chat_id."&parse_mode=html&text=".$mess."","r");

  	if ($sendToTelegram) {
  		echo "Ok";
  	}
  	else{
  		header('HTTP/1.1 500 ' . $error );
      	exit();
  	}
}

?>
