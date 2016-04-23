var mask = document.getElementById('mask'),
	suspend = document.getElementById('suspend'),
	showBtn = document.getElementById('show_btn'),
	closeBtn = document.getElementById('close_btn');

function showPage() {
	mask.style.display = 'none';
	suspend.style.display = 'none';
}
mask.onclick = showPage;
closeBtn.onclick = showPage;

showBtn.onclick = function showLogin() {
	mask.style.display = 'block';
	suspend.style.display = 'block';
}

//拖拽
suspend.onmousedown = drag;
function drag(event) {
	var disX = event.clientX - suspend.offsetLeft,
		disY = event.clientY - suspend.offsetTop;
	document.onmousemove = function (event) {
		changeX = event.clientX - disX;
		changeY = event.clientY - disY;	
		suspend.style.top = changeY + 100 +'px';
		suspend.style.left = changeX + 150 +'px';
	}
	document.onmouseup = function () {
		document.onmousemove = null;
		document.onmouseup = null;
	}

}