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
  include "./getfile.php";
  
  set_time_limit (60);
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
/*utf-8gb2312
*  读取转换csv文件， ecshop 批量上传 
*

// utf-8
setlocale(LC_ALL, 'en_US.UTF-8');
// 简体
setlocale(LC_ALL, 'zh_CN');
   以下是常用的地区标识
zh_CN GB2312 
en_US.UTF-8 UTF-8 
zh_TW BIG5 
zh_HK BIG5-HKSCS 
zh_TW.EUC-TW EUC-TW 
zh_TW.UTF-8 UTF-8 
zh_HK.UTF-8 UTF-8 
zh_CN.GBK GBK 
* ?csv=


	if (!empty($_GET['csv']))
	{
		$file_name = "./".$_GET['csv']; 
		echo 'csv get:'.$file_name; 
	}else{
		
		echo 'no such csv file :'.$_GET['csv']; 
	}
	
return;
*/
//  echo getcwd();
//setlocale(LC_ALL, 'GB2312');
//setlocale(LC_ALL, 'zh_CN.GBK');
// utf-8
//setlocale(LC_ALL, 'en_US.UTF-8');
// 简体
setlocale(LC_ALL, 'zh_CN');
//设置回系统默认就
//setlocale(LC_ALL,NULL);

	$file_url = $_SERVER['DOCUMENT_ROOT']."/wordgame/";

	$file_name = "word.csv";  //完整数据
	if(file_exists($file_url.$file_name)){
		$datastr = 'word, conent,sound<br>'."\r\n";
		$handle = fopen($file_url.$file_name,"r") or   exit("Unable to open file!");
$tt=1;
		while (($data = fgetacsv($handle, 1000, ",")) !== FALSE) {
			if ($tt++>3200){
			break;
			}
		
		if  ($data[0] != "ID" &&  $data[0] != null ){  
				if ($tt>0){
//				echo $data[0];
				$word = strtolower($data[0]);
				$url = substr($word,0, 2) . "/" . $word . ".wav";
			echo $url ,'<br />';
			get_file('http://www.vocabularycard.com/puredata/sound/'.$url,'./sound'); 	
//					$datastr .= $data[0].gb( $data[1])."\r\n" ;
				}
			}else{
//echo '------------------------------------------------------------------<br>';
			}
		}
		
//		echo $datastr;
	}else{

		echo "Oops!	";//文件未找到， 确认股票代码 或 选择远程下载， 代码以后补。

	}
	
return;


			$file_name=uniqid().'.csv';
			$fp = fopen($file_name,"a");  
//在写入数据之前先把bom头写到文件里  
            fwrite($fp,"\xEF\xBB\xBF");  
//再写入数据 php程序员站  
fwrite($fp,$datastr);  
//phperz.com  
fclose($fp);  
//phperz.com  
			
			
//			$ok=file_put_contents($file_name,$datastr);

?> 