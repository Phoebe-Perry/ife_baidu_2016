//事件绑定兼容
function addEventHandler(ele, event, hanlder) {
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder, false);
    } else if (ele.attachEvent) {
        ele.attachEvent("on"+event, hanlder);
    } else  {
        ele["on" + event] = hanlder;
    }
}

var tagInput = document.getElementById('tag_input'),
	tagList = document.getElementById('tag_list'),
	hobbyInput = document.getElementById('hobby_input'),
	hobbyList = document.getElementById('hobby_list'),
	hobbyBtn = document.getElementsByTagName('button')[0];

//实例对象
var tagObj = new CreatList(tagList),
	hobbyObj = new CreatList(hobbyList);

window.onload = function () {
//事件绑定
	addEventHandler(tagInput,'keyup',showTag);
	addEventHandler(hobbyBtn,'click',showHobby);

	addEventHandler(tagList,'mouseover',function (e) {
		if(e.target && e.target.nodeName == "SPAN") { 
			e.target.firstChild.insertData(0,'点击删除');
			e.target.style.background = 'red'; 
		}
	});
	addEventHandler(tagList,'mouseout',function(e) {
		if(e.target && e.target.nodeName == "SPAN") { 
			e.target.firstChild.deleteData(0,4);
			e.target.style.background = '#78BCFB'
		}
	})
	addEventHandler(tagList,'click',function (e) {
		if(e.target && e.target.nodeName == "SPAN") { 
			tagList.removeChild(e.target);
		}
	})
}

//构造函数模式与原型模式结合
function CreatList(divList) {
	this.queue = [];
	this.render = function () {
		var str = "";
		this.queue.forEach(function (e) {
			str += '<span>' + e + '</span>';
		});
		divList.innerHTML = str;
	}
}
CreatList.prototype.rightPush = function(str) {
	this.queue.push(str);
	this.render();
};
CreatList.prototype.leftShift = function() {
	this.queue.shift();
	this.render();
};
//本来还想写个去重的方法，但是失败了……

//对输入内容分割成数组，考虑过能不能做成对象的方法，但是失败了……
function splitInput(str) {
	var inputArray = str.trim().split(/[,，;；、。.\s\n]+/);
	return inputArray;
}

function showTag() {
	if (/[,，;；、\s\n]+/.test(tagInput.value) || event.keyCode == 13) {
		var data = splitInput(tagInput.value),
			newTag = data[0];
		if (tagObj.queue.indexOf(newTag) === -1) {
			tagObj.rightPush(newTag);
			if (tagObj.queue.length > 10) {
				tagObj.leftShift();
			}
		}
		tagObj.render();
		tagInput.value = "";	
	}	
}

function showHobby() {
	var data = splitInput(hobbyInput.value);
	data.forEach(function (e) {
		if (hobbyObj.queue.indexOf(e) === -1) {
			hobbyObj.rightPush(e);
			if (hobbyObj.queue.length > 10) {
				hobbyObj.leftShift();
			}
		}
		hobbyObj.render();
		hobbyInput.value = "";
	});
}