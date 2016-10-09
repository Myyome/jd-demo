
/*头部搜索框滑动*/
(function(){
	var oHeader_box=document.getElementById('jd-header').getElementsByClassName('jd-header-box')[0];
	var oCarousel=document.getElementById('carousel');
	window.onscroll=function(){
		var scrollTop=document.body.scrollTop;
		var iHeight=oCarousel.offsetHeight;
		if (scrollTop>iHeight) {
			oHeader_box.style.backgroudColor='rgba(201,21,35,0.85)';
		}
		else{
			var op=scrollTop/iHeight*0.85;
			oHeader_box.style.backgroudColor='rgba(201,21,35,'+op+')';
			console.log(oHeader_box.style.backgroudColor);
		}
	}
})();

/*倒计时*/
(function(){
	var oTime=document.getElementsByClassName('time')[0];
	var aSum=oTime.getElementsByClassName('num');
	var data=7*60*60; //秒
	setInterval(time,1000);
	time();
	function time(){
		data--;
		var h=Math.floor(data/3600);
		var m=Math.floor(data/60%60);
		var s=Math.floor(data%3600%60);
		aSum[0].innerHTML=toshi(h).charAt(0);
		aSum[1].innerHTML=toshi(h).charAt(1);
		aSum[2].innerHTML=toshi(m).charAt(0);
		aSum[3].innerHTML=toshi(m).charAt(1);
		aSum[4].innerHTML=toshi(s).charAt(0);
		aSum[5].innerHTML=toshi(s).charAt(1);
	}

	function toshi(num){
		if (num>9) {
			return num +'';
		}
		else{
			return '0'+num;
		}
	}
})();

/*轮播图*/
(function(){
	var oCarousel=document.getElementById('carousel');
	var oUl=oCarousel.getElementsByTagName('ul')[0];
	var aImgList=oUl.getElementsByTagName('li');
	var width=aImgList[0].offsetWidth;
	var aPointList=oCarousel.getElementsByTagName('ol')[0].getElementsByTagName('li');
	var timer=null;
	var index=1;
	var disX=0;
	var lastX=-width; //当定时器还没有开始执行的时候
	var value=1;
	timer=setInterval(autoplay,3000);
	function autoplay(){
		index++;
		addtransition(oUl,0.3);
		addtransform(oUl,-index*width);
		lastX=-index*width; //记录定时器中transform走过的距离
		addactive(aPointList);
		console.log('i'+index)
	}
	transitionend(oUl);
	oCarousel.addEventListener('touchstart',function(ev){
		clearInterval(timer);
		var startX=ev.touches[0].clientX;
		oCarousel.addEventListener('touchmove',function(ev){
			console.log('上一次'+lastX)
			var moveX=ev.touches[0].clientX;
			disX=startX-moveX; //>0向左滑，<0向右滑
			removetransition(oUl);
			addtransform(oUl,-disX+lastX);  //-disX ：记录上一次的坐标
		});
	});
	oCarousel.addEventListener('touchend',function(){
					moveX=0; 
				if(Math.abs(disX)>width/3 && disX>0){
					value=1;
					index+=value;
				}
				else if(Math.abs(disX)>width/3 && disX<0){
					value=-1;
					index+=value;
				}
					addtransition(oUl,0.3);
					addtransform(oUl,-index*width);
					lastX=-index*width;
					console.log(index);
				addactive(aPointList);
				timer=setInterval(autoplay,3000);

	});
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
			//console.log('玩')
			if(index>8){
				index=1;
			}
			else if(index<=0){
				index=8;
			}
				removetransition(oUl);
				addtransform(oUl,-index*width);
				lastX=-index*width;
			//console.log(oUl.style.transform)
			//console.log(index)
		},false)
	}
	function addtransform(obj,dis){
		obj.style.transform='translateX('+dis+'px)';
		obj.style.webkitTransform='translateX('+dis+'px)';
	}
	function addactive(obj){
		for(var i=0;i<obj.length;i++){
			obj[i].className='';
		}
		Index=index-1;
		if(Index>7){
			Index=0;
		}
		if (Index<0) {
			Index=7;
		}
		obj[Index].className='active';
		console.log(Index);
	}
})();