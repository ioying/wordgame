<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
<?php

/*
// 抓词 by TT 20140325     
// 抓取失败会出现Notice级别错误提示
// 网速过慢会出现超时提示
// good luck！
*/


	// 设置自动停止
if ($_COOKIE["nowid"] < 78800){
	echo '<body onload="location.reload() ">';
}

function gb($str) //汉字 编码转换
{
//    return iconv("GBK", "UTF-8", $str);
//$output = mb_convert_encoding($output,"UTF-8",mb_detect_encoding($output, array("ASCII",'UTF-8',"GB2312","GBK")));
}

include 'GetFromDict.func.php';       // from Dict.cn
//include 'GetFromYoudao.func.php';   // from youdao.com


//  记录当前抓取位置
//setcookie("nowid",0);
$step  = 10; 				//网速快可适当增加  ，太大可能被封ip
$nowid = $_COOKIE["nowid"] + $step;
setcookie("nowid",$nowid);
echo $_COOKIE["nowid"].'<br />';
//return;
$update = 0 ; // 0 不更新uk音标  1 表示替换原有uk音标


$conn=MySQL_connect ("localhost", "root", "root") or die("Could not connect: " .mysql_error());
mysql_query("SET NAMES UTF8");
MySQL_select_db("test"); 

//设置抓取范围
//$exe="SELECT * FROM  `lnk_english_word` where phonetic_us is NULL and id > ".$_COOKIE["nowid"]." LIMIT 0 , ".$step ; 
//$exe="SELECT * FROM  `lnk_english_word` where `phonetic_uk` ='' and `status` =1  LIMIT ".$_COOKIE["nowid"]." , ".$step ;
//SELECT * FROM lnk_english_word WHERE `phonetic_uk` ='' and `status` =1
// SELECT * FROM lnk_english_word WHERE `phonetic_uk` ='' and `status` =1

$exe="SELECT * FROM  `lnk_english_word` where id>126 and id <681  LIMIT ".$_COOKIE["nowid"]." , ".$step ;
$result=MySQL_query($exe,$conn); 

while($rs=MySQL_fetch_object($result)) 
	
{
	//$x = GetFromYoudao($rs->word);   	//有道抓取
	$x = GetFromDict($rs->word);        //dict抓取	 
		if (!empty($x['phonetic'][0])){
			if ($update || empty($rs->phonetic_uk)){
				$updateuk=" `phonetic_uk` =  '". mysql_real_escape_string($x['phonetic'][0]) ."' ,";
			}else{
				$updateuk =  '';
			}
		}else{
				$updateuk =  '';
		}

			if ( !empty($x['phonetic'][1]) ){
			$updateuk .= " `phonetic_us` =  '". mysql_real_escape_string($x['phonetic'][1]) ."' WHERE id =".$rs->id;
			}
		//!empty($x['phonetic'][0]) &&
	if ( !empty($x['phonetic'][0]) ){
		$updateexe = "UPDATE  `lnk_english_word` SET ".$updateuk;
		MySQL_query($updateexe,$conn); 
		echo $rs->id,$rs->word ,$x['phonetic'][1] .'<br />';
	}	
	echo $rs->id,$rs->word .'<br />';
	if (!empty($x['content'])){
		foreach($x['content'] as $content){

		if (!empty($content['part']) && !empty($content['content'])){
			$checkpara = "SELECT * FROM `lnk_english_word_paraphrase` where word_id = ".$rs->id ."  and part_of_speech ='".$content['part']."'";
	//		echo $checkpara.'<br />';
			$pararesult = MySQL_query($checkpara,$conn);


			$prs=MySQL_fetch_object($pararesult);


			if (!$prs){	

			$insExe = "INSERT INTO `lnk_english_word_paraphrase` (`word_id`,`language`,`part_of_speech`,`content`,`sort`,`status`,`updated`,`created`)
	VALUES      (" . $rs->id . ", 1 ,'". mysql_real_escape_string($content['part']) ."','". $content['content'] ."', 0 ,1,'".time()."','".time()."')";




			MySQL_query($insExe,$conn); 
			echo $content['content'].'add new <br />';
			}
			}
		}
	}
}



date_default_timezone_set('Asia/Shanghai');
echo date("Y-m-d H:i:s",time()) ;
echo 'done <br />' ;
?>