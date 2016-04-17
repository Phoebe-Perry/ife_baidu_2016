function addEventHandler(ele, event, hanlder) {
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder, false);
    } else if (ele.attachEvent) {
        ele.attachEvent("on"+event, hanlder);
    } else  {
        ele["on" + event] = hanlder;
    }
}//事件委托兼容

//飞船有四个系统：动力系统、能源系统、信号系统、自爆系统
//状态：消失or飞or停、位置(角度）、能源量
//系统是方法，状态是属性
function Spaceship(id) {
	this.id = id;
	this.state = stop;
	this.angle = 0;
	this.energy = 100;
}

Spaceship.prototype.powerSystem = {
	
	fly: function(){
		var that = this;
		var timer = setInterval(function () {
			that.deg += 2;
			that.style.transform = 'rotate(that.deg % 360)';
		},50)
	},
	stop: function(){
		clearInterval(timer);
	}
};
Spaceship.prototype.energySystem = {

	charge: function () {
		var that = this;
		if (that.state == 'destroy'){
			return false;
		} else if (that.energy >= 100) {
			that.energy = 100;
			return false;
		} else {
			var timer = setInterval(function () {
				that.energy += 2;
				updateEnergy(that.id);
			},50)
		}
	},
	discharge: function () {
		if (that.state != 'fly') {
			return false;
		} else if (that.energy <= 0) {
			that.energy = 0;
			that.state = 'destroy'
		} else {
			var timer = setInterval(function () {
				that.energy -=5;
				updateEnergy(that.id);
			},50)
		}
	}
};
Spaceship.prototype.signalSystem = {
	receive: function (massage) {
		if (this.state != massage.order && this.id == massage.id) {
			this.state = massage.order;
		}
	}
};
Spaceship.prototype.destroySystem = {
	document.getElementById('this.id').parentNode.removeChild(document.getElementById('this.id'))

};
//指挥官：创建飞船、开启飞船、停止飞船、自爆飞船
















updateEnergy(id)
















