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
	moveFont = moveBox.getElementsByTagName('div')[0],
	orderButton = document.getElementsByTagName('button'),
	orderExec = orderButton[0],
	orderOne = document.getElementById('order_1'),
	orderTwo = document.getElementById('order_2'),
	orderThr = document.getElementById('order_3');	

var orderInput = '';

window.onload = function () {
	var order = '';
	orderExec.onclick = function() {
		orderInput = document.getElementsByTagName('input')[0].value;
		getOrder(orderInput);
		getOrderTwo(orderInput);
		getOrderThr(orderInput);
	};
	addEventHandler(orderOne,'click',getOrder);
	addEventHandler(orderTwo,'click',getOrderTwo);
	addEventHandler(orderThr,'click',getOrderThr);
}

//移动命令函数
function orderMoveTop() {
	if (moveBox.offsetTop == 47) {
		moveBox.style.top = parseInt(moveBox.offsetTop) + 'px';
		alert('撞到墙啦！');
	} else {
		moveBox.style.top = parseInt(moveBox.offsetTop) - 45 + 'px';
	}
}
function orderMoveRight() {
	if (moveBox.offsetLeft == 452) {
		moveBox.style.left = parseInt(moveBox.offsetLeft) + 'px';
		alert('撞到墙啦！');
	} else {
		moveBox.style.left = parseInt(moveBox.offsetLeft) + 45 + 'px';
	}
}
function orderMoveBottom() {
	if (moveBox.offsetTop == 452) {
		moveBox.style.top = parseInt(moveBox.offsetTop) + 'px';
		alert('撞到墙啦！');
	} else {
	moveBox.style.top = parseInt(moveBox.offsetTop) + 45 + 'px';
	}
}
function orderMoveLeft() {
	if (moveBox.offsetLeft == 47) {
		moveBox.style.left = parseInt(moveBox.offsetLeft) + 'px';
		alert('撞到墙啦！');
	} else {
		moveBox.style.left = parseInt(moveBox.offsetLeft) - 45+ 'px';
	}
}

//旋转事件函数
function orderTurnTop() {
	moveFont.className = 'top';
}
function orderTurnRight() {
	moveFont.className = 'right';
}
function orderTurnBottom() {
	moveFont.className = 'bottom';
}
function orderTurnLeft() {
	moveFont.className = 'left';
}

//第一行命令扭
function getOrder(e) {
	var order = ((typeof e) == 'string') ?  e : e.target.innerHTML;
	switch(order.toUpperCase()) {
		case 'GO':
			if (moveBox.offsetTop >= 47 && moveBox.offsetTop <= 452 && moveBox.offsetLeft >= 47 && moveBox.offsetLeft <= 452) {
				switch(moveFont.className) {
					case 'top':
						orderMoveTop();
						break;
					case 'right':
						orderMoveRight();
						break;
					case 'bottom':
						orderMoveBottom();
						break;
					case 'left':
						orderMoveLeft();
						break;
				}
			}
			break;			
		case 'TUN LEF':
			switch(moveFont.className) {
				case 'top':
					orderTurnLeft();
					break;
				case 'right':
					orderTurnTop();
					break;
				case 'bottom':
					orderTurnRight();
					break;
				case 'left':
					orderTurnBottom();
					break;
			}
			break;
		case 'TUN RIG':
			switch(moveFont.className) {
				case 'top':
					orderTurnRight();
					break;
				case 'right':
					orderTurnBottom();
					break;
				case 'bottom':
					orderTurnLeft();
					break;
				case 'left':
					orderTurnTop();
					break;
			}			break;
		case 'TUN BAC':	
			switch(moveFont.className) {
				case 'top':
					orderTurnBottom();
					break;
				case 'right':
					orderTurnLeft();
					break;
				case 'bottom':
					orderTurnTop();
					break;
				case 'left':
					orderTurnRight();
					break;
			}
			break;
	}
}

//第二行命令扭
function getOrderTwo(e) {
	var order = ((typeof e) == 'string') ?  e : e.target.innerHTML;
	if (moveBox.offsetTop >= 47 && moveBox.offsetTop <= 452 && moveBox.offsetLeft >= 47 && moveBox.offsetLeft <= 452) {
		switch(order.toUpperCase()) {
			case 'TRA TOP':
				orderMoveTop();
				break;
			case 'TRA RIG':
				orderMoveRight();
				break;
			case 'TRA BOT':
				orderMoveBottom();
				break;
			case 'TRA LEF':
				orderMoveLeft();
				break;
		}
	}
}

//第三行命令扭
function getOrderThr(e) {
	var order = ((typeof e) == 'string') ?  e : e.target.innerHTML;
	switch(order.toUpperCase()) {
		case 'MOV LEF':
			orderMoveLeft();
			if (moveBox.offsetLeft != 47) {
				orderTurnLeft();
			}
		break;
		case 'MOV TOP':
			orderMoveTop();
			if (moveBox.offsetTop != 47) {
				orderTurnTop();
			}
			break;
		case 'MOV RIG':
			orderMoveRight();
			if (moveBox.offsetLeft != 452) {
				orderTurnRight();
			}
			break;
		case 'MOV BOT':
			orderMoveBottom();
			if (moveBox.offsetTop != 452) {
				orderTurnBottom();
			}
			break;
	}
}