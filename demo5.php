<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>rainyday.js demo #5 (cropping)</title>
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
        <script src="rainyday.min.js"></script>
        <script>
            function run() {
                var image = document.getElementById('background');
                image.onload = function() {
                    var engine = new RainyDay({
                        image: this,
                        crop: [ 50, 50, 600, 400]
                    }, document.getElementById('canvas'));
                    engine.trail = engine.TRAIL_SMUDGE;
                    engine.rain([ [3, 3, 0.5] ], 33);
                };
                image.crossOrigin = 'anonymous';
                image.src = 'http://i.imgur.com/HRtuQo8.jpg';
            }
        </script>
    </head>
    <body onload="run();">
        <img id="background" alt="background" src="" />
        <div id="canvasHolder">
        	<canvas id="canvas" width="600" height="400"></canvas>
        </div>
    </body>
</html>
