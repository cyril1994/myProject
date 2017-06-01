"use strict";
//导航
$("nav ul").delegate("li","mouseover",function(){
	if(this.value!=4){
		$(this).children("a").children("span").css("border-bottom","1px solid #fff");
	}
	console.log(typeof this.innerText);
	if(this.value==1){	
		$("#nav2_1").css("display","block");
		for(var i=0;i<3;i++){
			$("#nav2_"+(i+1)).css("zIndex","1");
		}
		$("#nav2_1").css("zIndex","100");
	}
	if(this.value==2){
		$("#nav2_2").css("display","block");
		for(var i=0;i<3;i++){
			$("#nav2_"+(i+1)).css("zIndex","1");
		}
		$("#nav2_2").css("zIndex","100");
	}
	if(this.value==3){
		$("#nav2_3").css("display","block");
		for(var i=0;i<3;i++){
			$("#nav2_"+(i+1)).css("zIndex","1");
		}
		$("#nav2_3").css("zIndex","100");
	}
});
$("nav ul").delegate("li","mouseout",function(){
	$(this).children("a").children("span").css("border-bottom","none");
});
$("nav").mouseleave(function(){
	$("nav ul li a span").css("border-bottom","none")
	$(this).children("div").css("display","none");	
});
//banner轮播图
var bannerBtnFont=["YES TO ALL","Clot","玩转TEE时代","NIKE Flyknit","不是谁都懂","纯白当道"]
function slideshowObj(amount,currentInOrd,currentOutOrd,colorH,colorL,timeSpace1,timeSpace2){
	this.amount=amount;
	this.currentInOrd=currentInOrd;
	this.currentOutOrd=currentOutOrd;
	this.colorH=colorH;
	this.colorL=colorL;
	this.timeSpace1=timeSpace1;
	this.timer=null;
	this.timeSpace2=timeSpace2;
	this.init();
}
//界面初始化
slideshowObj.prototype.init=function(){
	for(let i=0;i<this.amount;i++){
		$("<img src=images/banner"+(i+1)+".jpg />").appendTo("#banner"); 
    }
    $("#banner img").css({position:"absolute",display:"none",width:"100%",height:"491px"});
    $("#banner img:first").css("display","block");
    	$("<ul id='btn'></ul>").appendTo("#banner");
    	$("#banner #btn").css({position:"absolute",zIdex:100,top:"511px",height:"48px",width:"660px",
    	marginLeft:"293px"})
    for(let j=0;j<this.amount;j++){
    	$("<li value="+(j+1)+">"+bannerBtnFont[j]+"</li>").appendTo("#btn");
    	$("#banner #btn li").css({color:this.colorL,
    		float:"left",margin:"0 13px 0 13px",textAlign:"center",borderTop:"none",
    	font:"18px/33px ''"});
    }
    $("#banner #btn li:first").css({color:"#000",borderTop:"1px solid #000"});
    var that=this;
    $("#banner img").mouseenter(function(){
    	that.stopChange();
    });
    $("#banner img").mouseleave(function(){
    	that.setGo();
    });
    $("#banner ul").delegate("li","mouseenter",function(){
    	that.btnOver(this.value);
    	that.stopChange();
    	if(that.currentInOrd==that.currentOutOrd){
    		return;
    	}
    	that.fadeInOut();
		that.changeBtn();
		
    });
     $("#banner ul").delegate("li","mouseleave",function(){
     	that.setGo();
     	});
    this.setGo();
};
//图片切换定时器
slideshowObj.prototype.setGo=function(){
	var that=this;
	this.timer=setInterval(function(){
		that.goStep();
	},that.timeSpace1);
};
//序号切换处理
slideshowObj.prototype.goStep=function(){
	this.currentInOrd++;
	this.currentOutOrd=this.currentInOrd-1;
	if(this.currentInOrd>this.amount){
		this.currentInOrd=1;
	}
	if(this.currentOutOrd<0){
		this.currentOutOrd=this.amount;
	}
	this.fadeInOut();//调用淡入淡出函数
	this.changeBtn();//调用切换按钮函数
};
//淡入淡出函数
slideshowObj.prototype.fadeInOut=function(){
	//var that=this;
	$("#banner img").eq(this.currentInOrd-1).fadeIn(this.timeSpace2);
	$("#banner img").eq(this.currentOutOrd-1).fadeOut(this.timeSpace2);
};
slideshowObj.prototype.changeBtn=function(){
	$("#banner #btn li").css({color:this.colorL,borderTop:"none"});
	$("#banner #btn li").eq(this.currentInOrd-1).css({color:"#000",borderTop:"1px solid #000"});	
};
//鼠标悬停停止动画
slideshowObj.prototype.stopChange=function(){
	console.log(this.timer);
	clearInterval(this.timer);
};
//鼠标移入按钮切换
slideshowObj.prototype.btnOver=function(ord){
	this.currentOutOrd=this.currentInOrd;
	this.currentInOrd=ord;
}
$(function(){
	new slideshowObj(6,1,0,"#000","#b29999",3000,3000);
});








