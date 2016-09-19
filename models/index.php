<?php
require_once 'vendor/autoload.php';
require_once 'auth/auth.php';
require_once 'db/queryDB.php';
$auth = new db;

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'GET':
        $arg = 'serch';
        break;
    case 'POST':
        $arg = 'insert';
        break;
    case 'PUT':
        $arg = 'update';
        break;
    case 'DELETE':
        $arg = 'delete';
        break;
}

if(!empty($_POST['tK']) and !empty($_POST['request']) and !empty($_POST['condition'])){
	$token = $_POST['tK'];
	$result = Auth::Check($token);
	if ($result === 'expTk'){
		$result = $result;
	}elseif($result === null){
		$request = $_POST['request'];
		if ($request != 'acces'){
			$id = Auth::GetData($token);
			$condition = 'loopUser.fbId = "'.$id->id.'" and '.$_POST['condition'];
			$result = $auth->serch('loopUser,'.$request,'loopUser.id,vision.id,vision.name,vision.description',$condition,true);
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
	$result = $auth->serch('loopuser','name,email',$condition,false);

	if ($result == false){
		$options = '"'.$id.'","'.$name.'","'.$email.'","'.$birthday.'"';
		$result = $auth->insert('loopuser','fbId,name,email,birthday',$options);
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