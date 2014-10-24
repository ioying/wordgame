<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta name="viewport" content="width=device-width"/>  
<meta name="viewport" content=" initial-scale=1.0,user-scalable=no" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<meta content="black" name="apple-mobile-web-app-status-bar-style" />
</head>
<?php
// 			Mobile 
//          基本功能演示   单词进阶功能未做   by TT 20140330
/*
				$mywords[1][0] = 'can' ;
				$mywords[1][1] = '能' ;
				$mywords[2][0] = 'should' ;
				$mywords[2][1] = '应该' ;
				$mywords[3][0] = 'made' ;
				$mywords[3][1] = '创造的' ;
				$mywords[4][0] = 'such' ;
				$mywords[4][1] = '如此的' ;
				$mywords[5][0] = 'great' ;
				$mywords[5][1] = '伟大的' ;
				$mywords[6][0] = 'must' ;
				$mywords[6][1] = '必须' ;
				$mywords[7][0] = 'know' ;
				$mywords[7][1] = '知道' ;

*/

				$mywords[1][0] = 'spread' ;
				$mywords[1][1] = '传播伸展' ;
				$mywords[1][2] = './sound/spread.mp3' ;
				$mywords[2][0] = 'opposite' ;
				$mywords[2][1] = '相反的' ;
				$mywords[2][2] = './sound/opposite.mp3' ;
				$mywords[3][0] = 'glory' ;
				$mywords[3][1] = '光荣荣誉' ;
				$mywords[3][2] = './sound/glory.mp3' ;
				$mywords[4][0] = 'ordinary' ;
				$mywords[4][1] = '普通的' ;
				$mywords[4][2] = './sound/ordinary.mp3' ;
				$mywords[5][0] = 'distribute' ;
				$mywords[5][1] = '分发分配' ;
				$mywords[5][2] = './sound/distribute.mp3' ;
				$mywords[6][0] = 'inferior' ;
				$mywords[6][1] = '低劣的' ;
				$mywords[6][2] = './sound/inferior.mp3' ;
				$mywords[7][0] = 'recognize' ;
				$mywords[7][1] = '辨认出' ;
				$mywords[7][2] = './sound/recognize.mp3' ;
				
 //
 /*
  传播;伸展
opposite 相反的;对立的
glory  光荣;荣誉
twelve 十二
expect 期待;预期
ordinary 普通的
distribute 分发；分配
inferior（质量等）低劣的；下级的
recognize 辨认出;承认
vengeance 复仇
*/
?>
<html>
    <head>
	<script>

function load (){  
  
    //document.addEventListener('touchstart',touch, false);  
    document.addEventListener('touchmove',touch, false);  
    document.addEventListener('touchend',touch, false);  
    canvas.addEventListener('touchstart', touch, false); 
    function touch (event){  
        var event = event || window.event;  
          
        var oInp = document.getElementById("inp");  
  
        switch(event.type){  
            case "touchstart":  
			 touchstart();
                oInp.innerHTML = "Touch started (" + event.touches[0].clientX + "," + event.touches[0].clientY + ")";  
                break;  
            case "touchend":  
                oInp.innerHTML = "<br/>Touch end (" + event.changedTouches[0].clientX + "," + event.changedTouches[0].clientY + ")";  
                break;  
            case "touchmove":  
                event.preventDefault();  
                oInp.innerHTML = "<br/>Touch moved (" + event.touches[0].clientX + "," + event.touches[0].clientY + ")";  
                break;  
        }  
          
    }  
}  
//canvas.addEventListener('load',load, false);  
window.addEventListener('load',load, false);  

</script>
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
	<!--
	<img id="bs1" src="./images/bs1.png"  />
	<img id="bs2" src="./images/bs2.png"  />
	<img id="bs3" src="./images/bs3.png"  />
	<img id="bs4" src="./images/bs4.png"  />
	<img id="bs5" src="./images/bs5.png"  />
	
	<img id="bs6" src="./images/my1.png"  />
	
	<img id="bs1" src="./images/my1.png"  />
	<img id="bs2" src="./images/my2.png"  />
	<img id="bs3" src="./images/my3.png"  />
	<img id="bs4" src="./images/my4.png"  />
	<img id="bs5" src="./images/my5.png"  />
	<img id="bs6" src="./images/bs1.png"  />
-->
	
	</div>
		<div id='bg' style="background:url(./images/bg1.gif);background-repeat:no-repeat;background-size:927px 480px;">
			
			<div id="drawarea" style="padding-top:61px;padding-left:5px;">
				<canvas id="game" ></canvas>
			</div>
		<!--
		<div id='goal' style="position:absolute;padding-top:100px;padding-left:840px;color:#ffFFff" >任务目标：</div>	
			<div id='score' style="position:absolute;padding-top:160px;padding-left:840px;color:#ffFFff" >分数：</div>	
			<div id='steps' style="position:absolute;padding-top:220px;padding-left:840px;color:#ffFFff" >剩余步数：</div>		
			-->
		</div>
		
		<!-- <div ><a href='wordgame.php' style='font-size:22px;'>前往单色版</a></div> -->
		<script>
			var showword = <?php echo json_encode($mywords);?>;
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
		<script src="showtips.js"></script>
		<script src="drawtext.js"></script>
		<script src="gamewb.js"></script>
		
		<div id='tips'>
		</div>
		<div id='sound'>
		</div>
<div id="inp"></div>  
		</body>
</html>