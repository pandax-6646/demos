// 轮播运动逻辑函数
function getStyle(elem, prop) {// 查询计算样式的兼容性方法
    if (window.getComputedStyle) {
        return window.getComputedStyle(elem, null)[prop];   
    } else {
        return elem.currentStyle[prop];
    }
}
// 轮播图缓冲运动核心
function startMove(dom, attrObj, callback) {
    // attrObj为需要运动的属性和目标值的一个对象{left: 400, height: 400, opcity: 0.5}
    clearInterval(dom.timer);       //保证同一时间只有一个运动函数执行
    var iSpeed = null,
    // iCur记录attrObj的某一属性的当前值
        iCur = null;
        dom.timer = setInterval(function () {
            var bStop = true;
            for (var attr in attrObj) {
                if (attr === "opacity") {
                    iCur = parseFloat(getStyle(dom, attr)) * 100;
                } else {
                    iCur = parseInt(getStyle(dom, attr));
                }
                iSpeed = (attrObj[attr] - iCur) / 8;
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                if(attr === "opacity"){
                    dom.style.opacity = (iCur + iSpeed) / 100;
                }else{
                    dom.style[attr] = iCur + iSpeed + "px";
                }
                // 判断如果有一个属性的当前值不等于目标点时，那么不清除定时器
                if(iCur != attrObj[attr]){
                    bStop = false;
                }
            }
            if(bStop){
                clearInterval(dom.timer);
                typeof callback == "function" && callback();
            }
    }, 30);	
}