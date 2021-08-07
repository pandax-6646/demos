// 查询计算样式的兼容性方法
function getStyle(elem, prop) {
	if (window.getComputedStyle) {
		return window.getComputedStyle(elem, null)[prop];   
	} else {
		return elem.currentStyle[prop];
	}
}

// 轮播图运动核心
function starMove (elem, target, callback) {

    // 当上一个定时器的停止条件满足时，那么该句不会执行
    clearInterval(elem.timer);
    var iSpeed, iCur, target;
    elem.timer = setInterval(function () {

        //每开启一个定时器前，假设当满足某种条件该定时器可以停止
        var bStop = true;
        iCur = parseInt(getStyle(elem, "left"));   
        iSpeed = iSpeed > 0 ?  Math.ceil((target - iCur) / 7) : Math.floor((target - iCur) / 7);
        elem.style.left = iCur + iSpeed + "px";

        // 当left属性的当前值没有到达目标值时，定时器不关闭
        if (iCur != target) {
            bStop = false;
        } 

        // 判断当前条件下是否可以关闭定时器，如果在定时器外面判断该条件是否满足，那么这个定时器会一直存在
        if (bStop) {
            clearInterval(elem.timer)
            typeof(callback) == "function" && callback(); 
        }    
    }, 30)
}

var oUl = document.getElementsByTagName('ul')[0];
var bUl = document.getElementsByClassName('bottom')[0];
var moveWidth = oUl.children[0].offsetWidth;
var btnLeft = document.getElementsByClassName("btn-left")[0];
var btnRight = document.getElementsByClassName("btn-right")[0];
var num = oUl.children.length - 1;
var timer = null;
var child = bUl.children;
var len = child.length; 
// 给运动函数上锁
var lock = true;
var index = 0;

// 当点击图片左右两边按钮时
btnLeft.onclick = function () {
    autoMove("<");
}
btnRight.onclick = function () {
    autoMove(">");
}

// 点击图片下面的小圆点时
for (var i = 0; i < len; i ++) {
    (function (myIndex) {
        child[myIndex].onclick = function () {
            // alert(myIndex)
            lock = false;
            clearTimeout(timer);
            index = myIndex;
            starMove(oUl, - moveWidth * myIndex, function () {
                lock = true;
                timer = setTimeout(autoMove, 1000);
                changeIndex(index);
            })
        }
    }(i))
}

// 运动主函数
function autoMove (direction) {
    if (lock) {

        // 当发生点击事件或默认让图片运动时，立马给运动函数上锁
        lock = false;

        // 防止自动轮播与点击轮播同时存在发生冲突，即当发生点击轮播时，清除自动轮播的定时器，
        // 当自动轮播时该句不发生作用。
        clearTimeout(timer);
        
        // 默认轮播方向和点击图片右侧的按钮
        if (!direction || direction == ">") {
            index++;
            starMove(oUl, oUl.offsetLeft - moveWidth, function () {
                if (oUl.offsetLeft == - moveWidth * num){
                    index = 0;
                    oUl.style.left = "0px";
                }
                // 重新开启一个新的自动轮播的定时器
                timer = setTimeout(autoMove, 1000);

                // 当前图片运动到目标点时，进行开锁
                lock = true;
                changeIndex(index);
            })
            
        // 点击图片左侧按钮
        }else if(direction == "<") {
            // 当一刷新页面就立即点击左侧按钮时
            if (oUl.offsetLeft == 0){
                oUl.style.left = - moveWidth * num + "px";
                index = num;
            }
            index--;
            starMove(oUl, oUl.offsetLeft + moveWidth, function () {
    
                // 当不写这条语句时，可理解为该自动轮播已转为点击事件轮播
                timer = setTimeout(autoMove, 1000);
                lock = true;
                changeIndex(index);
            })
        }
    }
}

// 小圆点跟随图片运动
function changeIndex (index) {
    var child = bUl.children;
    var len = child.length; 
    for (var i = 0; i < len; i++) {
        child[i].className = "";
    }
    child[index].className = "active";
}

timer = setTimeout(autoMove, 1000);










// //这里为简陋版本，只实现了自动轮播和下面小圆点跟随运动，如果运行下面的代码需要注释掉上面   “轮播图运动核心”代码   “当点击图片左右两边按钮时”代码
// // “点击图片下面的小圆点时”代码   “运动主函数” 代码 和 第131的代码。

// // 获取有多少张图片
// var len = oUl.children.length;
// // 计数器，每轮播一张图片加 1；
// var num = 0;
// // 运动主函数
// function startMove () {
//     var iSpeed, iCur, target;
//     oUl.timer = setInterval(function () {
//         // 获取当前Ul距离左边框的left的长度
//         iCur = oUl.offsetLeft;  
//         // 获取该目标点的ul距离左边框的left的长度
//         target = - oUl.children[0].offsetWidth * num;
//         iSpeed = (target- iCur) / 7; 
//         iSpeed = iSpeed > 0 ?  Math.ceil((target - iCur) / 7) : Math.floor((target - iCur) / 7);
//         oUl.style.left = iCur + iSpeed + "px";
//         if (iCur == target) {
//             clearInterval(oUl.timer);
//             num++;
//             index++;                //每运动完一张图片都让小圆点当前需要标记的索引加1
//             // 与外部循环定时器配合，起到循环调用主函数的作用
//             var tiemr = setTimeout(function () {
//                 // 当运动到最后一张图片时，闪回第一张图片，并把计数器改为 1
//                 if(num % len == 0) {
//                     clearInterval(oUl.timer);
//                     oUl.style.left = "0px";
//                     num = 1;   
//                     index = 0;          //小圆点清零
//                 }
//                 changeIndex(index);
//                 startMove()
//             }, 500);     
//         }
//     }, 50)
// }
// // 初始化函数
// var timer = setTimeout(function () {
//         startMove();
//         num++;
//     }, 500)


