$.extend({
	loop:function (container,list,list_li,dot,dot_li,pre,next){
			var num = list_li.length
			var width = container.width()
			var copy = list_li.eq(0).clone(true)
			copy.appendTo(list)
			var index = 0;
			var timer;
			if(dot){
				dot_li.eq(0).css('background','rgba(255,255,255,.8)')
			}
			
			function move(){
				if(index==-1){
					index=num-1;
					list.css('left',-num*width)
				}
				if(index==(num+1)){
					list.css('left',0)
					index=1;
				}
				if(dot){
					if(index==num){
						changeDot(0);
					}else{
						changeDot(index);
					}
				}
				
				list.stop().animate({left:-index*width},1000,function (){
					clearInterval(timer)
					timer = setTimeout(function (){
						index++
						move(index)
					},3000)
				})
			}
			
			timer = setTimeout(function (){
				index++
				move(index)
			},3000)
			
			if(dot){
				function changeDot(index){
					for(var i = 0;i < dot_li.length;i++){
						dot_li.eq(i).css('background','rgba(255,255,255,.3)')
					}
					dot_li.eq(index).css('background','rgba(255,255,255,.8)')
				}
			}

			if(dot){
				dot_li.click(function (){
					index = $(this).index()
					clearTimeout(timer)
					move()
				})
			}

			if(pre){
				pre.click(function (){
					clearTimeout(timer)
					index--
					move()
				})
			}
			
			if(next){
				next.click(function (){
					clearTimeout(timer)
					index++
					move()
				})
			}
			
			if(next&&pre){
				container.mouseenter(function (){
					pre.show()
					next.show()
				})
			}
			

			if(next&&pre){
				container.mouseleave(function (){
					pre.hide()
					next.hide()
				})
			}
			
		}
})