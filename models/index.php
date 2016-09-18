<?php
require_once 'vendor/autoload.php';
require_once 'auth/auth.php';
require_once 'db/queryDB.php';
$auth = new db;
if(!empty($_POST['tK']) and !empty($_POST['request'])){
	$token = $_POST['tK'];
	$result = Auth::Check($token);
	if ($result === 'expTk'){
		$result = $result;
	}elseif($result === null){
		$request = $_POST['request'];
		if ($request != 'acces'){
			$id = Auth::GetData($token);
			$condition = 'loopUser.fbId = "'.$id->id.'" and objetive.manager = loopUser.id';
			$result = $auth->serch('loopUser,'.$request,'loopUser.id,objetive.name,objetive.description',$condition,true);
		} else {
			$result = "access to web services";
		}	
	}else{
		$result = 'warning';
	}
}elseif (!empty($_POST['id'])){
	$id = $_POST['id'];
	$name = $_POST['name'];
	$email = $_POST['email'];
	$birthday = $_POST['birthday'];

	$condition = 'name = "'.$name.'" and email = "'.$email.'"';
	$result = $auth->serch('loopUser','name,email',$condition,false);

	if ($result == false){
		$options = $id.',"'.$name.'","'.$email.'","'.$birthday.'"';
		$result = $auth->insert('loopUser','fbId,name,email,birthday',$options);
	}

	$result = Auth::SignIn([
        'id' => $id,
        'name' => $name
    ]);
}else{
	$result = 'intento de acceso corrupto';
}
$rest = json_encode($result);
echo($_GET['callback'].'('.$rest.');');