    
		
            if(!window.requestAnimationFrame){
                window.requestAnimationFrame=window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
            }
			var img1=document.getElementById("bs1");
			var img2=document.getElementById("bs2");
			var img3=document.getElementById("bs3");
			var img4=document.getElementById("bs4");
			var img5=document.getElementById("bs5");
			var img6=document.getElementById("bs6");
			var img7=document.getElementById("bs7");
			var img8=document.getElementById("bs8");
			var img9=document.getElementById("bs9");
			var img10=document.getElementById("bs10");

            var i,j;
			/*
            var width  = 4;
            var height = 6;
			var kinds  = 5; 			//使用块种类 取值 2-7 默认7 越大越难
										//主流游戏目前多使用6 
			var gametype = 1;           // 1 计分  2 计时  3 消指定块 4 计步
			*/
			var CardWidth = 100;
			var CardHeight = 44;
			var WidthGap1 = 4 ; 		// 宽度边缘空白1
			var WidthGap2 = 12 ;		// 宽度边缘空白2
			var HeightGap1 = 16 ;		// 高度边缘空白1
			var HeightGap2 = 6 ;		// 高度边缘空白2
			
            var canvas=document.getElementById("game");
            var canvas_width=canvas.width=200+width*CardWidth;
            var canvas_height=canvas.height=40+height*CardHeight;
			var context=canvas.getContext("2d");
            var need_draw=false;
            var need_clear=false;
			var score = 0 ;    			//得分
			var steps = 0 ;				//移动步数  //完成 计步
			var times = 0 ; 			//计时（移动第一步开始）  //未完成
			var backpending = 6; 		//待刷背景数量;
			var isFirstMove = 0;		//是否第一步
			var isPlayerMove = 0;		//是否为用户移动
			var isTimerStart = 0;		//是否开始计时   // 游戏为计时模式时显示
            context.lineWidth=1;
				// 块
			/*	
            var map={
                locked:false,
                data:[]
            };
				// 背景
			var back={
                locked:false,
                data:[]
			}
				// 创建块对象 、背景
            for(i=0;i<width;i++){
                map.data[i]=[];
				back.data[i]=[];
                for(j=0;j<height;j++){
					if (i==1){
					back.data[i][j] ={
						type:0,
						value:3,
					}
					}else{
					back.data[i][j] ={
						type:0,
						value:1,

					}
					}
                    map.data[i][j]={
                        type:0,
                        moving:false,
                        selected:false,
                        move:null,
                        step:0,
						lang:1,
						text:'test',
                        offset:{
                            x:0,
                            y:0
                        }
                    };
                }
            }
			*/
				//重置  似乎没用上
            var reset=function(){
                var i,j;
                for(i=0;i<width;i++){
                    for(j=0;j<height;j++){
                        reset_single(i,j);
                    }
                }
            };
			var timedCount = function(){
				var t	;
				// 鼠标点击时，计秒显示有闪烁  
				//document.getElementById('txt').value=c
				times++;
				t=setTimeout("timedCount()",1000);
							show_tips();
				//			alert('w');
				if (gametype ==2){
				context.clearRect(CardWidth*width+10,135,CardWidth*width+30,20);
				drawtext(passtime-times,CardWidth*width+90,150,"#ffffff");
						if ((passtime-times)<=0 && (score < passscore) ){
							document.getElementById("lost").style.display = "block";
							
						}
						if (score > passscore && (passtime-times) >= 0 ){
							document.getElementById("congratulation").style.display = "block";
							
						}				
				
				}
				
			}
			
			
			
				// 重置单个块
            var reset_single=function(i,j){
                var data=map.data[i][j];
                data.type=0;
                data.moving=false;
                data.selected=false;
                data.move=null;
                data.step=0;
                data.offset.x=0;
                data.offset.y=0;
				
				if (isFirstMove == 1){
					var value = back.data[i][j].value ;
					newvalue = value>0 ? value-1 : 1;
						//alert(newvalue);
					back.data[i][j].value = newvalue;
				}
            };
            var random=function(){
                return Math.floor(Math.random()*kinds)+1;  //was 7 now kinds
            };

				//	发牌 
//          var shuffle=function(){
//               var i,j;
//               for(i=0;i<width;i++){
//                   for(j=0;j<height;j++){
//                      map.data[i][j].type=random();
////					map.data[i][j].text=random();
//                    }
//                }
//            };

				// 播放声音
            var PlaySound=function(i){
                //document.getElementById('sound').innerHTML='<embed src="'+i+'" loop="0" autostart="true" hidden="true"></embed>'; 
				document.getElementById('sound').innerHTML='<audio src="'+i+'" autoplay="autoplay">Your browser does not support the audio element.</audio>';
            };

				// 检查是否超范围
            var check_in=function(i,j){
                return i>=0 && i<width && j>=0 && j<height;
            };
				// 块正在移动中
            var is_moving=function(i,j){
                return map.data[i][j].moving;
            };
				// 获取块类别
            var get_type=function(i,j){
                return map.data[i][j].type;
            };

				// 消除
            var clear=function(ax,ay,bx,by){
			    //alert(ax+"_"+ay+"_"+bx+"_"+by);
                ax=ax===undefined ? -1 : ax;
                ay=ay===undefined ? -1 : ay;
                bx=bx===undefined ? -1 : bx;
                by=by===undefined ? -1 : by;
                var i,j,k,a,b,c,stop,flag,ta,tb;
                var ret=0;
                var fa=0;
                var fb=0;
                var pos=[];
                for(i=0;i<width;i++){
                    for(j=0;j<height;j++){
                        a=get_type(i,j);
                        if(check_in(i,j+1) && check_in(i,j+2)){
                            b=get_type(i,j+1);
                            c=get_type(i,j+2);
                            if(a==b && b==c){
                                stop=j+2;
                                while(check_in(i,stop+1) && get_type(i,stop+1)==a){
                                    stop++;
                                }
                                flag=true;
                                if((ta=(ax==i && ay>=j && ay<=stop) ? 1 : 0) || (tb=(bx==i && by>=j && by<=stop) ? 1 : 0)){
                                    for(k=j;k<=stop;k++){
                                        if(is_moving(i,k)){
                                            flag=false;
                                            if(ret==0){
                                                ret=1;
                                            }
                                            break;
                                        }
                                    }
                                    if(flag){
                                        ret=2;
                                        for(k=j;k<=stop;k++){
                                            pos.push([i,k]);
                                        }
                                        if(ta){
                                            fa=2;
                                        }
                                        if(tb){
                                            fb=2;
                                        }
                                    }else{
                                        if(ta && fa==0){
                                            fa=1;
                                        }
                                        if(tb && fb==0){
                                            fb=1;
                                        }
                                    }
                                }else{
                                    for(k=j;k<=stop;k++){
                                        if(is_moving(i,k)){
                                            flag=false;
                                            break;
                                        }
                                    }
                                    if(flag){
                                        for(k=j;k<=stop;k++){
                                            pos.push([i,k]);
                                        }
                                    }
                                }
                            }
                        }
                        if(check_in(i+1,j) && check_in(i+2,j)){
                            b=get_type(i+1,j);
                            c=get_type(i+2,j);
                            if(a==b && b==c){
                                stop=i+2;
                                while(check_in(stop+1,j) && get_type(stop+1,j)==a){
                                    stop++;
                                }
                                flag=true;
                                if((ta=(ax>=i && ax<=stop && ay==j) ? 1 : 0) || (tb=(bx>=i && bx<=stop && by==j) ? 1 : 0)){
                                    for(k=i;k<=stop;k++){
                                        if(is_moving(k,j)){
                                            flag=false;
                                            if(ret==0){
                                                ret=1;
                                            }
                                            break;
                                        }
                                    }
                                    if(flag){
                                        ret=2;
                                        for(k=i;k<=stop;k++){
                                            pos.push([k,j]);
                                        }
                                        if(ta){
                                            fa=2;
                                        }
                                        if(tb){
                                            fb=2;
                                        }
                                    }else{
                                        if(ta && fa==0){
                                            fa=1;
                                        }
                                        if(tb && fb==0){
                                            fb=1;
                                        }
                                    }
                                }else{
                                    for(k=i;k<=stop;k++){
                                        if(is_moving(k,j)){
                                            flag=false;
                                            break;
                                        }
                                    }
                                    if(flag){
                                        for(k=i;k<=stop;k++){
                                            pos.push([k,j]);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
				var tem_step = 0;
				var value ;
				var x,y;
                for(i=0;i<pos.length;i++){
					//alert(pos[i][0]+'___'+pos[i][1]);
					//x = pos[i][0];
					//y = pos[i][1];
					
                    reset_single(pos[i][0],pos[i][1]);
					
					if (isFirstMove == 1){
						score += 100;
						tem_step = 1;
					}
                }
				if (tem_step == 1 && isPlayerMove ==1 ){
				steps = steps + 1;
				tem_step = 0;
				isPlayerMove = 0;
				}
                drop();

                return [ret,fa,fb];
            };
				// 换位
            var swap=function(i1,j1,i2,j2){
                var t=map.data[i1][j1];
                map.data[i1][j1]=map.data[i2][j2];
                map.data[i2][j2]=t;
            };
				// 移动
            var start_move=function(i,j,type,to,step,func){
                if(type!="x" && type!="y"){
                    return;
                }
                step=Math.abs(step)*0.3;
                var data=map.data[i][j];
                var count=0;
                var all;
                data.moving=true;
                if(type=="x"){
                    all=Math.abs(to-data.offset.x)/(step*1);
                    step=(to-data.offset.x)/all;
                    all=Math.ceil(all);
                    stop_move(i,j);
                    data.move=function(auto){
                        data.offset.x+=step;
                        if(++count>=all || auto){
                            data.offset.x=to;
                            data.moving=false;
                            data.move=null;
                            func && func();
                            need_clear=true;
                        }
                        need_draw=true;
                    };
                }else{
                    all=Math.abs(to-data.offset.y)/step;
                    step=(to-data.offset.y)/all;
                    all=Math.ceil(all);
                    stop_move(i,j);
                    data.move=function(auto){
                        data.offset.y+=step;
                        if(++count>=all || auto){
                            data.offset.y=to;
                            data.moving=false;
                            data.move=null;
                            func && func();
                            need_clear=true;
                        }
                        need_draw=true;
                    };
                }
            };
			
            var stop_move=function(i,j){
                var data=map.data[i][j];
                if(data.move){
                    data.move(true);
                }
                data.move=null;
            };
			
				// 掉块
            var drop=function(){
                var i,j,start,stop,len;

                var has=[];
                for(i=0;i<width;i++){
                    has[i]=false;
                    for(j=0;j<height && map.data[i][j].type!=0;j++);
                    while(j<height){
                        has[i]=true;
                        for(start=j+1;start<height && map.data[i][start].type==0;start++);
                        len=(start-j)*CardHeight;
                        if(start==height){
                            for(;j<start;j++){
                                map.data[i][j].type=random();
								map.data[i][j].lang=Math.round(Math.random());
                                map.data[i][j].offset.y=-len;
                                start_move(i,j,"y",0,18); //16
                            }
                            break;
                        }
                        for(stop=start+1;stop<height && map.data[i][stop].type!=0;stop++);
                        for(;start<stop;j++,start++){
                            swap(i,j,i,start);
                            map.data[i][j].offset.y=-len;
                            start_move(i,j,"y",0,18);
                        }
                    }
                }
				
            };
 
			
				// 画背景 画单块
            var draw=function(){
			
                var i,j;
				var backpending = 0 ;
                context.clearRect(0,0,canvas_width,canvas_height);
                for(i=0;i<width;i++){
                    for(j=0;j<height;j++){
							var backdata = back.data[i][j];
							var ax=WidthGap1+i*CardWidth+CardWidth/2;
							var ay=26+(height-j-1)*CardHeight+32;
							var value = back.data[i][j].value ;
							newvalue = value>1 ? value-1 : 0;
							backpending += newvalue  ;

							//alert(backdate.value);
							value = backdata.value;
							switch(value){
								case 0:
									context.fillStyle="rgba(255,255,255,0.3)";
									break;
								case 1:
									context.fillStyle="rgba(255,255,255,0.3)";
									break;
								case 2:
									context.fillStyle="rgba(255,0,0,0.6)";
									break;
								case 3:
									context.fillStyle="rgba(255,255,255,0.9)";
									break;
								case 4:
									context.drawImage(img1,ax-(CardWidth/2)+WidthGap1/2,ay-(CardHeight/2)+HeightGap2/2,CardWidth-WidthGap1,CardHeight-HeightGap2);
								case 5:
									context.drawImage(img1,ax-(CardWidth/2)+WidthGap1/2,ay-(CardHeight/2)+HeightGap2/2,CardWidth-WidthGap1,CardHeight-HeightGap2);
								case 6:
									context.drawImage(img1,ax-(CardWidth/2)+WidthGap1/2,ay-(CardHeight/2)+HeightGap2/2,CardWidth-WidthGap1,CardHeight-HeightGap2);
								case 7:
									context.drawImage(img1,ax-(CardWidth/2)+WidthGap1/2,ay-(CardHeight/2)+HeightGap2/2,CardWidth-WidthGap1,CardHeight-HeightGap2);
								case 8:
									context.drawImage(img1,ax-(CardWidth/2)+WidthGap1/2,ay-(CardHeight/2)+HeightGap2/2,CardWidth-WidthGap1,CardHeight-HeightGap2);
								case 9:
									context.drawImage(img1,ax-(CardWidth/2)+WidthGap1/2,ay-(CardHeight/2)+HeightGap2/2,CardWidth-WidthGap1,CardHeight-HeightGap2);
							}			
							
                    /*
						if((i+j)%2==0){
                            context.fillStyle="rgba(255,255,255,0.35)";
                        }else{
                            context.fillStyle="rgba(255,255,255,0.25)";
						 
                        }
					*/	
                        context.fillRect(WidthGap1+i*CardWidth,36+(height-j-1)*CardHeight,CardWidth,CardHeight);
						context.strokeStyle="#adadad";//;"rgba(0,0,0,0.2)"
						context.strokeRect(WidthGap1+i*CardWidth,36+(height-j-1)*CardHeight,CardWidth,CardHeight);
                    }
                }
                for(i=0;i<width;i++){
                    for(j=0;j<height;j++){
                        draw_single(i,j);
                    }
                }
				if (gametype == 1){
					drawtext('本关得分',CardWidth*width+90,50,"#cc0033");
					drawtext(score,CardWidth*width+90,70,"#ffffff");
					drawtext('目标分数',CardWidth*width+90,90,"#cc0033");
					drawtext(passscore,CardWidth*width+90,110,"#ffffff");
						if (score > passscore){
						document.getElementById("congratulation").style.display = "block";
						document.getElementById("congratulation").onclick
						}
				}	
				if (gametype == 4){
					drawtext('本关得分',CardWidth*width+90,50,"#cc0033");
					drawtext(score,CardWidth*width+90,70,"#ffffff");
					drawtext('目标分数',CardWidth*width+90,90,"#cc0033");
					drawtext(passscore,CardWidth*width+90,110,"#ffffff");
					drawtext('剩余步数',CardWidth*width+90,130,"#cc0033");
					drawtext(passsteps-steps,CardWidth*width+90,150,"#ffffff");
						if ((passsteps-steps)<=0 && (score < passscore) ){
							document.getElementById("lost").style.display = "block";
							
						}
						if ((score > passscore) && (passsteps-steps) > 0 ){
							document.getElementById("congratulation").style.display = "block";
							
						}
				}
				if (gametype == 2){
					drawtext('本关得分',CardWidth*width+90,50,"#cc0033");
					drawtext(score,CardWidth*width+90,70,"#ffffff");
					drawtext('目标分数',CardWidth*width+90,90,"#cc0033");
					drawtext(passscore,CardWidth*width+90,110,"#ffffff");
					drawtext('剩余时间',CardWidth*width+90,130,"#cc0033");
				}
				if (gametype == 3){
					drawtext('本关得分',CardWidth*width+90,50,"#cc0033");
					drawtext(score,CardWidth*width+90,70,"#ffffff");
					drawtext('目标分数',CardWidth*width+90,90,"#cc0033");
					drawtext(passscore,CardWidth*width+90,110,"#ffffff");
					drawtext('剩余步数',CardWidth*width+90,130,"#cc0033");
					drawtext(passsteps-steps,CardWidth*width+90,150,"#ffffff");
					drawtext('待清除块',CardWidth*width+90,170,"#cc0033");
					drawtext(backpending,CardWidth*width+90,190,"#ffffff");
					//alert(backpending);
					//alert(passsteps-steps);
					
						if ((backpending <= 0) && (passsteps-steps) >= 0 ){
							document.getElementById("congratulation").style.display = "block";
						}
						
						if (((passsteps - steps) <= 0 )&& (backpending > 0) ){
							document.getElementById("lost").style.display = "block";
						}
						

					/*	*/
				}
            };
			

				// 返回当前坐标所在的块
            var from_point=function(x,y){
                x-=13;  //20  调整在屏幕的位置
                y-=95; 	//20
                var i=Math.floor(x/CardWidth);
                var j=height-Math.floor(y/CardHeight)-1;
                if(check_in(i,j)){
                    return [i,j];
                }else{
                    return null;
                }
            };
				// 画单块
            var draw_single=function(x,y){
			//alert(y);
			
                var data=map.data[x][y];
				var showtext = data.text;
                var ax=WidthGap1+x*CardWidth+data.offset.x+CardWidth/2;
                var ay=26+(height-y-1)*CardHeight+data.offset.y+32;   // 其中调整参数具体作用待确定26 32
			    var type=data.type;
                context.strokeStyle="black";
                context.beginPath(); 
                switch(type){ 
                    case 1:
					context.drawImage(img1,ax-(CardWidth/2)+WidthGap1/2,ay-(CardHeight/2)+HeightGap2/2,CardWidth-WidthGap1,CardHeight-HeightGap2);
                        context.fillStyle=color1;//"#cc0033"; 	//rgba(255,0,0,0.6)
                        break;
                    case 2:
					context.drawImage(img2,ax-(CardWidth/2)+WidthGap1/2,ay-(CardHeight/2)+HeightGap2/2,CardWidth-WidthGap1,CardHeight-HeightGap2);
						context.fillStyle=color2;//"#555555";	//white
                        break;
                    case 3:
					context.drawImage(img3,ax-(CardWidth/2)+WidthGap1/2,ay-(CardHeight/2)+HeightGap2/2,CardWidth-WidthGap1,CardHeight-HeightGap2);
						context.fillStyle=color3;//"#993333"; 	//yellow
                        break;
                    case 4:
					context.drawImage(img4,ax-(CardWidth/2)+WidthGap1/2,ay-(CardHeight/2)+HeightGap2/2,CardWidth-WidthGap1,CardHeight-HeightGap2);
						context.fillStyle=color4;//"purple";
                        break;
                    case 5:
					context.drawImage(img5,ax-(CardWidth/2)+WidthGap1/2,ay-(CardHeight/2)+HeightGap2/2,CardWidth-WidthGap1,CardHeight-HeightGap2);
						context.fillStyle=color5;//"#005abb"; 	//blue 0085cf
                        break;
                    case 6:
					context.drawImage(img6,ax-(CardWidth/2)+WidthGap1/2,ay-(CardHeight/2)+HeightGap2/2,CardWidth-WidthGap1,CardHeight-HeightGap2);
					    context.fillStyle=color6;//"orange"; 	//fe4819
						break;
                    case 7:
					context.drawImage(img7,ax-(CardWidth/2)+WidthGap1/2,ay-(CardHeight/2)+HeightGap2/2,CardWidth-WidthGap1,CardHeight-HeightGap2);
						context.fillStyle=color7;//"#4cb648"; 	//green009a49
						break;
                    case 8:
					context.drawImage(img8,ax-(CardWidth/2)+WidthGap1/2,ay-(CardHeight/2)+HeightGap2/2,CardWidth-WidthGap1,CardHeight-HeightGap2);
						context.fillStyle="#4cb648"; 	//green009a49
						break;
                    case 9:
					context.drawImage(img9,ax-(CardWidth/2)+WidthGap1/2,ay-(CardHeight/2)+HeightGap2/2,CardWidth-WidthGap1,CardHeight-HeightGap2);
						context.fillStyle="#4cb648"; 	//green009a49
						break;
                    case 10:
					context.drawImage(img10,ax-(CardWidth/2)+WidthGap1/2,ay-(CardHeight/2)+HeightGap2/2,CardWidth-WidthGap1,CardHeight-HeightGap2);
						context.fillStyle="#4cb648"; 	//green009a49
						break;						
                }
                //context.fill();
					
						if (data.lang == 1 ){
							context.font="16px 黑体";  //Georgia Arial楷体
						} 
						else 
						{
							context.font="18px Verdana";  //Georgia ArialArial
						}
						context.textAlign="center";
						context.strokeStyle = "#cccccc";
//						context.strokeText(showword[data.type][data.lang],ax+1,ay+5);  

//						context.shadowColor="rgba(255,255,255,0.4)";
						context.shadowColor="rgba(0,0,0,0.4)";
                        context.shadowOffsetX=1;
                        context.shadowOffsetY=1;
                        context.shadowBlur=1;		
						context.fillText(showword[data.type][data.lang],ax,ay+4); 
						//						context.stroke();
                if(data.selected){
                    context.strokeStyle="red";
                    context.beginPath();
					context.moveTo(ax-CardWidth/2,ay-CardHeight/2);
					context.lineTo(ax-CardWidth/2,ay+CardHeight/2);
					context.lineTo(ax+CardWidth/2,ay+CardHeight/2);
					context.lineTo(ax+CardWidth/2,ay-CardHeight/2);
					context.lineTo(ax-CardWidth/2,ay-CardHeight/2);
                    context.stroke();
					show_tips();
					PlaySound(showword[data.type][2]);
                }
				
            };
            var later_queue=[];
            var later=function(func){
                later_queue.push(func);
            };
            var old_pos=null;
            canvas.onmousedown=function(e){
                e=e || window.event;
                if(e.button==0){
                    var x=e.pageX-10;
                    var y=e.pageY-10;
					//alert(x);
                    var pos=from_point(x,y);
                    if(pos && !is_moving(pos[0],pos[1])){
                        map.data[pos[0]][pos[1]].selected=true;
                        need_draw=true;
                        old_pos=pos;
                    }
                }
            };
            canvas.onmousemove=function(e){
                if(old_pos){
                    e=e || window.event;
                    var x=e.pageX-10;
                    var y=e.pageY-10;
                    var pos=from_point(x,y);
                    var opos;
                    var ox,oy;
                    var ts,tt;
                    var count=0;
					//alert('mouse');
					isFirstMove = 1;
					isPlayerMove = 1;
					if (isTimerStart == 0){
					isTimerStart = 1;
					timedCount();
					}
                    if(pos && !is_moving(pos[0],pos[1])){
                        ox=pos[0]-old_pos[0];
                        oy=pos[1]-old_pos[1];
                        if(Math.abs(ox)+Math.abs(oy)==1){
                            opos=old_pos;
                            old_pos=null;
                            map.data[opos[0]][opos[1]].selected=false;
                            if(Math.abs(ox)==1){
                                ts="x";
                                tt=ox;
                            }else{
                                ts="y";
                                tt=-oy;
                            }
                            var func=function(){
                                count++;
                                if(count==2){
                                    later(function(){
                                        swap(opos[0],opos[1],pos[0],pos[1]);
                                        var ret=clear(opos[0],opos[1],pos[0],pos[1]);
                                        var old,next;
                                        if(ret[0]==0){
                                            swap(opos[0],opos[1],pos[0],pos[1]);
                                            start_move(opos[0],opos[1],ts,0,16);
                                            start_move(pos[0],pos[1],ts,0,16);
                                        }else{
                                            old=map.data[opos[0]][opos[1]];
                                            if(ret[1]==1){
                                                old.moving=true;
                                            }
                                            //FIXME:
                                            if(ret[1]!=2 && opos[1]-pos[1]!=1){
                                                old.offset.x=0;
                                                old.offset.y=0;
                                            }
                                            next=map.data[pos[0]][pos[1]];
                                            if(ret[2]==1){
                                                next.moving=true;
                                            }
                                            if(ret[2]!=2){
                                                next.offset.x=0;
                                                next.offset.y=0;
                                            }
                                        }
                                    });
                                }
                            };
							
								// 交换移动
							if(ts == "x"){
                            start_move(opos[0],opos[1],ts,CardWidth*tt,46,func);
                            start_move(pos[0],pos[1],ts,-CardWidth*tt,46,func);
                            }else{
                            start_move(opos[0],opos[1],ts,CardHeight*tt,18,func);
                            start_move(pos[0],pos[1],ts,-CardHeight*tt,18,func);
                            }
                        }
                    }
                }
            };
            canvas.onmouseout=canvas.onmouseup=function(){
                if(old_pos){
                    map.data[old_pos[0]][old_pos[1]].selected=false;
                    old_pos=null;
                    need_draw=true;
                }
            };
            document.body.onselectstart=function(e){
                e=e || window.event;
                e.preventDefault();
                return false;
            };
            shuffle();
            need_draw=true;
            need_clear=true;
            (function(){
                var i,j;
                var clone=[];
                for(i=0;i<width;i++){
                    clone[i]=[];
                    for(j=0;j<height;j++){
                        clone[i][j]=map.data[i][j];
                    }
                }
                for(i=0;i<width;i++){
                    for(j=0;j<height;j++){
                        if(clone[i][j].move){
                            clone[i][j].move();
                        }
                    }
                }
                for(i=0;i<later_queue.length;i++){
                    later_queue[i]();
                }
                later_queue=[];
                need_clear && clear();
                need_draw && draw();
				
                need_clear=false;
                need_draw=false;
                requestAnimationFrame(arguments.callee);
            })();
    