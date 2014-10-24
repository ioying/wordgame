    
		
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
            var width  = 8;
            var height = 8;
			var CardWidth = 100;
			var CardHeight = 44;
			var WidthGap1 = 6 ; 		// 宽度边缘空白1
			var WidthGap2 = 12 ;		// 宽度边缘空白2
			var HeightGap1 = 16 ;		// 高度边缘空白1
			var HeightGap2 = 8 ;		// 高度边缘空白2
            var canvas=document.getElementById("game");
            var canvas_width=canvas.width=20+width*CardWidth;
            var canvas_height=canvas.height=40+height*CardHeight;
			var context=canvas.getContext("2d");
            var need_draw=false;
            var need_clear=false;
            context.lineWidth=1;
            var map={
                locked:false,
                data:[]
            };
            for(i=0;i<width;i++){
                map.data[i]=[];
                for(j=0;j<height;j++){
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
            var reset=function(){
                var i,j;
                for(i=0;i<width;i++){
                    for(j=0;j<height;j++){
                        reset_single(i,j);
                    }
                }
            };
            var reset_single=function(i,j){
                var data=map.data[i][j];
                data.type=0;
                data.moving=false;
                data.selected=false;
                data.move=null;
                data.step=0;
                data.offset.x=0;
                data.offset.y=0;
            };
            var random=function(){
                return Math.floor(Math.random()*7)+1;
            };
 //           var shuffle=function(){
 //               var i,j;
 //               for(i=0;i<width;i++){
 //                   for(j=0;j<height;j++){
 //                       map.data[i][j].type=random();
//						map.data[i][j].text=random();
//                    }
//                }
//            };
            var check_in=function(i,j){
                return i>=0 && i<width && j>=0 && j<height;
            };
            var is_moving=function(i,j){
                return map.data[i][j].moving;
            };
            var get_type=function(i,j){
                return map.data[i][j].type;
            };
            var clear=function(ax,ay,bx,by){
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
                for(i=0;i<pos.length;i++){
                    reset_single(pos[i][0],pos[i][1]);
                }
                drop();
                return [ret,fa,fb];
            };
            var swap=function(i1,j1,i2,j2){
                var t=map.data[i1][j1];
                map.data[i1][j1]=map.data[i2][j2];
                map.data[i2][j2]=t;
            };
            var start_move=function(i,j,type,to,step,func){
                if(type!="x" && type!="y"){
                    return;
                }
                step=Math.abs(step)*0.2;
                var data=map.data[i][j];
                var count=0;
                var all;
                data.moving=true;
                if(type=="x"){
                    all=Math.abs(to-data.offset.x)/step;
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
                                map.data[i][j].offset.y=-len;
                                start_move(i,j,"y",0,18); //16
                            }
                            break;
                        }
                        for(stop=start+1;stop<height && map.data[i][stop].type!=0;stop++);
                        for(;start<stop;j++,start++){
                            swap(i,j,i,start);
                            map.data[i][j].offset.y=-len;
                            start_move(i,j,"y",0,28);
                        }
                    }
                }
            };
            var draw=function(){
                var i,j;
                context.clearRect(0,0,canvas_width,canvas_height);
                for(i=0;i<width;i++){
                    for(j=0;j<height;j++){
                        if((i+j)%2==0){
                            context.fillStyle="rgba(255,255,255,0.35)";
						 
                        }else{
                            context.fillStyle="rgba(255,255,255,0.25)";
						 
                        }
                        context.fillRect(WidthGap1+i*CardWidth,36+(height-j-1)*CardHeight,CardWidth,CardHeight);
						strokeStyle="#adadad";//;"rgba(0,0,0,0.2)"
						context.strokeRect(WidthGap1+i*CardWidth,36+(height-j-1)*CardHeight,CardWidth,CardHeight);
                    }
                }
                for(i=0;i<width;i++){
                    for(j=0;j<height;j++){
                        draw_single(i,j);
                    }
                }
            };
			

			
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
            var draw_single=function(x,y){
                var data=map.data[x][y];
				var showtext = data.text;
                var ax=WidthGap1+x*CardWidth+data.offset.x+CardWidth/2;
                var ay=26+(height-y-1)*CardHeight+data.offset.y+32;
                var type=data.type;
                context.strokeStyle="black";
                context.beginPath();
                switch(type){
                    case 1:
					context.drawImage(img1,ax-(CardWidth/2)+WidthGap1/2,ay-(CardHeight/2)+HeightGap2/2,CardWidth-WidthGap1,CardHeight-HeightGap2);
                        context.fillStyle="#cc0033"; 	//rgba(255,0,0,0.6)
                        break;
                    case 2:
					context.drawImage(img3,ax-(CardWidth/2)+WidthGap1/2,ay-(CardHeight/2)+HeightGap2/2,CardWidth-WidthGap1,CardHeight-HeightGap2);
						context.fillStyle="#555555";	//white
                        break;
                    case 3:
					context.drawImage(img6,ax-(CardWidth/2)+WidthGap1/2,ay-(CardHeight/2)+HeightGap2/2,CardWidth-WidthGap1,CardHeight-HeightGap2);
						context.fillStyle="#993333"; 	//yellow
                        break;
                    case 4:
					context.drawImage(img7,ax-(CardWidth/2)+WidthGap1/2,ay-(CardHeight/2)+HeightGap2/2,CardWidth-WidthGap1,CardHeight-HeightGap2);
						context.fillStyle="purple";
                        break;
                    case 5:
					context.drawImage(img3,ax-(CardWidth/2)+WidthGap1/2,ay-(CardHeight/2)+HeightGap2/2,CardWidth-WidthGap1,CardHeight-HeightGap2);
						context.fillStyle="#005abb"; 	//blue 0085cf
                        break;
                    case 6:
					context.drawImage(img4,ax-(CardWidth/2)+WidthGap1/2,ay-(CardHeight/2)+HeightGap2/2,CardWidth-WidthGap1,CardHeight-HeightGap2);
					    context.fillStyle="orange"; 	//fe4819
						break;
                    case 7:
					context.drawImage(img6,ax-(CardWidth/2)+WidthGap1/2,ay-(CardHeight/2)+HeightGap2/2,CardWidth-WidthGap1,CardHeight-HeightGap2);
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
						context.strokeStyle = "#adadad";
//						context.strokeText(showword[data.type][data.lang],ax,ay+4);  
						context.fillText(showword[data.type][data.lang],ax,ay+4); 
						context.shadowColor="rgba(0,0,0,0.4)";
                        context.shadowOffsetX=2;
                        context.shadowOffsetY=2;
                        context.shadowBlur=2;		
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
                            start_move(opos[0],opos[1],ts,CardHeight*tt,18,func);
                            start_move(pos[0],pos[1],ts,-CardHeight*tt,18,func);
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
    