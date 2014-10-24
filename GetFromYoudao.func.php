<!--
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
-->
<?php
// 有道网站有访问次数限制，大约每小时1000  ，超过则屏蔽 待具体验证
function GetFromYoudao($SearchWord = 'the') {
require_once( 'phpQuery/phpQuery.php'); 

		//词性 暂时没有上
$cx = array ('prep','pron','n','v','conj','s','sc','o','oc','vi','vt','aux.v','aux','adj','adv','art','num','int','u','c','pl','abbr','adv','conj','def','indef','inf','neg','part','pers','pers','pp','pref','pron','pt','sb','sing','sth','suff','VP','Verb','vi','vt');

$word = strtolower($SearchWord) ;//'plate';//'the';//'dictionary'urlencode();


//$url  = 'http://dict.youdao.com/search?le=eng&q='.$word.'&keyfrom=dict.top'; 
$url  = 'http://dict.youdao.com/search?le=eng&q='.$word.'&keyfrom=dict.top'; 
phpQuery::newDocumentFile($url); 
	$list = pq(".trans-container ul:eq(0) >li ")->html(); 
	echo pq($list)->text();
		//抓取音标 0 英 1 美音
	$artlist = pq(".pronounce > .phonetic");//->html()

	foreach($artlist as $li){

	$newphonetic[] = pq($li)->text();

	}

		//抓 释义
	$nlist = pq(".trans-container ul:eq(0) >li ");

	foreach($nlist as $li){

	$newstr = pq($li)->text();

	$newcontent[] =array('part' => substr($newstr, 0, strpos($newstr, '.')+1),'content' => $newstr);
}

return array('phonetic' => $newphonetic,'content' => $newcontent );


}
//测试 
//var_dump( GetFromYoudao('worsen'));
