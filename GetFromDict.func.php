<!--
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
-->
<?php
// Dict.cn
function GetFromDict($SearchWord = 'the') {
require_once( 'phpQuery/phpQuery.php'); 

		//词性 暂时没有上
$cx = array ('prep','pron','n','v','conj','s','sc','o','oc','vi','vt','aux.v','aux','adj','adv','art','num','int','u','c','pl','abbr','adv','conj','def','indef','inf','neg','part','pers','pers','pp','pref','pron','pt','sb','sing','sth','suff','VP','Verb','vi','vt');

$word = rawurlencode(strtolower($SearchWord)) ;//'plate';//'the';//'dictionary';

//$url  = 'http://dict.youdao.com/search?le=eng&q='.$word.'&keyfrom=dict.top'; 
$url = 'http://dict.cn/'.$word;
phpQuery::newDocumentFile($url); 
	$artlist = pq(".phonetic >span");
		//抓取音标 0 英 1 美音
	foreach($artlist as $li){
	$newstr =	pq($li)->find('bdo')->text();
	$newphonetic[] =$newstr;
	}

		//抓 释义ul:eq(0) >li
	$nlist = pq(".clearfix  ul:eq(0) >li");

	foreach($nlist as $li){

	$newstr = pq($li)->text();

		if (!strpos($newstr,'googletag')){
			$newcontent[] =array('part' => substr($newstr, 0, strpos($newstr, '.')+1),'content' => $newstr);
		}
	}		
//var_dump($newcontent);

  if(empty($newphonetic) ) {
	$newphonetic = '';
  }
  if(empty($newcontent) ) {
	$newcontent = '';
  }
  
return array('phonetic' => $newphonetic,'content' => $newcontent );


}

// 调试用
// var_dump( GetFromDict('indebt'));
