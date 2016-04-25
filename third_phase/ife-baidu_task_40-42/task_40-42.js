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
	inputBtn = document.getElementsByTagName('button')[0],
	getMyMonth = '', getMyYear = '',
	myDayArr = [],
	tdArr = document.getElementsByTagName('tbody')[0].getElementsByTagName('td'),
	inputDiv = document.getElementById('inputDay'),
	inputArr = inputDiv.getElementsByTagName('input'),
	firstDay = new Date();

window.onload = function () {
	init(2016,4);
	addEventHandler(inputDiv,'click',function () {
		console.log(event.target);
		event.target.value = '';
	});//为啥用focus就不行
	addEventHandler(inputBtn,'click',inputDate);
	addEventHandler(selectYear,'change',changeCalendar(selectYear.value,selectMonth.value));
	addEventHandler(selectMonth,'change',changeCalendar);
	addEventHandler(myCalendar,'click',chooseDay);
}

//选择年月
function changeCalendar(year,month) {
	for (var i = 0; i < tdArr.length; i++) {
		tdArr[i].innerHTML = '';
		tdArr[i].className = '';
	}
	console.log(year);
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
		if (!event.target.className) {
			for (var i = 0; i < tdArr.length; i++) {
				if (tdArr[i].className == 'choose') {
					tdArr[i].className = '';	
				}
			}
			event.target.className = 'choose';
			var showDay = event.target.innerHTML;
			inputArr[0].value = selectYear.value;
			inputArr[1].value = selectMonth.value[0];
			inputArr[2].value = showDay;		
		} else {
			event.target.className = '';
			for (var i = 0; i < inputArr.length; i++) {
				inputArr[i].value = '';
			}
			/*inputArr.forEach(function (item) {
				item.value = '';
			})不知道为啥这个forEach就是用不了*/
		}
	}
}

//输入日期
function inputDate() {
	var myYear = inputArr[0].value, myMonth = inputArr[1].value,
		day = new Date(myYear,myMonth,0);
	if (/^\d{4}$/.test(myYear) && myMonth <= 12 && myMonth >= 1 && inputArr[2].value <= day.getDate()) {
		changeCalendar(myYear,myMonth);
		console.log(myYear,myMonth);
	} else {
		inputDiv.innerHTML += '<br />请输入正确日期'
	}
	for (var i = 0; i < tdArr.length; i++) {
		if (tdArr[i].innerHTML == inputArr[2].value) {
			tdArr[i].className = 'choose';
		}
	}
}