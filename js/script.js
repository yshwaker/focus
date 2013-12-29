// var data = {
// 	'workTime': null,
// 	'interval': null
// };
var WORKMIN =2;
var BREAKMIN =1;
var WORKCOLOR= '#ff9311';
var BREAKCOLOR = '#87aa1e';
var currColor = WORKCOLOR;
var min = 0;
var sec = 10;
//run or pause
var timerStatus=false;
//break or work
var timerType= true;
var process=0;
var canvas =$('canvas#timer')[0];
var ctx = canvas.getContext('2d');
var width=$(canvas).attr('width');


$(document).ready(function(){
	drawAnime();
})


function setTimeFormat(min,sec)
{
	if(sec<10){
		return min + ":0" + sec;
	}else{
		return min + ":" + sec;
	}

}

function run()
{
	if(min==0&&sec==0){
		if(timerType==true){
			$(".break_note").css('display','block');
			min=BREAKMIN;
			timerType=false;
			currColor=BREAKCOLOR;
		}else{
			$(".work_note").css('display','block');
			min=WORKMIN;
			timerType=true;
			currColor=WORKCOLOR;
			console.log("work");
		}
		$('#ring')[0].play();
		timerStatus= false;
		$('#startandpause_btn').text("START");
		ctx.clearRect(width/2-90,width/2-30,180,60);
		process=0;
		drawAnime();
		return 0; 
	}
	if(sec==0){
		min=min-1;
	}
	sec = (sec+59)%60;
	drawTimer(setTimeFormat(min,sec));
	// $('#timer').text(setTimeFormat(min,sec));
	t=setTimeout('run()',1000);
}

function currentPer()
{
	if(timerType==true){
		return (min+sec/60)/WORKMIN;
	}else{
		return (min+sec/60)/BREAKMIN;
	}


}




function drawAnime()
{
	ctx.beginPath();
	ctx.arc(width/2,width/2,width/2-5,2*Math.PI*process,2*Math.PI*(process+1/120),false);
	process+=(1/130);
	ctx.lineWidth=8;
	ctx.strokeStyle = currColor;  
	ctx.stroke();   
	if(process>1){
		ctx.font = "bold 50pt Arial";  
		ctx.fillStyle = '#e33200';  
		ctx.textAlign = 'center';  
		ctx.textBaseline = 'middle';  
		ctx.fillText(setTimeFormat(min,sec), width/2, width/2);
		return;
	}
	setTimeout('drawAnime()',20);
}

function drawTimer(text)
{
	ctx.clearRect(0,0,width,width);
	ctx.beginPath();
	// ctx.moveTo(width/2,width/2);
	ctx.arc(width/2,width/2,width/2-5,0,2*Math.PI*currentPer(),false);
	ctx.lineWidth=8;
	ctx.strokeStyle = currColor;  
	ctx.stroke();  

	ctx.font = "bold 50pt Arial";  
	ctx.fillStyle = '#e33200';  
	ctx.textAlign = 'center';  
	ctx.textBaseline = 'middle';  
	// ctx.moveTo(width/2, width/2);
	ctx.fillText(text, width/2, width/2);  
}

$('#startandpause_btn').click(function(){
	// if(min==0&&sec==0){
	// 	if(timerType==true){
	// 		min=BREAKMIN;
	// 		timerType=false;
	// 	}else{

	// 	}
	$(".break_note").css('display','none');
	$(".work_note").css('display','none');
	//}
	if(timerStatus==true){
		clearTimeout(t);
		$('#startandpause_btn').text("RESUME");
		timerStatus = false;
		return ;
	}
	$('#startandpause_btn').text("PAUSE");
	timerStatus=true;
	var timerStr = $('#timer');
	//var timerVal = storage.getworkTime() || WORKMIN;
	run();
})

$('#restart_btn').click(function(){
	process=currentPer();
	if(timerType==true){
		min = WORKMIN;
	}else{
		min = BREAKMIN;
	}
	sec = 0;
	ctx.clearRect(width/2-90,width/2-30,180,60);
	drawAnime();
	$('#startandpause_btn').text("Start");
	$('#timer').text(setTimeFormat(min,sec));
	clearTimeout(t);
	timerStatus=false;
})

$('#close').click(function(){
	window.close();
})

