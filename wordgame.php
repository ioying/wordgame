<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
<?php
//          基本功能演示   单词进阶功能未做   by TT 20140330

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
        <canvas id="game"></canvas>
		<div><a href='wordgamecolor.php' style='font-size:22px;'>前往彩色版</a></div>
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
		<script src="gamess.js"></script>
		</body>
</html>