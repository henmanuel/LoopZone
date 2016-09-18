<?php
class db
{
	//constructor de la clase$server,$userDB,$passUdb,$DB
	public function dbConnect(){
		require('accesDB.php');
		$this->dbConnect = new mysqli($server, $userDB, $passUdb,$DB); 
	}
	//crear tablas
	public function newTable( $table){
		//generar Sql
		$sql = "CREATE TABLE IF NOT EXISTS `".$table."` 
		(`ID` int(11) NOT NULL,PRIMARY KEY (`ID`)) 
		ENGINE=InnoDB DEFAULT CHARSET=latin1;";
		//fin Sql
 		if ($this->dbConnect->query($sql) === TRUE){
			echo "New table successful";
  		}else{
 		echo "New table error ".$this->conexion->error;
  		}
	}
	//Guardar nuevos datos en la base de datos
	public function insert($table,$columns, $options){
		$this->dbConnect();
		$sql = "INSERT INTO ".$table." (".$columns.") 
		VALUES (".$options.")";
		//var_dump($sql);
		 if($this->dbConnect->query($sql) === False){
			return false;
		}else{
			return true;
		} 
		$result->close();
	} 
	//Borrar datos  de la base de datos
	public function deleted($table,$columns,$options){
	  	for ($i=0; $i<count($options); $i++){ 
			$sql = "DELETE FROM ".$table." WHERE ".$columns." = '".$options."'";
			if($this->dbConnect->query($sql) === TRUE){
				if(mysqli_affected_rows($this->conexion)){
	    			echo $options[$i]."deleted"."</br>";
	    		}else{
	   				echo $options[$i]."don´t deleted".$this->conexion->error."</br>";
				}
			}
		}
	}
	//add campos a una tabla
	public function addColumns($table,$column){
		$sql = "ALTER TABLE ".$table." ADD ".$column." CHAR(30)";
		if($this->dbConnect->query($sql) === TRUE){
			if($this->dbConnect->query($sql) === TRUE){
				echo 'Add columns'.$table;
			}else{
				echo 'error Add columns'.$table;
			}
		}
	}
	//Delete campos a una tabla
	public function deleteColumns($table,$column){
		$sql = "ALTER TABLE ".$table." DROP ".$column;
		if($this->dbConnect->query($sql) === TRUE){
			echo 'delete columns '.$table;
		}else{
			echo 'error delete columns '.$table;
		}
	}
	//Serch en una tabla
	public function serch($table, $columns,$condition,$print){
		$this->dbConnect();
		$sql = "SELECT ".$columns." FROM ".$table." WHERE ".$condition." ORDER BY 1 DESC";
		//var_dump($sql);
		$result = $this->dbConnect->query($sql);
		$count = $result->num_rows;
		if ($count > 0) {
			if ($print == True){
				$column = explode(',', $columns);
				$rows = array();
				global $rows;
				for ($i=1; $i <= $count ; $i++){	
					$row = mysqli_fetch_row($result);
					$result->data_seek($i); 
					$con = 0;
					while ($con < count($column)){
						$columna = $column[$con];
						$rows[$i][$columna] = $row[$con];
						$con++;
					} 
				}
				return $rows;
			}else{
				return true;
			}
		}else{
    		return false;
		}
		$result->close();
	}
	public function update($table, $campos,$options){   
		$sql = "UPDATE ".$table." SET ".$campos." WHERE ".$options;
		if($this->dbConnect->query($sql) === False){
			echo 'Update '.$options.' in '.$columns.' in '.$table.'</br>';
		}else{
			return  $result = 1;
		}
	} 
}
?>
