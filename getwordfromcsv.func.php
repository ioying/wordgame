<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
<body>

<?php
/**
  * fgetcsv
  *
  * 修正原生fgetcsv讀取中文函式
  *
  * @param CSV文件檔案
  * @param length 每一行所讀取的最大資料長度
  * @param d 資料分隔符號(預設為逗號)
  * @param e 字串包含符號(預設為雙引號)
  * @return $_csv_data
  */
  set_time_limit (30);
  	function gb($str) //汉字 编码转换
		{
			return iconv("GBK", "UTF-8", $str);
		}
function fgetacsv(&$handle, $length = null, $d = ",", $e = '"') {
	$d = preg_quote($d);
	$e = preg_quote($e);
	$_line = "";
	$eof=false;
	while ($eof != true) {
		$_line .= (empty ($length) ? fgets($handle) : fgets($handle, $length));
		$itemcnt = preg_match_all('/' . $e . '/', $_line, $dummy);
		if ($itemcnt % 2 == 0){
			$eof = true;
		}
	}
 
	$_csv_line = preg_replace('/(?: |[ ])?$/', $d, trim($_line));
 
	$_csv_pattern = '/(' . $e . '[^' . $e . ']*(?:' . $e . $e . '[^' . $e . ']*)*' . $e . '|[^' . $d . ']*)' . $d . '/';
	preg_match_all($_csv_pattern, $_csv_line, $_csv_matches);
	$_csv_data = $_csv_matches[1];
 
	for ($_csv_i = 0; $_csv_i < count($_csv_data); $_csv_i++) {
		$_csv_data[$_csv_i] = preg_replace("/^" . $e . "(.*)" . $e . "$/s", "$1", $_csv_data[$_csv_i]);
		$_csv_data[$_csv_i] = str_replace($e . $e, $e, $_csv_data[$_csv_i]);
	}
 
	return empty ($_line) ? false : $_csv_data;
}

function fgetcsv_reg(& $handle, $length = null, $d = ',', $e = '”') {
		$d = preg_quote($d);
		$e = preg_quote($e);
		$_line = "";
		$eof=false;
	while ($eof != true) {
		$_line .= (empty ($length) ? fgets($handle) : fgets($handle, $length));
		$itemcnt = preg_match_all('/' . $e . '/', $_line, $dummy);
		if ($itemcnt % 2 == 0)
			$eof = true;
	}
	$_csv_line = preg_replace('/(?: |[ ])?$/', $d, trim($_line));
	$_csv_pattern = '/(' . $e . '[^' . $e . ']*(?:' . $e . $e . '[^' . $e . ']*)*' . $e . '|[^' . $d . ']*)' . $d . '/';
	preg_match_all($_csv_pattern, $_csv_line, $_csv_matches);
	$_csv_data = $_csv_matches[1];
	for ($_csv_i = 0; $_csv_i < count($_csv_data); $_csv_i++) {
		$_csv_data[$_csv_i] = preg_replace('/^' . $e . '(.*)' . $e . '$/s', '$1', $_csv_data[$_csv_i]);
		$_csv_data[$_csv_i] = str_replace($e . $e, $e, $_csv_data[$_csv_i]);
	}
return empty ($_line) ? false : $_csv_data;
}

setlocale(LC_ALL, 'zh_CN');
//设置回系统默认就
//setlocale(LC_ALL,NULL);


function getWordFromCsv($url="/wordgame/",$file="word.csv"){
	$file_url = $_SERVER['DOCUMENT_ROOT'].$url;
	$file_name = $file;  
	
	if(file_exists($file_url.$file_name)){
			$handle = fopen($file_url.$file_name,"r") or   exit("Unable to open file!");
			$tt=1;
		while (($data = fgetacsv($handle, 1000, ",")) !== FALSE) {

		if  ($data[0] != "ID" &&  $data[0] != null ){  
				if ($tt){
//				echo $data[0];
				$word = strtolower($data[0]);
				$mywords[$tt][0] = $word;
				$mywords[$tt][1] = gb($data[1]);
				$mywords[$tt][2] = './sound/'.$word.'.mp3' ;
				$tt++;
				//echo $word,gb($data[1]).'<br />';
				}
			}else{
//echo '------------------------------------------------------------------<br>';
			}
		}
	}else{
		echo "Oops!	";//文件未找到， 确认股票代码 或 选择远程下载， 代码以后补。
	}
//	var_dump($mywords);
return json_encode($mywords);
}
//echo getWordFromCsv('/wordgame/','weather.csv');
?> 