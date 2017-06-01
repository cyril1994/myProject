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
    $("<div id='btnLeft' class='valign'></div>").appendTo("#banner");
    $("<div id='btnRight' class='valign'></div>").appendTo("#banner");
    $("#btnLeft").css({position:"absolute",zIndex:100,width:"50px",height:"126px",background:"#321400",top:"185px",textAlign:"center"});
    $("#btnRight").css({position:"absolute",zIndex:100,width:"50px",height:"126px",background:"#321400",top:"185px",right:0,textAlign:"center"});
    $("<div class='btnLeftInner'></div>").appendTo("#btnLeft");
    $("<div class='btnRightInner'></div>").appendTo("#btnRight");
    $(".btnLeftInner").css({width:"21px",height:"37px",background:"url(images/homeslide_arrow.png) no-repeat 0px -48px",verticalAlign:"middle",display:"inline-block"});
    $(".btnRightInner").css({width:"21px",height:"37px",background:"url(images/homeslide_arrow.png) no-repeat 0px 0px",verticalAlign:"middle",display:"inline-block"});
    var that=this;
    $("#banner").mouseover(function(){
    	that.stopChange();
    });
    $("#banner").mouseout(function(){
    	that.setGo();
    });
    $("#banner ul").delegate("li","mouseover",function(){
    	that.btnOver(this.value);
    	if(that.currentInOrd==that.currentOutOrd){
    		return;
    	}
    	that.fadeInOut();
		that.changeBtn();	
    });
    $("#btnLeft").click(function(){
    	that.btnLeft();
    	that.fadeInOut();
		that.changeBtn();	
    })
    $("#btnRight").click(function(){
    	that.btnRight();
    	that.fadeInOut();
		that.changeBtn();	
    })
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
	clearInterval(this.timer);
};
//鼠标移入按钮切换
slideshowObj.prototype.btnOver=function(ord){
	this.currentOutOrd=this.currentInOrd;
	this.currentInOrd=ord;
}
//鼠标左按钮点击切换
slideshowObj.prototype.btnLeft=function(){
	this.currentOutOrd=this.currentInOrd;
	this.currentInOrd=this.currentInOrd-1;
	if(this.currentInOrd==0){
		this.currentInOrd=this.amount;
	}
}
//鼠标右按钮点击切换
slideshowObj.prototype.btnRight=function(){
	this.currentOutOrd=this.currentInOrd;
	this.currentInOrd=this.currentInOrd+1;
	if(this.currentInOrd==7){
		this.currentInOrd=1;
	}
}
//热卖选项卡
var hotSale=document.getElementById("hotSale");
hotSale.children[2].style.cssText="position:absolute;left:80px;top:498px;transition:1s";
$("#hot_menu").delegate("li","mouseover",function(){
	for(var i=0;i<4;i++){
		hotSale.children[1].children[i].className="";
		hotSale.children[1].children[i].ord=i;
	}
	this.className="active";
	hotSale.children[2].style.left=(this.ord)*310+80+"px";
})
$(function(){
	new slideshowObj(6,1,0,"#000","#b29999",60000,2000);
});








