function addEventHandler(ele, event, hanlder) {
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder, false);
    } else if (ele.attachEvent) {
        ele.attachEvent("on"+event, hanlder);
    } else  {
        ele["on" + event] = hanlder;
    }
}

var selectMonth = document.getElementById('month'),
	selectYear = document.getElementById('year'),
	myCalendar = document.getElementById('calendar'),
	myWrap = document.getElementById('wrap'),
	myMask = document.getElementById('mask'),
	getMyMonth = '', getMyYear = '',
	myDayArr = [],
	tdArr = document.getElementsByTagName('tbody')[0].getElementsByTagName('td'),
	inputDiv = document.getElementById('inputDay'),
	inputValue = inputDiv.getElementsByTagName('input')[0],
	firstDay = new Date();
var k = 0;
var monthText = '', yearText = '';

window.onload = function () {
	renderMY();//初始化
	addEventHandler(inputDiv,'click',ctrWrap);//显示与隐藏日历
	addEventHandler(myMask,'click',function () {
		myWrap.style.display = 'none';
		myMask.style.display = 'none';
		k++;
	});
	addEventHandler(myWrap,'change',function () {
		changeCalendar(selectYear.value,selectMonth.value);
	});//自选年月
	addEventHandler(myCalendar,'click',chooseDay);
}

//显示与隐藏wrap
function ctrWrap() {
	k++;
	if (k%2 == 0) {
		myWrap.style.display = 'none';
		myMask.style.display = 'none';
	} else {
		myWrap.style.display = 'block';
		myMask.style.display = 'block';
	}
}

//初始化填充年月
function renderMY() {
	for (var i = 0; i < 11; i++) {
		monthText += '<option>' + (i+1) + '月</option>';
	}
	selectMonth.innerHTML = monthText;
	for (var i = 1992; i < 2112; i++) {
		yearText += '<option>' + i + '</option>';
	}
	selectYear.innerHTML = yearText;
	var d = new Date();
	init(d.getFullYear(),d.getMonth()+1);
	var optionMonth = selectMonth.getElementsByTagName('option');
	for (var i = 0; i < optionMonth.length; i++) {
		if (parseInt(optionMonth[i].innerHTML) == d.getMonth()+1) {
			console.log(optionMonth[i]);
			optionMonth[i].selected = 'selected';
		}
	}
	var optionYear = selectYear.getElementsByTagName('option');
	for (var i = 0; i < optionYear.length; i++) {
		if (optionYear[i].innerHTML == d.getFullYear()) {
			console.log(optionYear[i]);
			optionYear[i].selected = 'selected';
		}
	}
	var optionDay = myCalendar.getElementsByTagName('td');
	for (var i = 0; i < optionDay.length; i++) {
		if (optionDay[i].innerHTML == d.getDate()) {
			optionDay[i].className = 'choose'; 
		}
	}
}

//选择年月
function changeCalendar(year,month) {
	for (var i = 0; i < tdArr.length; i++) {
		tdArr[i].innerHTML = '';
		tdArr[i].className = '';
	}
	getMyYear = year;
	getMyMonth = parseInt(month);
	//怎么获得某年某月的所有天
	init(getMyYear,getMyMonth);
}

//显示某年某月的日历
function init(myYear,myMonth) {
	firstDay.setFullYear(myYear,myMonth-1,1);
	var weekday = firstDay.getDay();//获取某年某月第一天是星期几	
	for (var d = 1; d <= 31; d++) {//循环31次
		var tempDay = new Date();
		tempDay.setFullYear(myYear,myMonth-1,d);
		if (tempDay.getMonth() == myMonth-1) {
			myDayArr.push(tempDay);
			tdArr[weekday+1].innerHTML = tempDay.getDate();
			weekday++;
		}
	}
	for (var i = 0; i < tdArr.length; i++) {
		if (!tdArr[i].innerHTML) {
			tdArr[i].className = 'hide';
		}
		if (firstDay.getDay() == 6) {
			for (var j = 0; j < 7; j++) {
				tdArr[j].className = 'firsthide';
			}			
		}
	}
}

//选择日期、返回日期
function chooseDay() {
	if (event.target.tagName == 'TD') {
		var m = '', d = '';
		m = selectMonth.value[0] < 10 ? '0'+selectMonth.value[0] : selectMonth.value[0];
		d = event.target.innerHTML < 10 ? '0'+event.target.innerHTML : event.target.innerHTML;
		var chooseDate = selectYear.value + '-' + m + '-' + d;
		inputValue.value = chooseDate;
		myWrap.style.display = 'none';
		myMask.style.display = 'none';
		k++;
	}
}