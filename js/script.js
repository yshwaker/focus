var setting = {
	workmin    : 25,
	breakmin   : 5,
	workcolor  : '#ff9311',
	breakcolor : '#87aa1e'
};

function setTimeFormat(min,sec)
{
	if(sec<10){
		return min + ":0" + sec;
	}else{
		return min + ":" + sec;
	}
}

var time ={
	min:setting.workmin,
	sec:0,
	status:false, //run or pause
	timerType:true, //break or work
	process:0, //percent of passed time

	currentPer:function()
	{
		if(this.timerType==true){
			return (this.min+this.sec/60)/setting.workmin;
		}else{
			return (this.min+this.sec/60)/setting.breakmin;
		}
	},

	run:function()
	{
		if(this.min==0&&this.sec==0){
			if(this.timerType==true){
				$(".break_note").css('display','block');
				this.min=setting.breakmin;
				this.timerType=false;
				myCanvas.currColor=setting.breakcolor;
				console.log("to break");
			}else{
				$(".work_note").css('display','block');
				this.min=setting.workmin;
				this.timerType=true;
				myCanvas.currColor=setting.workcolor;
				console.log("to work");
			}
			$('#ring')[0].play();
			this.status= false;
			$('#startandpause_btn').text("START");
			myCanvas.clearThem(myCanvas.width/2-90,myCanvas.width/2-30,180,60);
			this.process=0;
			myCanvas.animate(this.process,setTimeFormat(this.this.min,this.this.sec));
			return 0; 
		}
		if(this.sec==0){
			this.min=this.min-1;
		}
		this.sec = (this.sec+59)%60;
		myCanvas.clearThem(0,0,myCanvas.width,myCanvas.width);
		myCanvas.drawArc(0,this.currentPer());
		myCanvas.drawWord(setTimeFormat(this.min,this.sec));
		// $('#timer').text(setTimeFormat(this.min,this.sec));
		this.t=setTimeout('time.run()',1000);
	}

}

var myCanvas={
	currColor:setting.workcolor,
	canvas:$('canvas#timer')[0],
	ctx : $('canvas#timer')[0].getContext('2d'),
	width :$($('canvas#timer')[0]).attr('width'),

	drawArc:function(from,to){
		// ctx.clearRect(0,0,width,width);
		this.ctx.beginPath();
		this.ctx.arc(this.width/2,this.width/2,this.width/2-5,2*Math.PI*from,2*Math.PI*to,false);
		this.ctx.lineWidth=8;
		this.ctx.strokeStyle = this.currColor;  
		this.ctx.stroke();  
		console.log(this.width);
	},

	clearThem:function(x1,y1,x2,y2){
		this.ctx.clearRect(x1,y1,x2,y2);
	},

	drawWord:function(text){
		this.clearThem(myCanvas.width/2-90,myCanvas.width/2-30,180,60);
		this.ctx.beginPath();
		this.ctx.font = "bold 50pt Arial";  
		this.ctx.fillStyle = '#e33200';  
		this.ctx.textAlign = 'center';  
		this.ctx.textBaseline = 'middle';
		this.ctx.fillText(text, this.width/2, this.width/2);  
	},

	animate:function(process,text)
	{
			this.drawArc(process,process+1/120);
			process+=(1/130);
			if(process>1){
				this.drawWord(text);
				return;
			}
			setTimeout(function(){myCanvas.animate(process,text)},20);
	}
}



$(document).ready(function(){
	myCanvas.animate(0,setTimeFormat(time.min,time.sec));
})







$('#startandpause_btn').click(function(){
	// if(min==0&&sec==0){
	// 	if(timerType==true){
	// 		min=setting.breakmin;
	// 		timerType=false;
	// 	}else{

	// 	}
	$(".break_note").css('display','none');
	$(".work_note").css('display','none');
	//}
	if(time.status==true){
		clearTimeout(time.t);
		$('#startandpause_btn').text("RESUME");
		time.status = false;
		console.log('is running');
		return ;
	}
	$('#startandpause_btn').text("PAUSE");
	time.status=true;
	var timerStr = $('#timer');
	//var timerVal = storage.getworkTime() || setting.workmin;
	time.run();
	console.log('begin run');
})

$('#restart_btn').click(function(){
	time.process=time.currentPer();
	if(time.timerType==true){
		time.min = setting.workmin;
	}else{
		time.min = setting.breakmin;
	}
	time.sec = 0;
	myCanvas.animate(time.process,setTimeFormat(time.min,time.sec));
	$('#startandpause_btn').text("Start");
	clearTimeout(time.t);
	time.status=false;
})

$('#close').click(function(){
	window.close();
})

