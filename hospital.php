<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
<?php
include "./getwordfromcsv.func.php";
//          基本功能演示   单词进阶功能未做   by TT 20140330
?>
<html>
    <head>
        <meta charset="utf-8" />
        <title>单词爱消除</title>
        <style>
            *
            {
                margin: 0;
                padding: 0;
            }
            #game
            {
                margin: 10px;
            }
        </style>
    </head>
    <body>
	<div style="display:none">
	<img id="bs1" src="./images/w1.png"  />
	<img id="bs2" src="./images/w2.png"  />
	<img id="bs3" src="./images/w3.png"  />
	<img id="bs4" src="./images/w5.png"  />
	<img id="bs5" src="./images/w4.png"  />
	<img id="bs6" src="./images/w6.png"  />
	<img id="bs7" src="./images/w7.png"  />
	<img id="bs8" src="./images/card11.png"  />
	<img id="bs9" src="./images/cardl.png"  />
	<img id="bs10" src="./images/cardk.png"  />
	
	</div>
		<div id='bg1' style="background-size:927px 480px;position:absolute; top:50px;" onclick='this.style.display = "none";'>
		  
		  <img src="./images/steps.png">
		</div>
		<div id='bg' style="background:url(./images/bg1.gif);background-repeat:no-repeat;background-size:927px 480px;">
			<div style="position:absolute;  left:350px;  top:15px;"><img src="./images/title1.png">
			</div>
			<div id="drawarea" style="padding-top:61px;padding-left:5px;">
				<canvas id="game" ></canvas>
			</div>
		<br />	
		<br />	
		<br />	
		<br />	
		</div>
		<script>
			var showword = <?php echo getWordFromCsv('/wordgame/','hospital.csv');?>;
		</script>				
        <script>
           var shuffle=function(){
                var i,j;
				var temtype;
                for(i=0;i<width;i++){
                    for(j=0;j<height;j++){
						temtype = random();
                        map.data[i][j].type=temtype;
						map.data[i][j].lang=Math.round(Math.random());

                    }
                }
            };
        </script>
		<script src="hospital.js"></script>
		<script src="showtips.js"></script>
		<script src="drawtext.js"></script>
		<script src="game.js"></script>
		
		<div id='tips'>
		</div>
		<div id='sound'>
		</div>
		<div id='congratulation' style="background-size:927px 480px;position:absolute; top:50px; display:none;" onclick='location="index.php"'>
		  
		  <img src="./images/congratulation.png">
		</div>
		<div id='lost' style="background-size:927px 480px;position:absolute; top:50px; display:none;" onclick='location="index.php"'>
		  
		  <img src="./images/lost.png">
		</div>
<?php
include './footer.php';

?>
		</body>
</html>