var btn = document.getElementsByTagName('button'),
	deepTraversal = btn[0],
	wideTraversal = btn[1],
	deepSearch = btn[2],
	wideSearch = btn[3];

	treeRoot = document.getElementsByClassName('root')[0],
	divList = [],
	timer = null;

window.onload = function (){
	deepTraversal.onclick = function () {
		reset();
		deepTvs(treeRoot);
		changeColor();
	}
	wideTraversal.onclick = function () {
		reset();
		wideTvs(treeRoot);
		changeColor(); 	
	}
	deepSearch.onclick = function () {
		reset();
		
		changeColor();
	}
	wideSearch.onclick = function () {
		reset();

	}
}

//深度优先遍历
function deepTvs(node) {
	if (!(node == null)) {
		divList.push(node);
		for (var i = 0; i < node.children.length; i++) {
			deepTvs(node.children[i]);
		}
	}
}

//广度优先遍历
function wideTvs(node) {
	var i = 0;
	if (!(node == null)) {
		divList.push(node);
		wideTvs(node.nextElementSibling);
		node = divList[i++];
		wideTvs(node.firstElementChild);
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