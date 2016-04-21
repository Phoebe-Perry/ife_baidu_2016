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
	FLY_SPEED = 2,
	ERRORRATE = 0.3;

window.onload = function () {
	var spaceshipArr = [];
	var logBox = document.getElementById('console'),
		universe = document.getElementById('universe'),
		control = document.getElementById('control');
	var orderScreen = document.getElementById('order_screen');

	control.lastElementChild.onclick = Commander.creatOrder;
	var divArr = control.getElementsByTagName('div');
	for (var i = 0; i < divArr.length; i++) {
		divArr[i].getElementsByTagName('button')[0].onclick = Commander.flyOrder;
		divArr[i].getElementsByTagName('button')[1].onclick = Commander.stopOrder;
		divArr[i].getElementsByTagName('button')[2].onclick = Commander.destoryOrder;
		//这些...Order函数后面不加括号
	}
/*	divArr.forEach(function (item) {
		item.getElementsByTagName('button')[0].onclick = Commander.flyOrder();
		item.getElementsByTagName('button')[1].onclick = Commander.stopOrder();
		item.getElementsByTagName('button')[2].onclick = Commander.destoryOrder();
	});*/
}

//飞船有四个系统：动力系统、能源系统、信号系统、自爆系统
//状态：消失or飞or停、位置(角度）、能源量
//系统是方法，状态是属性

var Spaceship = function(id) {
	this.id = id;
	this.state = 'stop',
	this.energy = 100,
	this.deg = 45;
		/*_destroyed: false,
		_deg: 0*/
};
Spaceship.prototype.powerSystem = function() {
	if (this.state == 'fly') {
		setTimeInterval(function () {
			this.deg = (this.deg + FLY_SPEED) % 360;
			this.transform = 'rotate(' + this.deg + 'deg)';
		},500);
	}
};
Spaceship.prototype.energySystem = function() {
	this.energy += CHARGE;
	if (this.energy > 100) {
		this.energy = 100;
	}
	if (this.state == 'fly') {
		this.energy -= DISCHARGE;
		if (this.energy < 0) {
			this.state = 'stop';
		}
	}
};
Spaceship.prototype.distroySystem = function() {
	universe.removeChild(this);
};
Spaceship.prototype.signalSystem = function(id,cmd) {
	console.log(this);
	var universeArr = universe.getElementsByTagName('div');
					/*universe.getElementsByTagName('div')*/
	console.log(universeArr);//后面一串是啥
	console.log(universeArr[5].innerHTML.toString()[0]);
	for (var i = 5; i < universeArr.length; i++) {
		if (universeArr[i].innerHTML.toString()[0] == id) {
			switch(cmd) {
				case 'fly':
					console.log(cmd);
					console.log(this);
					this.state ='fly';
					console.log(this);
					this.powerSystem();
					this.energySystem();
					break;
				case 'stop':
					this.state = 'stop';
					this.energySystem();
					break;
				case 'destroy':
					this.distroySystem();
			}
		}
	}
};

//指挥官：创建飞船、开启飞船、停止飞船、自爆飞船
var Commander = {
	creatOrder: function () {
		var shipNumArr = universe.getElementsByTagName('div'),
			orderArr = control.getElementsByTagName('div');
		if (orderArr.length <4 ) {
			var newShip = document.createElement('div'),
				newOrder = document.createElement('div');
			newShip.innerHTML = (shipNumArr.length-4) + '号-<span>100%</span>';
			newShip.className = 'spaceship';
			universe.appendChild(newShip);
			newOrder.innerHTML = '<span>对' +(orderArr.length+1)+ '号飞船下达命令：</span><button>开始飞行</button><button>停止飞行</button><button>销毁</button>';
			control.insertBefore(newOrder,control.lastElementChild);
			var shipId = orderArr.length-1;
			orderLog('指挥官：发送命令，创建' + (shipId+1) + '号飞船');
		} else {
			orderLog('指挥官：飞船数已达上限4');
		}
	},
	flyOrder: function (shipId) {
		var shipId = this.previousSibling.innerHTML.toString()[1];
		orderLog('指挥官：发送命令，' + shipId + '号飞船开始飞行');
		mediator(shipId,'fly');
	},
	stopOrder: function () {
		var shipId = this.previousSibling.innerHTML.toString()[1];
		orderLog('指挥官：发送命令，' + shipId + '号飞船停止飞行');
		mediator(shipId,'stop');
	},
	destoryOrder: function () {
		var shipId = this.previousSibling.innerHTML.toString()[1];
		orderLog('指挥官：发送命令，' + shipId + '号飞船销毁');
		mediator(shipId,'destory');
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
		destory: '销毁'
	};
	if (Math.random() <= ERRORRATE) {
		orderLog('传输：命令传输过程出现错误，传输失败');
	} else {
		setTimeout(function () {
			orderLog('传输：命令传输成功，让' + shipId +'号飞船' + cmdArr[cmd]);
			var ship = new Spaceship(shipId,cmd);
			ship.signalSystem();
		},1000);
	}
}



























