function Student(name, math, chinese, english) {
    this.name = name;
    this.math = math;
    this.chinese = chinese;
    this.english = english;
    this.total = math + chinese + english;
}
var data = [];
data[0] = new Student("小明", 80, 90, 70);
data[1] = new Student("小红", 90, 60, 90);
data[2] = new Student("小亮", 60, 100, 70);
data[3] = new Student("小军", 50, 95, 40);

var myTable = document.getElementById('my_table');
function renderTable(data) {
    var tableTr = '';
    data.forEach(function (item) {
        tableTr += '<tr><td>' + item.name + '</td><td>' + item.math + '</td><td>' + item.chinese + '</td><td>' + item.english + '</td><td>' + item.total +'</td></tr>'
    });
    myTable.innerHTML += tableTr;
}
function clearTable() {
    myTable.innerHTML = '<tr><th>姓名</th><th>数学</th><th>语文</th><th>英语</th><th>总分</th></tr>';
}

window.onload = function () {
    renderTable(data);
    var sortBtn = myTable.getElementsByTagName('th');
    var k = 0, i = 0;
    addEventHandler(myTable,'click',function (e) {
        if (e.target.tagName == 'TH') {
            switch(e.target.innerHTML) {
                case '数学':i = 'math';break;
                case '语文':i = 'chinese';break;
                case '英语':i = 'english';break;
                case '总分':i = 'total';break;
            }
            if ( k%2 == 0) {
                decreaseTb(data,i);
            } else {
                increaseTb(data,i)
            }
            k++;
            clearTable();
            renderTable(data);
        }
    });
    addEventHandler(document,'mousewheel',frozenTh);//task29
}
//升序
function increaseTb(data,key) {
    data.sort(function (a,b) {
        console.log(a[key]);
        return a[key] - b[key];
    });
    console.log(data);
    return data;
}
//降序
function decreaseTb(data,key) {
    data.sort(function(a, b){
        console.log(a[key]);
        return b[key] - a[key];
    });
    console.log(data);
    return data;
}
function addEventHandler(ele, event, hanlder) {
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder, false);
    } else if (ele.attachEvent) {
        ele.attachEvent("on"+event, hanlder);
    } else  {
        ele["on" + event] = hanlder;
    }
}
//下面这个是task29
function frozenTh() {
    console.log(myTable.offsetTop-document.body.scrollTop);
    var dis = myTable.offsetTop - document.body.scrollTop;
    if (dis <= 0) {
        myTable.getElementsByTagName('tr')[0].className = 'frozen';
        if (document.body.scrollTop > myTable.offsetHeight + 110) {
            myTable.getElementsByTagName('tr')[0].className = '';
        }
    } else{
        myTable.getElementsByTagName('tr')[0].className = '';
    }
}