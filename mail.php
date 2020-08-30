<?php

$to = "vas.box@mail.ru";

$subject = "Сообщение с сайта | Заявка";
$email = "redrenalobad@yandex.ru";

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
  if($_POST['product']) $product = trim(strip_tags($_POST['product']));

  if($_POST['test']) {
    header('HTTP/1.1 500' );
    exit;
  }
  
	if ($name) {
		$mess .= "Имя: " . $name . " ";
	}
	if ($phone) {
		$mess .= "Телефон: " . $phone . "\r\n";
	}
	if ($emailindicated) {
		$mess .= "Указанная почта: " . $emailindicated . "\r\n";
	}
	if ($product) {
		$mess .= "Выбранный продукт: " . $product . "\r\n";
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
