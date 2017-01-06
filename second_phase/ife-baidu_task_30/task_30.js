var	nameInfo = document.getElementById('name_info'),
	passwordInfo = document.getElementById('password_info'),
	confirmInfo = document.getElementById('confirm_info'),
	emailInfo = document.getElementById('email_info'),
	phoneInfo = document.getElementById('phone_info');
window.onload = function () {
	nameTr();
	passwordTr();
	confirmTr();
	emailTr();
	phoneTr();
	//button函数
	document.getElementsByTagName('button')[0].onclick = function () {
	var spanList = document.getElementsByTagName('span');
	for (var i = 0; i < spanList.length; i++) {		
		if (spanList[i].style.color != 'lightgreen') {
				alert('输入有误');
				return;
		}
	}
	alert('验证成功');
	}
}

//验证姓名
function nameTr() {
	var userInput = nameInfo.getElementsByTagName('input')[0],
		userSpan = nameInfo.getElementsByTagName('span')[0];
	userInput.onfocus = function () {
		userSpan.innerHTML = '请输入长度为4~16位字符';
	}
	userInput.onblur = function () {
		if (countLength(userInput.value) == 0) {
			userSpan.innerHTML = '姓名不能为空';
			inputInfo(userSpan,userInput,false) 
		} else if (countLength(userInput.value) >=4 && countLength(userInput.value) <= 16) {
			userSpan.innerHTML = '格式正确';
			inputInfo(userSpan,userInput,true) 
		} else {
			userSpan.innerHTML = '请输入长度为4~16位字符';
			inputInfo(userSpan,userInput,false) 
		}
	}	
}
function countLength(str) {
	var inputLength = 0;
	for (var i = 0; i < str.length; i++) {
		var countCode = str.charCodeAt(i);
		if (countCode >= 0 && countCode <=128) {
			inputLength += 1;
		} else {
			inputLength += 2;
		}
	}
	return inputLength;
}

//验证密码
function passwordTr() {
	var userInput = passwordInfo.getElementsByTagName('input')[0],
		userSpan = passwordInfo.getElementsByTagName('span')[0];
	userInput.onfocus = function () {
		userSpan.innerHTML = '请输入6~16位密码';
	}
	userInput.onblur = function () {
		if (userInput.value.length >=6 && userInput.value.length <= 16) {
			userSpan.innerHTML = '格式正确';
			inputInfo(userSpan,userInput,true) 
		} else {
			userSpan.innerHTML = '请输入长度为6~16位密码';
			inputInfo(userSpan,userInput,false) 
		}
	}	
}
//确认密码
function confirmTr() {
	var userInput = confirmInfo.getElementsByTagName('input')[0],
		userSpan = confirmInfo.getElementsByTagName('span')[0];
	userInput.onfocus = function () {
		userSpan.innerHTML = '请再次输入密码';
	}
	userInput.onblur = function () {
		if (userInput.value == passwordInfo.getElementsByTagName('input')[0].value) {
			userSpan.innerHTML = '密码一致';
			inputInfo(userSpan,userInput,true) 
		} else {
			userSpan.innerHTML = '输入的密码不一致';
			inputInfo(userSpan,userInput,false) 
		}
	}	
}
//验证邮箱
function emailTr() {
	var userInput = emailInfo.getElementsByTagName('input')[0],
		userSpan = emailInfo.getElementsByTagName('span')[0],
		filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		//filter记不住，百度一下就有了
	userInput.onfocus = function () {
		userSpan.innerHTML = '请输入邮箱地址';
	}
	userInput.onblur = function () {
		if (filter.test(userInput.value)) {
			userSpan.innerHTML = '邮箱格式正确';
			inputInfo(userSpan,userInput,true) 
		} else {
			userSpan.innerHTML = '您的电子邮件格式不正确';
			inputInfo(userSpan,userInput,false) 
		}
	}	
}
//验证手机号
function phoneTr() {
	var userInput = phoneInfo.getElementsByTagName('input')[0],
		userSpan = phoneInfo.getElementsByTagName('span')[0],
		filter  = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/;
	userInput.onfocus = function () {
		userSpan.innerHTML = '请输入手机号码';
	}
	userInput.onblur = function () {
		if (filter.test(userInput.value)) {
			userSpan.innerHTML = '手机号码格式正确';
			inputInfo(userSpan,userInput,true) 
		} else {
			userSpan.innerHTML = '您的手机号码格式不正确';
			inputInfo(userSpan,userInput,false) 
		}
	}	
}

//input框样式函数
function inputInfo(text,input,bool) {
	if (bool) {
		text.style.color = 'lightgreen';
		input.style.border = '1px solid lightgreen';
	} else {
		text.style.color = 'red';
		input.style.border = '1px solid red';
	}	
}