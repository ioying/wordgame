			var show_tips=function(){   	//显示下一步提示
				var si,sj ,a,b,c,showstr;					//,k,a,b,c,stop,flag,ta,tb;
				showstr = '';
//				backpending = 0;
//				alert('w');
				for(si=0;si<width;si++){
                    for(sj=0;sj<height;sj++){
					
//					var value = back.data[si][sj].value ;
//						newvalue = value>1 ? value-1 : 0;
//						backpending += newvalue  ;
						a=get_type(si,sj);
//						ax=ax===undefined ? -1 : ax;
						if(check_in(si-1,sj+1) && check_in(si+1,sj+1)){
                            b=get_type(si-1,sj+1);
                            c=get_type(si+1,sj+1);
                            if(a==b && b==c){
								showstr = showstr +'('+si+'^_^'+sj+'),';
							} 
						}
						if(check_in(si-1,sj-1) && check_in(si+1,sj-1)){
                            b=get_type(si-1,sj-1);
                            c=get_type(si+1,sj-1);
                            if(a==b && b==c){
								showstr = showstr +'('+si+'_^_'+sj+'),';
							} 
						}
						if(check_in(si-2,sj-1) && check_in(si-1,sj-1)){
                            b=get_type(si-2,sj-1);
                            c=get_type(si-1,sj-1);
                            if(a==b && b==c){
								showstr = showstr +'('+si+'__V'+sj+'),';
							} 
						}
						if(check_in(si-2,sj+1) && check_in(si-1,sj+1)){
                            b=get_type(si-2,sj+1);
                            c=get_type(si-1,sj+1);
                            if(a==b && b==c){
								showstr = showstr +'('+si+'``A'+sj+'),';
							} 
						}						
						if(check_in(si+2,sj-1) && check_in(si+1,sj-1)){
                            b=get_type(si+2,sj-1);
                            c=get_type(si+1,sj-1);
                            if(a==b && b==c){
								showstr = showstr +'('+si+'V__'+sj+'),';
							} 
						}	
						if(check_in(si+2,sj+1) && check_in(si+1,sj+1)){
                            b=get_type(si+2,sj+1);
                            c=get_type(si+1,sj+1);
                            if(a==b && b==c){
								showstr = showstr +'('+si+'A``'+sj+'),';
							} 
						}							
						if(check_in(i,sj+2) && check_in(i,sj+3)){
                            b=get_type(i,sj+2);
                            c=get_type(i,sj+3);
                            if(a==b && b==c){
								showstr = showstr +'('+si+'A'+sj+'),';
							} 
						}
						if(check_in(i,sj-2) && check_in(i,sj-3)){
                            b=get_type(i,sj-2);
                            c=get_type(i,sj-3);
                            if(a==b && b==c){
								showstr = showstr +'('+si+'V'+sj+'),';
							} 
						}
						if(check_in(si+2,j) && check_in(si+3,j)){
                            b=get_type(si+2,j);
                            c=get_type(si+3,j);
                            if(a==b && b==c){
								showstr = showstr +'('+si+'>'+sj+'),';
							}
						}
						if(check_in(si-2,j) && check_in(si-3,j)){
                            b=get_type(si-2,j);
                            c=get_type(si-3,j);
                            if(a==b && b==c){
								showstr = showstr +'('+si+'<'+sj+'),';
							}
						}
						if(check_in(si-1,sj-1) && check_in(si-1,sj+1)){
                            b=get_type(si-1,sj-1);
                            c=get_type(si-1,sj+1);
                            if(a==b && b==c){
								showstr = showstr +'('+si+':<'+sj+'),';
							}
						}
						if(check_in(si+1,sj-1) && check_in(si+1,sj+1)){
                            b=get_type(si+1,sj-1);
                            c=get_type(si+1,sj+1);
                            if(a==b && b==c){
								showstr = showstr +'('+si+'>:'+sj+'),';
							}
						}
						if(check_in(si+1,sj-1) && check_in(si+1,sj-2)){
                            b=get_type(si+1,sj-1);
                            c=get_type(si+1,sj-2);
                            if(a==b && b==c){
								showstr = showstr +'('+si+'>_'+sj+'),';
							}

						}
						if(check_in(si+1,sj+1) && check_in(si+1,sj+2)){
                            b=get_type(si+1,sj+1);
                            c=get_type(si+1,sj+2);
                            if(a==b && b==c){
								showstr = showstr +'('+si+'>"'+sj+'),';
							}
						}						
						if(check_in(si-1,sj-1) && check_in(si-1,sj-2)){
                            b=get_type(si-1,sj-1);
                            c=get_type(si-1,sj-2);
                            if(a==b && b==c){
								showstr = showstr +'('+si+'_<'+sj+'),';
							}

						}
						if(check_in(si-1,sj+1) && check_in(si-1,sj+2)){
                            b=get_type(si-1,sj+1);
                            c=get_type(si-1,sj+2);
                            if(a==b && b==c){
								showstr = showstr +'('+si+'"<'+sj+'),';
							}
						}						
					}
				}
				if (showstr ==''){
					document.getElementById('tips').innerHTML="没有可移动的块！重新发牌"; 
				shuffle();
				}else{
					document.getElementById('tips').innerHTML="Tips:"+showstr;
				}	
			//	alert('showstr');
            };
			