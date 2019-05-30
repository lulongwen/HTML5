<?php
	function random($length, $numeric = 0)
	{
		$seed = base_convert(md5(microtime().$_SERVER['DOCUMENT_ROOT']), 16, $numeric ? 10 : 35);
		$seed = $numeric ? (str_replace('0', '', $seed).'012340567890') : ($seed.'zZ'.strtoupper($seed));
		if($numeric)
		{
			$hash = '';
		}
		else
		{
			$hash = chr(rand(1, 26) + rand(0, 1) * 32 + 64);
			$length--;
		}
		$max = strlen($seed) - 1;
		for($i = 0; $i < $length; $i++)
		{
			$hash .= $seed{mt_rand(0, $max)};
		}
		return $hash;
	}
	
	function fileext($filename)
	{
		return addslashes(strtolower(substr(strrchr($filename, '.'), 1, 10)));
	}

	$files = $_FILES["files"];
	for($i = 0, $j = count($files["name"]); $i < $j; $i++)
	{
		$filename = date('His').strtolower(random(16)).'.'.fileext($files["name"][$i]);
		if (file_exists("upload/".$filename))
		{
			echo $filename." already exists.";
		}
		else
		{
			move_uploaded_file($files["tmp_name"][$i], "upload/".$filename);
			echo 'Stored in: <a href="upload/'.$filename.'" target="_blank">'.$filename.'</a><br/>';
		}
	}
?>