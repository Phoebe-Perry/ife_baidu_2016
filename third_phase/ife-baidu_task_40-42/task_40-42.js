function addEventHandler(ele, event, hanlder) {
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder, false);
    } else if (ele.attachEvent) {
        ele.attachEvent("on"+event, hanlder);
    } else  {
        ele["on" + event] = hanlder;
    }
}
function removeEventHandler(ele, event, hanlder) {
    if (ele.removeEventListener) {
        ele.removeEventListener(event, hanlder, false);
    } else if (ele.detachEvent) {
        ele.detachEvent("on"+event, hanlder);
    } else  {
        ele["on" + event] = null;
    }	
}

var selectMonth = document.getElementById('month'),
	selectYear = document.getElementById('year'),
	myCalendar = document.getElementById('calendar'),
	myWrap = document.getElementById('wrap'),
	wrapBtn = myWrap.getElementsByTagName('div'),
	myMask = document.getElementById('mask'),
	chooseDays = document.getElementById('choose_days'),
	multipleDays = chooseDays.getElementsByTagName('button')[0],
	singleDays = chooseDays.getElementsByTagName('button')[1],
	getMyMonth = '', getMyYear = '',
	myDayArr = [],
	tdArr = document.getElementsByTagName('tbody')[0].getElementsByTagName('td'),
	inputDiv = document.getElementById('inputDay'),
	inputValue = inputDiv.getElementsByTagName('input')[0],
	firstDay = new Date();
var k = 0;
var monthText = '', yearText = '', chooseDateArr = [];
var MIN_GAP = 1, MAX_GAP = 10;

window.onload = function () {
	renderMY();//初始化
	addEventHandler(inputDiv,'click',ctrWrap);//显示与隐藏日历
	addEventHandler(myMask,'click',function () {
		myWrap.style.display = 'none';
		myMask.style.display = 'none';
		k++;
	});

	addEventHandler(wrapBtn[0],'click',function () {
		if (parseInt(selectMonth.value) > 1) {
			selectMonth.value = parseInt(selectMonth.value)-1 + '月';
		} else {
			selectMonth.value = 12 + '月';
			selectYear.value--;
		}
		changeCalendar(selectYear.value, parseInt(selectMonth.value));
	});
	addEventHandler(wrapBtn[1],'click',function () {
		if (parseInt(selectMonth.value) < 12) {
			selectMonth.value = parseInt(selectMonth.value)+1 + '月';
		} else {
			selectMonth.value = 1 + '月';
			selectYear.value++;
		}		
		changeCalendar(selectYear.value,parseInt(selectMonth.value));		
	});
	//以下：默认选择一个日期
	addEventHandler(myCalendar,'click',chooseSingleDay);
	addEventHandler(chooseDays,'click',function () {
		myWrap.style.display = 'block';
		myMask.style.display = 'block';
		multipleDays.disabled = '';
		singleDays.disabled = '';
		event.target.disabled = 'disabled';
		if (event.target.nextElementSibling) {
			removeEventHandler(myCalendar,'click',chooseMultipleDay);
			addEventHandler(myCalendar,'click',chooseSingleDay);
		} else {
			removeEventHandler(myCalendar,'click',chooseSingleDay);
			addEventHandler(myCalendar,'click',chooseMultipleDay);
		}
	});

	addEventHandler(myWrap,'change',function () {
		changeCalendar(selectYear.value,selectMonth.value);
	});//自选年月
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
	for (var i = 0; i < 12; i++) {
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
			optionMonth[i].selected = 'selected';
		}
	}
	var optionYear = selectYear.getElementsByTagName('option');
	for (var i = 0; i < optionYear.length; i++) {
		if (optionYear[i].innerHTML == d.getFullYear()) {
			optionYear[i].selected = 'selected';
		}
	}
	var optionDay = myCalendar.getElementsByTagName('td');
	for (var i = 0; i < optionDay.length; i++) {
		if (optionDay[i].innerHTML) {
			optionDay[i].onmouseover = function () {
				event.target.style.backgroundColor = '#FFEFD5';
				event.target.style.border = '1px solid #FF8C00';
			}
			optionDay[i].onmouseout = function () {
				event.target.style.backgroundColor = '#eee';
				event.target.style.border = '1px solid #ccc';
			}
			if (optionDay[i].innerHTML == d.getDate()) {
				optionDay[i].onmouseout = null;
				optionDay[i].className = 'choose';
			}	
		}
	}
}//感觉这个函数写的好长好麻烦……

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
function chooseSingleDay() {
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
//选择一段时间
function chooseMultipleDay() {
	if (event.target.tagName == 'TD') {
		var m = '', d = '';
		m = selectMonth.value[0] < 10 ? '0'+selectMonth.value[0] : selectMonth.value[0];
		d = event.target.innerHTML < 10 ? '0'+event.target.innerHTML : event.target.innerHTML;
		var chooseDate = selectYear.value + '-' + m + '-' + d;
		if (event.target.className) {
			event.target.className = '';
		} else {
			event.target.className = 'choose';
			event.target.style.backgroundColor = '#FFEFD5';
			event.target.style.border = '1px solid #FF8C00';
		}
	}
	chooseDateArr.push(chooseDate);
	if (chooseDateArr.length == 2) {
		chooseDateArr.sort();
		var date1 = new Date(), date2 = new Date();
		date1.setFullYear(chooseDateArr[0].substring(0,4),chooseDateArr[0].substring(5,7),chooseDateArr[0].substring(8,10));
		date2.setFullYear(chooseDateArr[1].substring(0,4),chooseDateArr[1].substring(5,7),chooseDateArr[1].substring(8,10));
		var gap = (date2.getTime()-date1.getTime())/(24*3600*1000);
		if ( gap <= MAX_GAP && gap >= MIN_GAP) {
			inputValue.value = chooseDateArr.join('--');
			myWrap.style.display = 'none';
			myMask.style.display = 'none';
			k++;
		} else {
			alert('所选时间范围超出设定，请选择时间范围在2-10天')
		}
	chooseDateArr = [];
	}
}