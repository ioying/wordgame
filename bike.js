            var width  = 5;
            var height = 7;
			var kinds  = 5; 			//使用块种类 取值 2-7 默认7 越大越难
										//主流游戏目前多使用6 
			var gametype = 2;           // 1 计分  2 计时  3 消指定块 4 计步					
			var passscore = 15000; 		// 过关分数
			var passtime = 40; 		    // 剩余秒数
			var passsteps = 10; 		// 剩余步数
			var color1 = '#ff0000';		// 红  
			var color2 = '#8eeffd';		// 白（青 ） 
			//var color3 = '#e78e1a';		// 黄  
			var color4 = 'purple';		// 紫  #823fcc
			var color5 = '#327fc7';		// 青  
			var color6 = '#0fa647';		// 绿  
			var color7 = '#333333';		// 黑
			var color3 = '#333333';		// 黑
			var color9 = '#333333';		// 黑
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
						value:1,
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