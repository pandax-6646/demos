var oUl = document.getElementsByClassName('sliderPageTop')[0];
var oBottom = document.getElementsByClassName('sliderPageBottom')[0];
var moveWidth = oUl.children[0].offsetWidth;
var btnLeft = document.getElementsByClassName("btn-left")[0];
var btnRight = document.getElementsByClassName("btn-right")[0];
var num = oUl.children.length - 1;
var timer = null;
var child = oBottom.children;
var len = child.length; 

// 给运动函数上锁
var lock = true;

// 小圆点根据index索引进行运动
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
            // alert(myIndex)  点击到那个小圆点时，就运动到该圆点索引
            lock = false;
            clearTimeout(timer);
            index = myIndex;
            startMove(oUl,{left : - moveWidth * myIndex}, function () {
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
            startMove(oUl, {left : oUl.offsetLeft - moveWidth}, function () {
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
                oUl.style.left = - moveWidth * num + "px";       //在第一张图片刚要运动前，让整个ul闪到最后一张图片
                index = num;                                     //实时更新小圆点的位置
            }
            index--;
            startMove(oUl, {left : oUl.offsetLeft + moveWidth}, function () {
    
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
    var child = oBottom.children;
    var len = child.length; 
    for (var i = 0; i < len; i++) {
        child[i].className = "";
    }
    child[index].className = "active";
}

timer = setTimeout(autoMove, 1000);
