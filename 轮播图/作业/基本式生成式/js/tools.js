
// 查询计算样式的兼容性方法
function getStyle(elem, prop) {
	if (window.getComputedStyle) {
		return window.getComputedStyle(elem, null)[prop];   
	} else {
		return elem.currentStyle[prop];
	}
}

//兼容查找className方法
Document.prototype.getByClassName = function (className) {
	var allDomArr = Array.prototype.slice.call(document.getElementsByTagName("*"), 0);
	var filterArr = [];
	function dealClass(dom) {
		var reg = /\s+/g;
		vararrClassName = dom.className.replace(reg, " ").trim();
	}
	allDomArr.forEach(function (elem, index) {
		var itemClassArr = dealClass(ele).split(" ");   //split拆分成数组方法
		for (var i = 0; i < itemClassArr.length; i++) {
			if (itemClassArr[i] == className) {
				filterArr.push(ele);
				break;
			}
		}
	})
	return filterArr;
}
// 绑定事件的兼容addEvent(elem, type, handle);方法
function addEvent(elem, type, handle) {
	if (elem.addEventListener) {
		elem.addEventListener(type, handle, false);
	} else if (elem.attachEvent) {
		elem.attachEvent("on" + type, function () {
			handle.call(elem);
		})
	} else {
		elem["on" + type] = handle;
	}
}

// 解除事件的兼容性函数
function removeEvent(elem, type, handle) {
	if (elem.removeEventListener) {
		elem.removeEventListener(type, handle, false);
	} else if (elem.datechEvent) {
	} else {
		elem.oncilck = false;
	}
}

// 取消冒泡的函数stopBubble(event);
function stopBubble(event) {
	if (event.stopPropagation) {
		event.stopPropagation();
	} else {
		event.cancelBubble = true;
	}
}


// 阻止默认事件的函数cancelHander(event);
function cancelHander(event) {
	if (event.preventDefault) {
		event.preventDefault();
	} else if (event.returnValue) {
		event.returnValue = false;
	}
}

// 寻找点击事件源对象方法
function onclickSound(e) {
	var event = e || window.event;
	var target = event.target || event.srcElement;
	consol.log(target);
}


// 工具下载完成再执行的兼容性方法	
	// url为外部的js文件,callback为当满足一定条件的回调函数
function loadScript(url, callback) {
	var script = document.createElement("script");
	script.type = "text/javascript";
	if (script.readState) {
		script.onreadystatechang = function () {
			if (script.readyState == "complete" || script.readyState == "loaded") {
				callback();
			}
		}
	} else {
		script.onload = function () {
			callback();
		}
	}
	script.src = url;//防止下载速度过快，导致readytate状态不发生改变
	document.head.appendChild(script);
}


// 查看滚动条X,Y的坐标的方法  
function getScrollOffset() {
	if (window.pageXOffset) {
		return {
			x: window.pageXOffset,
			y: window.pageYOffset
		}
	}else{
		return {
			x: document.body.scrollLeft + document.documentElement.scrollLeft,
			y: document.body.scrollTop + document.documentElement.scrollTop
		}
	}
}
// 用户查看可视窗口大小的方法
function getViewportOffset() {
	if (window.innerWidth) {
		return {
			w: window.innerWidth,
			h: window.innerHeight
		}
	} else {
		if (document.compatMode === "BackComapt") {         //判断怪异模式  向后兼容 + 注释1
			return {
				w: document.body.clientWidth,
				h: document.body.cilentHeight               //改位置判断不出来
			}
		} else {
			return {
				w: document.documentElement.clientWidth,
				h: document.documentElement.clientHeight
			}
		}
	}
}



	// 万能运动核心函数
function startMove(dom, attrObj, callback) {
	// attrObj为需要运动的属性的一个对象{left: 400, height: 400, opcity: 0.5}
	clearInterval(dom.timer);
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


// 浅克隆

function copy (target, origin) {
    var target = target || {};
	for (var key in origin){
		target[key] = origin[key];
    }
    return target;
}


// 深克隆

function deepClone (target, origin) {
	var target = target || {},
		toStr = Object.prototype.toString,
		arrStr = "[object Array]";
	for (var prop in origin) {
		if (origin.hasOwnProperty(prop)) {
			if (origin[prop] !== 'null' && typeof(origin[prop]) == 'object') {
			   target[prop] = (toStr.call(origin[prop])) == arrStr ?  [] : {}; 
				deepClone(target[prop], origin[prop]);
			}else{
				target[prop] = origin[prop];
			}
		}
	}
	return target;
}


// 封装一个myPush函数，实现类似push方法
Array.prototype.myPush =function () {
	for (i = 0; i < arguments.length; i++) {
		this[this.length] = arguments[i];
	}
	return this.length;
}



// 封装一个自己的typeof方法，实现可以返回具体的typeof值
function type (value) {
	var template = {
		"[object Array]" : "array",
		"[object Object]" : "object",
		"[object Number]" : "number - object",
		"[object Boolean]" : "boolean - object",
		"[object String]" : "string - object"
	}
	if (value === null) {
		return "null";
	}
	if (typeof(value) == "object") {
		var str = Object.prototype.toString.call(value);
		return template[str];
	}else {
		return typeof(value);
	}
}



// 在原型链上封装一个去重方法（数组和字符串均可使用）
Array.prototype.unique = function () {
	var target = {},
		arr = [],
		len = this.length;
	for (var i = 0; i < len; i++) {
		if (!target[this[i]]) {
			target[this[i]] = 'abc';
			arr.push(this[i]);
		}
	}
return arr;
}
		


// 封装自己的hasChildren()方法，不可使用children属性
Element.prototype.hasChildren = function () {
	var child = this.childNodes,
		len = child.length;
	for (i = 0; i < len; i++) {
		if (child[i].nodeType == 1) {
			return true;
		} 
	}
	return false;
}



// 编辑函数，封装myChildren功能，解决部分浏览器的兼容性问题
Element.prototype.myChildren = function () {
	var child = this.childNodes,
		len = child.length,
		arr = [];
	for (i = 0; i < len; i++) {
		if (child[i].nodeType == 1) {
			arr.push(child[i]);
		}
	}
	return arr;
}



// 遍历元素节点树
Object.prototype.node = function () {
	var child = this.children,
		len = child.length;
	if (child) {
		for (i = 0; i < len; i++) {  
			if (child[i].hasChildNodes == 1) {
				child[i].node();
			}else{
				console.log(child[i]);
			}
		}
	}   
}
      

// 封装函数，返回元素e的第n层祖先元素节点
function ancesterNode (target, n) {
	while (target && n) { 
		target = target.parentElement;
		n --;
	}
	return target;
}


//封装函数，返回元素e的第n个兄弟元素节点，n为正返回后面的兄弟元素节点，n为负返回前面的，n为0，返回自己。兼容IE老版本.
// methods one
function reSiblingNode (elem, n) {
	if (n > 0) {   
		while (n && elem) {
			if (elem.nextElementSibling) {
				elem = elem.nextElementSibling;
			}else{
	// 当执行到第一个elem为最后一个子元素节点的下一个兄弟元素节点，当该兄弟元素节点为文本节点时，接着执行循环。
	// 直到elem的取值将要越界时，elem此时为null，那么跳出循环
				for (elem = elem.nextSibling; elem && (elem.nodeType != 1); ) {
					elem = elem.nextSibling;
				}
			}
			n --;   
		} 
		return elem;
	}else if (n < 0) {
		while (n && elem) {
			if (elem.previousElementSibling) {
				elem = elem.previousElementSibling;
			}else {
				for (elem = elem.previousSibling; elem && (elem.nodeType != 1);) {
					elem = elem.previousSibling;
				}
			}                   
			n ++;
		} 
		return elem;        
	}
}
// methods two
function reSiblingNode (elem, n) {
	while (n && elem) {  
		if (n > 0) {
			if (elem.nextElementSibling) {
				elem = elem.nextElementSibling;
			}else{
				for (elem = elem.nextSibling; elem && elem.nodeType != 1;) {
					elem = elem.nextSibling;
				}
			}
			n --;
		}else {
			if (elem.previousElementSibling) {
				elem = elem.previousElementSibling;
			}else{
				for (elem = elem.previousSibling; elem && elem.nodeType != 1;) {
					elem = elem.previousSibling;
				}
			}
			n ++;
		}
	}
	return elem;
}
















