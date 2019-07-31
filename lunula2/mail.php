<?php

$to = "shpot84@mail.ru";

$subject = "Сообщение с сайта";
$email = "shpot84@mail.ru";

if ($_POST) {

	$mess = '';

	if($_POST['name']) $name = trim(strip_tags($_POST['name']));
	if($_POST['phone']) {
		$phone = stripslashes($_POST['phone']);
		$phone = preg_replace('/\s|\+|-|\(|\)/','', $phone);
	}

	if ($name) {
		$mess .= "Имя: " . $name . " ";
	}
	if ($phone) {
		$mess .= "Телефон: " . $phone . "\r\n";
	}
	/* if ($_POST['typeCourse']) {
		$mess .= "Курс: " . $_POST['typeCourse'] . "\r\n";
	} */

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
