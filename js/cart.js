(function(){
	var aShopBuy=document.getElementsByClassName('shop-buy-box');
	var oCalc=document.getElementsByClassName('calc')[0];
	var oQx=oCalc.getElementsByTagName('i')[0];
	var va=true;
	for (var i = 0; i < aShopBuy.length; i++) {
		 aShopBuy[i].getElementsByClassName('icon-check')[0].onclick=function(){
		 	var hasChecked=this.getAttribute('checked');
		 	if(hasChecked!=null){
		 		this.removeAttribute('checked');
		 	}
		 	else{
		 		this.setAttribute('checked','');
		 	}
		 };
	}
			oQx.onclick=function(){
			 	for (var i = 0; i < aShopBuy.length; i++) {
			 		if(va){
			 			aShopBuy[i].getElementsByClassName('icon-check')[0].setAttribute('checked','');
			 			
			 		}
			 		else{
			 			aShopBuy[i].getElementsByClassName('icon-check')[0].removeAttribute('checked');
			 			
			 		}
			 		
			 	}
		 	va=!va;
		 	var hasChecked=this.getAttribute('checked');
		 	if(hasChecked!=null){
		 		this.removeAttribute('checked');
		 	}
		 	else{
		 		this.setAttribute('checked','');
		 	}
		 }
})();


(function(){
	var aDel=document.getElementsByClassName('del');
	var oWin=document.getElementById('jd-win');
	var oWin_box=oWin.getElementsByClassName('alert-box')[0];
	var clientHeight=document.documentElement.clientHeight;
	for(var i=0;i<aDel.length;i++){
		aDel[i].onclick=function(){
			oWin.style.display='block';
			var scrollTop=document.body.scrollTop;
			var oWin_box_height=oWin_box.offsetHeight;
			console.log(clientHeight)
			oWin_box.style.transition='0.3s ease';
			oWin_box.style.opacity=1;
			oWin_box.style.transform='translateY('+(clientHeight/2-oWin_box_height/2+scrollTop)+'px)';
		}
	}
})();