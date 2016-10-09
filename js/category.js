/*分类页面滑动*/
(function(){
	catefory('category-left-box','category-left');
	catefory('content-right-box','content-right');
})();
function catefory(parent,child){
	var oJd_topBar=document.getElementById('jd-topBar');
	var parent_box=document.getElementById(parent);
	var child_box=parent_box.getElementsByClassName(child)[0];
	var aLi=child_box.getElementsByTagName('li');
	var parent_height=parent_box.offsetHeight-oJd_topBar.offsetHeight;
	var child_height=child_box.offsetHeight;
	var iHeight=parent_height-child_height;
	console.log('height:'+iHeight)
	var startY=0;
	var disY=0;
	var moveY=0
	var lastY=0;
	var startTime=0;
	var endTime=0;
	child_box.addEventListener('touchstart',function(ev){
		startTime=new Date().getTime();
		startY=ev.touches[0].clientY;
	},false);

	child_box.addEventListener('touchmove',function(ev){
		//currtY=child_box.style.transform.match(/\d+/g);
		moveY=ev.touches[0].clientY;
		disY=startY-moveY; //>0 向上滑,<0向下滑
		if (-disY+lastY<=150 && -disY+lastY>=0) {
			removetransition(child_box);
			addtransform(child_box,-disY+lastY);
		}
		else if(-disY+lastY>=iHeight-150 && -disY+lastY<=0){
			removetransition(child_box);
			addtransform(child_box,-disY+lastY);
		}
	},false);

	child_box.addEventListener('touchend',function(ev){
			if(-disY+lastY>0){
				addtransition(child_box,0.3);
				addtransform(child_box,0);
				lastY=0;
			}
			else if(-disY+lastY<=iHeight){     
				
				addtransition(child_box,0.3);
				addtransform(child_box,iHeight);
				lastY=iHeight;
				console.log('lastY3:'+lastY)
			}
			else if(-disY+lastY<0 && -disY+lastY>iHeight){
				
				addtransform(child_box,-disY+lastY);
				lastY=-disY+lastY;
			}
			moveY=0;
			endTime=new Date().getTime();
			console.log(moveY);
			if(endTime-startTime<=150 && moveY==0){
				var thisLi=ev.target.parentNode;
				console.log(thisLi);
				for(var i=0;i<aLi.length;i++){
					aLi[i].index=i;
					aLi[i].className='';
				}
				thisLi.className='active';
				if(thisLi.index*50>-iHeight){
						thisLi.index=-iHeight/50;
				}
				addtransition(child_box,0.3);
				addtransform(child_box,-thisLi.index*50);
				lastY=-thisLi.index*50;
				console.log('lastY2:'+lastY)
				}
			
		
		
	},false);

transitionend(child_box);

	function addtransition(obj,sec){
		obj.style.transition=sec+'s';
		obj.style.webkitTransition=sec+'s';
	}
	function removetransition(obj){
		obj.style.transition='none';
		obj.style.webkitTransition='none';
	}
	function transitionend(obj){
		obj.addEventListener('transitionend',function(){
			console.log('完了')
				removetransition(obj);
				
		},false)
	}
	function addtransform(obj,dis){
		obj.style.transform='translateY('+dis+'px)';
		obj.style.webkitTransform='translateY('+dis+'px)';
	}
}