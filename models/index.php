<?php
require_once 'vendor/autoload.php';
require_once 'auth/auth.php';
require_once 'db/queryDB.php';

$auth = new db;

switch ($_SERVER['REQUEST_METHOD']) {

    case 'GET':

        $contReq = count($_GET);
		$method = array_keys($_GET);// obtiene los nombres de las varibles
		$parameter = array_values($_GET);// obtiene los parameter de las varibles

		// crea las variables y les asigna el valor
		for($i=0;$i<$contReq;$i++){
			$$method[$i]=$parameter[$i];
		}
        break;
    case 'POST':

        $contReq = count($_POST);
		$method = array_keys($_POST);
		$parameter = array_values($_POST);

		for($i=0;$i<$contReq;$i++){ 
			$$method[$i]=$parameter[$i]; 
		}
		unset($_POST);
        break;
    case 'PUT':
        $contReq = count($_PUT);
		$method = array_keys($_PUT);
		$parameter = array_values($_PUT);

		for($i=0;$i<$contReq;$i++){ 
			$$method[$i]=$parameter[$i]; 
		}
		unset($_PUT);
        break;
    case 'DELETE':
        $contReq = count($_DELETE);
		$method = array_keys($_DELETE);
		$parameter = array_values($_DELETE);

		for($i=0;$i<$contReq;$i++){ 
			$$method[$i]=$parameter[$i]; 
		}
		unset($_DELETE);
        break;
}

if(!empty($tK) and !empty($request) and !empty($condition)){

	$result = Auth::Check($tK);

	if ($result === 'expTk'){
		$result = $result;
	}elseif($result === null){

		if ($request != 'acces'){

			switch ($_SERVER['REQUEST_METHOD']) {

			    case 'GET':

			        $id = Auth::GetData($tK);
					$condition = 'loopUser.fbId = "'.$id->id.'" and '.$condition;
					$result = $auth->serch('loopUser,'.$request,'loopUser.id,vision.id,vision.name,vision.description',$condition,true);
			        break;
			    case 'POST':

			        $condition = explode($condition);
			        $condition = $condition[0];
			        $options = $condition[1];
			        $result = $auth->insert($req,$condition,$options);
			        break;
			    case 'PUT':
			        //UPDATE
			        break;
			    case 'DELETE':
			        //DELETE
			        break;
			}
		}else{
			$result = "access to web services";
		}	
	}else{
		$result = 'warning';
	}
}elseif (!empty($id)){

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
	$result = 'Intento de acceso invalido';
}
$rest = json_encode($result);
echo($_GET['callback'].'('.$rest.');');
unset($_GET);