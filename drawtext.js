			var drawtext=function(a,b,c,d){
			//a text   b x坐标  c y坐标  d 颜色
                        context.shadowOffsetX=0;
                        context.shadowOffsetY=0;
                        context.shadowBlur=0;		
			context.font="16px 黑体";  
			context.fillStyle="#333333"; 
			context.textAlign="right";
			context.fillText(a,b-1,c-1); //
			context.fillStyle="rgba(255,255,255,0.35)"; 
			context.textAlign="right";
			context.fillText(a,b+1,c+1); //CardWidth*width+20,50
			context.font="16px 黑体";  
			context.fillStyle=d; 
			context.textAlign="right";
//			context.strokeStyle = "#adadad";
//			context.strokeText(showword[data.type][data.lang],ax,ay+4);  
			context.fillText(a,b,c); //
			}