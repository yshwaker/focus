var data = {
        'workTime': null,
        'interval': null
      };
var min = 25;
var sec = 0;
var timerStatus=false;
var t;

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
		return 0;
	}
	if(sec==0){
		min=min-1;
	}
	sec = (sec+59)%60;
	//console.log(setTimeFormat(min,sec));
	$('#timer_str').text(setTimeFormat(min,sec));
	t=setTimeout('run()',1000);
}

$('#startandpause_btn').click(function(){
	if(timerStatus==true){
		 clearTimeout(t);
		 $('#startandpause_btn').text("RESUME");
		 timerStatus = false;
		 return ;
	}
	$('#startandpause_btn').text("PAUSE");
	timerStatus=true;
	var timerStr = $('#timer_str');
	//var timerVal = storage.getworkTime() || 25;
	timerStr.text("25:00");
	run();
})

$('#restart_btn').click(function(){
	min = 25;
	sec = 0;
	 $('#startandpause_btn').text("Start");
	$('#timer_str').text(setTimeFormat(min,sec));
	clearTimeout(t);
	timerStatus=false;
})