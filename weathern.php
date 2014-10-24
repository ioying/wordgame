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
		       <style media="screen">
            body {
                overflow: hidden;
                height: 100%;
                margin: 0;
                padding: 0;
            }

            #canvasHolder {
            	position: absolute;
            	top: 50px;
            	left: 50px;
            	width: 100px;
            	height: 100px;
            }

            img {
            	width: ;
            }
        </style>
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
		        <script>
            function run() {
                var image = document.getElementById('bg');
                image.onload = function() {
                    var engine = new RainyDay({
                        image: this,
                       // crop: [ 50, 50, 600, 400]
                    }, document.getElementById('canvas'));
                    engine.trail = engine.TRAIL_SMUDGE;
                    engine.rain([ [3, 3, 0.5] ], 33);
                };
                image.crossOrigin = 'anonymous';
               //image.src = 'http://i.imgur.com/HRtuQo8.jpg';
            }
        </script>
    </head>
    <body  onload="run();">
	<div style="display:none">
				var color1 = '#ff0000';		// 红  
			var color2 = '#8eeffd';		// 白（青 ） 
			var color3 = '#e78e1a';		// 黄  
			var color4 = '#823fcc';		// 紫  
			var color5 = '#327fc7';		// 青  
			var color6 = '#0fa647';		// 绿  
			var color7 = '#333333';		// 黑
	<img id="bs1" src="./images/weather1.png"  />
	<img id="bs2" src="./images/weather7.png"  />
	<img id="bs3" src="./images/weather3.png"  />
	<img id="bs4" src="./images/weather4.png"  />
	<img id="bs5" src="./images/weather5.png"  />
	<img id="bs6" src="./images/weather6.png"  />
	<img id="bs7" src="./images/weather7.png"  />
	<img id="bs8" src="./images/card11.png"  />
	<img id="bs9" src="./images/cardl.png"  />
	<img id="bs10" src="./images/cardk.png"  />
	
	</div><!--
	       <img id="background" alt="background" src="" />
        <div id="canvasHolder">
        	<canvas id="canvas" width="600" height="40"></canvas>
        </div>
		-->
		<div id='bg1' style="background-size:927px 480px;position:absolute; top:50px;" onclick='this.style.display = "none";'>
		  
		  <img src="./images/score.png">
		</div>
		<div id='bg' style="background:url(./images/bg1.gif);background-repeat:no-repeat;background-size:927px 480px;">
 <img id="background" alt="background" src="" />		
		<canvas id="canvas" width="600" height="40"></canvas>
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
			var showword = <?php echo getWordFromCsv('/wordgame/','weather.csv');?>;
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
		<script src="rainyday.min.js"></script>
		<script src="weather.js"></script>
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
<?php
include './footer.php';

?>		
		</body>
</html>