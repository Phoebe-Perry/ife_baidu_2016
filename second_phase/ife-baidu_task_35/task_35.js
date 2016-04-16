function addEventHandler(ele, event, hanlder) {
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder, false);
    } else if (ele.attachEvent) {
        ele.attachEvent("on"+event, hanlder);
    } else  {
        ele["on" + event] = hanlder;
    }
}//事件委托兼容

var moveBox = document.getElementById('move'),
	orderNum = document.getElementById('order_num');
	moveFont = moveBox.getElementsByTagName('div')[0],
	orderExec = document.getElementById('order_exec'),
	orderRef = document.getElementById('order_refresh'),
	orderInput = document.getElementsByTagName('textarea')[0],
	orderOne = document.getElementById('order_1'),

window.onload = function () {
	orderExec.onclick = trasOrderArr;
	addEventHandler(orderInput,'keydown',syncLine)
	addEventHandler(orderOne,'click',getOrder);
	addEventHandler(orderInput,'scroll',function() {
		orderNum.getElementsByTagName('li')[0].style.marginTop = -orderInput.scrollTop + "px";
	})
	orderRef.onclick = function () {
		orderInput.value = '';
		orderNum.innerHTML = '';
	}
}

var myOrder = {
	orderGo: function () {
			switch(moveFont.className) {
				case 'top':
					myOrder.orderMoveTop();
					break;
				case 'right':
					myOrder.orderMoveRight();
					break;
				case 'bottom':
					myOrder.orderMoveBottom();
					break;
				case 'left':
					myOrder.orderMoveLeft();
					break;
			}
	},
	orderTunLef: function () {
			switch(moveFont.className) {
				case 'top':
					myOrder.orderTurnLeft();
					break;
				case 'right':
					myOrder.orderTurnTop();
					break;
				case 'bottom':
					myOrder.orderTurnRight();
					break;
				case 'left':
					myOrder.orderTurnBottom();
					break;
				}
	},
	orderTunRig: function(){
			switch(moveFont.className) {
				case 'top':
					myOrder.orderTurnRight();
					break;
				case 'right':
					myOrder.orderTurnBottom();
					break;
				case 'bottom':
					myOrder.orderTurnLeft();
					break;
				case 'left':
					myOrder.orderTurnTop();
					break;
			}			
	},
	orderBac: function(){
			switch(moveFont.className) {
				case 'top':
					myOrder.orderTurnBottom();
					break;
				case 'right':
					myOrder.orderTurnLeft();
					break;
				case 'bottom':
					myOrder.orderTurnTop();
					break;
				case 'left':
					myOrder.orderTurnRight();
					break;
			}
	},
	//移动命令函数
	orderMoveTop: function () {
		if (moveBox.offsetTop > 47) {
			moveBox.style.top = parseInt(moveBox.offsetTop) - 45 + 'px';
		} else {
			alert('撞到墙啦！');
		}
	},
	orderMoveRight: function () {
		if (moveBox.offsetLeft < 452) {
			moveBox.style.left = parseInt(moveBox.offsetLeft) + 45 + 'px';
		} else {
			alert('撞到墙啦！');
		}
	},
	orderMoveBottom: function () {
		if (moveBox.offsetTop < 452) {
			moveBox.style.top = parseInt(moveBox.offsetTop) + 45 + 'px';
		} else {
			alert('撞到墙啦！');
		}
	},
	orderMoveLeft: function () {
		if (moveBox.offsetLeft > 47) {
			moveBox.style.left = parseInt(moveBox.offsetLeft) - 45+ 'px';
		} else {
			alert('撞到墙啦！');
		}
	},

	//旋转事件函数
	orderTurnTop: function () {
		moveFont.className = 'top';
	},
	orderTurnRight: function () {
		moveFont.className = 'right';
	},
	orderTurnBottom: function () {
		moveFont.className = 'bottom';
	},
	orderTurnLeft: function () {
		moveFont.className = 'left';
	},
}
function getOrder(e) {
	var order = ((typeof e) == 'string') ?  e : e.target.innerHTML;
	switch(order.toUpperCase()) {
		case 'GO':
			myOrder.orderGo();
			break;			
		case 'TUN LEF':
			myOrder.orderTunLef();
			break;
		case 'TUN RIG':
			myOrder.orderTunRig();
			break;
		case 'TUN BAC':	
			myOrder.orderBac();
			break;
		case 'MOV LEF':
			myOrder.orderMoveLeft();
			if (moveBox.offsetLeft != 47) {
				myOrder.orderTurnLeft();
			}
			break;
		case 'MOV TOP':
			myOrder.orderMoveTop();
			if (moveBox.offsetTop != 47) {
				myOrder.orderTurnTop();
			}
			break;
		case 'MOV RIG':
			myOrder.orderMoveRight();
			if (moveBox.offsetLeft != 452) {
				myOrder.orderTurnRight();
			}
			break;
		case 'MOV BOT':
			myOrder.orderMoveBottom();
			if (moveBox.offsetTop != 452) {
				myOrder.orderTurnBottom();
			}
			break;
		case 'TRA TOP':
			if (moveBox.offsetTop >= 47 && moveBox.offsetTop <= 452 && moveBox.offsetLeft >= 47 && moveBox.offsetLeft <= 452){
				myOrder.orderMoveTop();	
			}
			break;
		case 'TRA RIG':
			if (moveBox.offsetTop >= 47 && moveBox.offsetTop <= 452 && moveBox.offsetLeft >= 47 && moveBox.offsetLeft <= 452){
				myOrder.orderMoveRight();
			}
			break;
		case 'TRA BOT':
			if (moveBox.offsetTop >= 47 && moveBox.offsetTop <= 452 && moveBox.offsetLeft >= 47 && moveBox.offsetLeft <= 452){
				myOrder.orderMoveBottom();
			}
			break;
		case 'TRA LEF':
			if (moveBox.offsetTop >= 47 && moveBox.offsetTop <= 452 && moveBox.offsetLeft >= 47 && moveBox.offsetLeft <= 452){
				myOrder.orderMoveLeft();
			}
			break;
	}
}

//同步感应序号行、检测命令合法性。但是有几行和traOrderArr重复，稍后我考虑简化一下
function syncLine() {
	var inputArr = orderInput.value.trim().toUpperCase().split('\n'), lineNum = '';
	for (var i = 0; i < inputArr.length; i++) {
		lineNum += '<li>'+ (i+1) +'</li>';
	}
	orderNum.innerHTML = lineNum;
	var collection =['GO','TUN RIG','TUN LEF','TUN BAC','MOV LEF','MOV TOP','MOV RIG','MOV BOT','TRA TOP','TRA RIG','TRA BOT','TRA LEF'],
		temp = '';
	if (event.keyCode == 13) {
		inputArr.forEach(function (item) {
			var lastOfOrder = item.substr(-1,1);
			if (isNaN(lastOfOrder)) {
				temp = item;
			}else {
				temp = item.substr(0,item.length-1).trim();
			}
			if (collection.indexOf(temp)) {
				orderNum.getElementsByTagName('li')[inputArr.indexOf(item)].style.backgroundColor = 'red';
			}
		});		
	}
}

function trasOrderArr() {
	var inputArr = orderInput.value.trim().toUpperCase().split('\n'), orderArr = [],spliceOrder = '';
		inputArr.forEach(function (item) {
			var lastOfOrder = item.substr(-1,1);//但是这样只能执行最后数字小于10的,不过幸好格子长度也只有10
			if (isNaN(lastOfOrder)) {//最后一位不是数字则正常执行
				orderArr.push(item);
			} else {
				spliceOrder = item.substr(0,item.length-1).trim();
				for (var j = 0; j < lastOfOrder; j++) {//是数字则改变数组
					orderArr.push(spliceOrder);
				}
			}
		});
		var timer = null;
		if (timer) {
			clearInterval(timer);
		} else {
			timer = setInterval(orderArr.forEach(function (item) {
				getOrder(item);
			}),1000);
		}		
}