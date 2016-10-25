function in_array_rec($needle, $haystack){//existe valor = $
    if(in_array($needle, $haystack)){
    	return true; 
    } 
        
    foreach($haystack as $elem){
    	if(is_array($elem) && in_array_rec($needle, $elem)) {
            return true; 
        }
    } 
    return false; 
}

function array_search_rec($search, $array, $keys = array()){//Devuelve indice que contenga valor = $search
    foreach($array as $key => $value) {
        if (is_array($value)) {
            $sub = array_find_deep($value, $search, array_merge($keys, array($key)));
            if (count($sub)) {
                return $sub;
            }
        } elseif ($value === $search) {
            return array_merge($keys, array($key));
        }
    }
    return array();
}

$tableST = array_replace_recursive($tableST, $tableR);

if (in_array('fk',$tableST)) {
	
	$table = array_search('fk', $tableST);
}else if($tableR[$table] != false and in_array_rec('fk',$tableR[$table])){
	
	$table = array_search_rec('fk',$tableST[$table]);
	$table = $table[0];
}else{
	
	$go = false;
}
$tableR = array();



			function map($matriz){

	 	        foreach($matriz as $key=>$value){

	 		        if (is_array($value)){

	            		map($value);
	            	}else{

	            		if ($value == 'fk'){

	            			$table = $key;
	            			break;
	            		}else{
	            			$table = false;
	            		}
	            	}	
	        	}
	        	return $table;
			}

			function grafo($matriz, $combined){// combinacion de la linea de grafo 

	 	        foreach($matriz as $key=>$value){

	 		        if (is_array($value)){

	            		grafo($value);
	            	}else{

	            		if ($key == $value == 'fk'){

	            			$combined[$key] = array($table => $key);
	            			break;
	            		}
	            	}	
	        	}
	        	return $table;
			}