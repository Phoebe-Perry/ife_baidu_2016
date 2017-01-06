function addEventHandler(ele, event, hanlder) {
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder, false);
    } else if (ele.attachEvent) {
        ele.attachEvent("on"+event, hanlder);
    } else  {
        ele["on" + event] = hanlder;
    }
}

var moveBox = document.getElementById('move'),
	moveFont = moveBox.getElementsByTagName('div')[0],
	orderButton = document.getElementsByTagName('button'),
	orderExec = orderButton[0],
	orderGo = orderButton[1],
	orderLEF = orderButton[2],
	orderRIG = orderButton[3],
	orderBAC = orderButton[4];
var orderInput = '';

window.onload = function () {
	addEventHandler(orderExec,'click',function () {
		orderInput = document.getElementsByTagName('input')[0].value;
		getOrder();
	});
	addEventHandler(orderExec,'click',getOrder);
	addEventHandler(orderGo,'click',getOrder);
	addEventHandler(orderLEF,'click',getOrder);
	addEventHandler(orderRIG,'click',getOrder);
	addEventHandler(orderBAC,'click',getOrder);
}

function getOrder() {
	var order = this.innerHTML || orderInput;
	switch(order.toUpperCase()) {
		case 'GO':
			if (moveBox.offsetTop >= 47 && moveBox.offsetTop <= 452 && moveBox.offsetLeft >= 47 && moveBox.offsetLeft <= 452) {
				switch(moveFont.className) {
					case 'top':
						if (moveBox.offsetTop == 47) {
							moveBox.style.top = parseInt(moveBox.offsetTop) + 'px';
							alert('撞到墙啦！');
						} else {
							moveBox.style.top = parseInt(moveBox.offsetTop) - 45 + 'px';
						}
						break;
					case 'right':
						if (moveBox.offsetLeft == 452) {
							moveBox.style.left = parseInt(moveBox.offsetLeft) + 'px';
							alert('撞到墙啦！');
						} else {
							moveBox.style.left = parseInt(moveBox.offsetLeft) + 45 + 'px';
						}
						break;
					case 'bottom':
						if (moveBox.offsetTop == 452) {
							moveBox.style.top = parseInt(moveBox.offsetTop) + 'px';
							alert('撞到墙啦！');
						} else {
						moveBox.style.top = parseInt(moveBox.offsetTop) + 45 + 'px';
						}
						break;
					case 'left':
						if (moveBox.offsetLeft == 47) {
							moveBox.style.left = parseInt(moveBox.offsetLeft) + 'px';
							alert('撞到墙啦！');
						} else {
							moveBox.style.left = parseInt(moveBox.offsetLeft) - 45+ 'px';
						}
						break;
				}
			}
			break;			
		case 'TUN LEF':
			switch(moveFont.className) {
				case 'top':
					moveFont.className = 'left';
					break;
				case 'right':
					moveFont.className = 'top';
					break;
				case 'bottom':
					moveFont.className = 'right';
					break;
				case 'left':
					moveFont.className = 'bottom';
					break;
			}
			break;
		case 'TUN RIG':
			switch(moveFont.className) {
				case 'top':
					moveFont.className = 'right';
					break;
				case 'right':
					moveFont.className = 'bottom';
					break;
				case 'bottom':
					moveFont.className = 'left';
					break;
				case 'left':
					moveFont.className = 'top';
					break;
			}			break;
		case 'TUN BAC':	
			switch(moveFont.className) {
				case 'top':
					moveFont.className = 'bottom';
					break;
				case 'right':
					moveFont.className = 'left';
					break;
				case 'bottom':
					moveFont.className = 'top';
					break;
				case 'left':
					moveFont.className = 'right';
					break;
			}
			break;
	}
}