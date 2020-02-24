<?php

$to = "era-profi@yandex.ru";

$subject = "Сообщение с сайта";
$email = "info@tirax.pro";

if ($_POST['email_to']) {
	$to = trim(strip_tags($_POST['email_to']));
}

if ($_POST) {

	$mess = '';
	$emailindicated = false;

	if($_POST['name']) $name = trim(strip_tags($_POST['name']));
	if($_POST['phone']) {
		$phone = stripslashes($_POST['phone']);
		$phone = preg_replace('/\s|\+|-|\(|\)/','', $phone);
	}
	if($_POST['email']) {
		$email = trim(strip_tags($_POST['email']));
		$emailindicated = $email;
	}
	if($_POST['message']) $message = trim(strip_tags($_POST['message']));
	if($_POST['select']) $select = trim(strip_tags($_POST['select']));

	if ($name) {
		$mess .= "Имя: " . $name . " ";
	}
	if ($phone) {
		$mess .= "Телефон: " . $phone . "\r\n";
	}
	if ($emailindicated) {
		$mess .= "Указанная почта: " . $emailindicated . "\r\n";
	}
	if ($select) {
		$mess .= "Выбрано в списке: " . $select . "\r\n";
	}
	if ($message) {
		$mess .= "Сообщение: " . $message . "\r\n";
	}

	$mail = mail($to, $subject, $mess,
  	"From: ".$name." <".$email.">\r\n"
  	."Reply-To: ".$name."<".$email.">\r\n"
  	);

  	if ($mail) {
  		echo "Ok";
  	}
  	else{
  		header('HTTP/1.1 500 ' . $error );
      	exit();
  	}
}

?>
