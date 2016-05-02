function addEventHandler(ele, event, hanlder) {
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder, false);
    } else if (ele.attachEvent) {
        ele.attachEvent("on"+event, hanlder);
    } else  {
        ele["on" + event] = hanlder;
    }
}//事件委托兼容

var DISCHARGE = 5,
	CHARGE = 2,
	FLY_SPEED = 4,
	ERRORRATE = 0.3;
var SPACE_SHIPS = [];
window.onload = function () {
	var spaceshipArr = [];
	var logBox = document.getElementById('console'),
		universe = document.getElementById('universe'),
		control = document.getElementById('control');
	var orderScreen = document.getElementById('order_screen');

	addEventHandler(control,'click',function () {
		event.target.disable = 'true';
		switch(event.target.innerHTML) {
			case '新的飞船起飞':
				Commander.creatOrder(event.target);
				break;
			case '开始飞行':
				Commander.flyOrder(event.target);
				break;
			case '停止飞行':
				Commander.stopOrder(event.target);
				break;
			case '销毁':
				Commander.destroyOrder(event.target);
				break;
		}
	});
}

//飞船有四个系统：动力系统、能源系统、信号系统、自爆系统
//状态：消失or飞or停、位置(角度）、能源量
//系统是方法，状态是属性
var Spaceship = function(id) {
	this.id = id,
	this.state = 'stop',
	this.deg = 45,
	this.energy = 100,
	this.timer = null
};
Spaceship.prototype.powerSystem = function() {
	if (this.state == 'fly') {
		var that = this;
		if (this.timer == null) {
			this.timer = setInterval(function () {
				that.energySystem;//为什么这个只执行一遍
				that.deg =(that.deg + FLY_SPEED)%360;
				universe.getElementsByTagName('div')[parseInt(that.id)+4].style.transform = 'rotate(' + that.deg + 'deg)';
			},200);
		}
	}
	if (this.state == 'stop') {
		clearInterval(this.timer);
		this.timer = null;
	}
};
Spaceship.prototype.energySystem = function() {
	console.log(this);
	this.energy += CHARGE;
	console.log(1);
	if (this.energy > 100) {
		this.energy = 100;
	}
	if (this.state == 'fly') {
		this.energy -= DISCHARGE;
		if (this.energy < 0) {
			this.state = 'stop';
		}
	}
	universe.getElementsByTagName('div')[parseInt(this.id)+4].getElementsByTagName('span')[0].innerHTML = this.energy + '%';
};
Spaceship.prototype.distroySystem = function() {
	for (var i = 0; i < universe.getElementsByTagName('div').length; i++) {
		if (universe.getElementsByTagName('div')[i].innerHTML.toString()[0] == this.id) {
			universe.removeChild(universe.getElementsByTagName('div')[i]);
		} 
	}
};
Spaceship.prototype.signalSystem = function(id,cmd) {
	if (this.id == id) {
		switch(cmd) {
			case 'fly':
				this.state ='fly';
				this.powerSystem();
				this.energySystem();
				console.log(this.id + '飞船接收到fly命令');
				break;
			case 'stop':
				this.state = 'stop';
				this.powerSystem();
				this.energySystem();
				console.log(this.id + '飞船接收到stop命令');
				break;
			case 'destroy':
				this.distroySystem();
				console.log(this.id + '飞船接收到destroy命令');
				break;
		}
	}
};
//指挥官：创建飞船、开启飞船、停止飞船、自爆飞船
var Commander = {
	creatOrder: function () {
		var shipNumArr = universe.getElementsByTagName('div'),
			orderArr = control.getElementsByTagName('div');
		if (orderArr.length < 4 ) {
			var newShip = document.createElement('div'),
				newOrder = document.createElement('div');
			newShip.innerHTML = (shipNumArr.length-4) + '号-<span>100%</span>';
			newShip.className = 'spaceship';
			universe.appendChild(newShip);
			var shipId = orderArr.length + 1;
			newShip.style.top = 135 - (shipId-1)*50 + 'px';
			newShip.style.transformOrigin = 'center' + ' ' + (165 + (shipId-1)*50) + 'px';
			newOrder.innerHTML = '<span>对' +(orderArr.length+1)+ '号飞船下达命令：</span><button>开始飞行</button><button>停止飞行</button><button>销毁</button>';
			control.insertBefore(newOrder,control.lastElementChild);
			orderLog('指挥官：发送命令，创建' + (shipId) + '号飞船');
	    	SPACE_SHIPS.push(new Spaceship(shipId));
		} else {
			orderLog('指挥官：飞船数已达上限4');
		}
	},
	flyOrder: function (e) {
		var shipId = e.parentNode.firstChild.innerHTML.toString()[1];
		orderLog('指挥官：发送命令，' + shipId + '号飞船开始飞行');
		mediator(shipId,'fly');
	},
	stopOrder: function (e) {
		var shipId = e.parentNode.firstChild.innerHTML.toString()[1];
		orderLog('指挥官：发送命令，' + shipId + '号飞船停止飞行');
		mediator(shipId,'stop');
	},
	destroyOrder: function (e) {
		var shipId = e.parentNode.firstChild.innerHTML.toString()[1];
		orderLog('指挥官：发送命令，' + shipId + '号飞船销毁');
		for (var i = 0; i < control.getElementsByTagName('div').length; i++) {
			console.log(control.getElementsByTagName('span')[i].innerHTML.toString()[1]);
			if (control.getElementsByTagName('span')[i].innerHTML.toString()[1] == shipId) {
				control.removeChild(control.getElementsByTagName('div')[i]);
			} 
		}
		mediator(shipId,'destroy');
	}
}

function orderLog(text) {
	var orderScreen = document.getElementById('order_screen');
	orderScreen.innerHTML += text + '<br>';
}

function mediator (shipId,cmd) {
	var cmdArr = {
		fly: '飞行',
		stop: '停止',
		destroy: '销毁'
	};
	/*	if (Math.random() <= ERRORRATE) {
		orderLog('传输：命令传输过程出现错误，传输失败');
	} else {
		setTimeout(function () {
			orderLog('传输：命令传输成功，让' + shipId +'号飞船' + cmdArr[cmd]);
		},1000);
	}*/
	//调试的时候太麻烦，先关了
	orderLog('传输：命令传输成功，让' + shipId +'号飞船' + cmdArr[cmd]);
	var tmpShips = [];
	for (var i = 0; i < SPACE_SHIPS.length; i++) {
        tmpShips.push(SPACE_SHIPS[i]);
    }
    for (var i = 0; i < tmpShips.length; i++) {
        if (typeof tmpShips[i].signalSystem === 'function') {
            tmpShips[i].signalSystem(shipId,cmd);//广播信息后会传给每个订阅者
        }
    }
}



























