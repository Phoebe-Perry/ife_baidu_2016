var btn = document.getElementsByTagName('input'),
	preBtn = btn[0],
	inBtn = btn[1],
	postBtn = btn[2],
	treeRoot = document.getElementsByClassName('root')[0],
	divList = [],
	timer = null;
window.onload = function (){
	preBtn.onclick = function () {
		reset();
		preOrder(treeRoot);
		changeColor();
	}
	inBtn.onclick = function () {
		reset();
		inOrder(treeRoot);
		changeColor(); 	
	}
	postBtn.onclick = function () {
		reset();
		postOrder(treeRoot);
		changeColor();
	}
}

//前序遍历
function preOrder(node) {
	if (!(node == null)) {
		divList.push(node);
		for (var i = 0; i < node.children.length; i++) {
			preOrder(node.children[i]);
		}
	}
}

//后序遍历
function postOrder(node) {
	if (!(node == null)) {
		for (var i = 0; i < node.children.length; i++) {
			preOrder(node.children[i]);
		}
		divList.push(node);
	}
}

//颜色变化函数
function changeColor() {
	var i = 0;
	divList[i].style.backgroundColor = 'blue'
	timer = setInterval(function (argument) {
		i++;
		if (i < divList.length) {
			divList[i-1].style.backgroundColor = '#fff';
			divList[i].style.backgroundColor = 'blue';
		} else {
			clearInterval(timer);
			divList[divList.length-1].style.backgroundColor = '#fff';
		}
	},500)
}

//初始化样式
function reset() {
	divList = [];
	clearInterval(timer);
	var divs = document.getElementsByTagName('div');
	for (var i = 0; i < divs.length; i++) {
		divs[i].style.backgroundColor = '#fff';
	}
}