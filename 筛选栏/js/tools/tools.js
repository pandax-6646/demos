// 查询计算样式的兼容性方法
function getStyle(elem, prop) {
	if (window.getComputedStyle) {
		return window.getComputedStyle(elem, null)[prop];   //或.prop也行
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
	if (event.stopPropagation()) {
		event.stopPropagation;
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
function onclickSound(event) {
	var event = e || window.event;
	var target = event.target || event.srcElement;
	consol.log(target);
}



// 工具下载完成再执行的兼容性方法	
function loadScript(url, callback) {
	var script = document.createElement("script");
	script.type = "text/javascript";
	if (script.readtate) {
		script.onreadystatechange = function () {
			if (script.readystate == "complete" || script.readystate == "loaded") {
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
	} else {
		return {
			x: document.body.scrollLeft + document.documentElement.scrollLeft,
			y: document.body.scrollTop + document.documentElement.scrollTop
		}
	}
}



// 用户查看可视窗口大小的方法
function getViewportOffset() {
	if (0 && window.innerWidth) {
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



// 数组去重
Array.prototype.removeRepeat = function () {
	var len = this.length;
	var obj = {};
	var arr = [];
	for (var i = 0; i < len; i++) {
		if (!obj[this[i]]) {
			obj[this[i]] = this[i];
			arr.push(this[i]);
		}
	}
	return arr;
}



// 轮播图
function getStyle(elem, attr) {
	if (window.getComputedStyle) {
		return window.getComputedStyle(elem, null)[attr];   //或.prop也行
	} else {
		return elem.currentStyle[attr];
	}
}
function startMove(obj, attr, func) {
	clearInterval(obj.timer);
	var iSpeed;
	var iCur;
	var name;
	startTimer = obj.timer = setInterval(function () {
		var bStop = true;
		for (var attr in data) {
			if (attr === "opacity") {
				name = attr;
				iCur = parseFloat(getStyle(obj, attr)) * 100;
			} else {
				iCur = parseInt(getStyle(obj, attr));
			}
			iSpeed = (data[attr] - iCur) / 8;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			if (iSpeed > 0) {
				iSpeed = Math.ceil(iSpeed);
			} else {
				iSpeed = Math.floor(iSpeed);
			}
			if (attr === "opacity") {
				obj.style.opacity = (iCur + iSpeed) / 100;
			} else {
				obj.style[attr] = iCur + iSpeed + "px";
			}
			if (Math.floor(Math.abs(data[attr] - iCur)) != 0) {
				bStop = false;
			}
		}
		if (bStop) {
			clearInterval(obj.timer);
			if (name === "opacity") {
				obj.style.opacity = data[name] / 100;
			}
			func();
		}
	}, 30);
}



// 封装函数insetAfter();功能类似insetBefore();使一个新建立的元素在已知元素之后
Element.prototype.insetAfter = function (targetNode, newNodeAfter) {//after 之后  before 之前  target  目标//
	var afterNode = targetNode.nextElementSibling;
	if (afterNode == null) {
		this.appendChild(newNodeAfter);
	} else {
		this.inserBefore(newNodeAfter, afterNode);
	}
}



// 深度克隆
function clone(target, orange) {

	// 兼容用户不传克隆好的东西
	var target = target || {};

	// 判断要克隆的是数组还是对象的方法
	var toStr = Object.prototype.toString;

	// 将判断要克隆的是数组的条件存一下
	var str = "[object Array]"

	// 遍历要克隆的数据
	for (var prop in orange) {

		// 剔除原型上的属性
		if (orange.hasOwnProperty(prop)) {

			// 剔除除null外的原始值
			if (orange !== null && typeof (orange[prop]) == "object") {

				// 用储存的方法和条件值判断要克隆的是数组还是对象
				target[prop] = toStr.call(orange[prop]) == str ? [] : {};

				// 递归克隆对象里还有对象的情况
				clone(target[prop], orange[prop])
			} else {

				// 原始值直接克隆
				target[prop] = orange[prop];
			}
		}
	}

	// 最后返回克隆好的数据
	return target;
}



// forEach源码
Array.prototype.ForEach = function (func) {
	var _arr = clone([], this), len = _arr.length, param2 = arguments[1] || window;
	for (var i = 0; i < len; i++) {
		func.call(param2, _arr[i], i, _arr);
	}
}

// filter源码
Array.prototype.filter = function (func) {
	var _arr = clone([], this), len = _arr.length, param2 = arguments[1] || window, newArr = [];
	for (var i = 0; i < len; i++) {
		func.apply(param2, [_arr[i], i, _arr]) ? newArr.push(clone(_arr[i])) : "";
	}
	return newArr;
}

// map源码
Array.prototype.map = function (func) {
	var _arr = clone([], this), len = _arr.length, param2 = arguments[1] || window, newArr = [];
	for (var i = 0; i < len; i++) {
		newArr.push(func.apply(param2, [_arr[i], i, _arr]));
	}
	return newArr;
}

// every源码
Array.prototype.every = function (func) {
	var _arr = clone([], this), len = _arr.length, param2 = arguments[1] || window, flag = true;
	for (var i = 0; i < len; i++) {
		if (!func.apply(param2, [_arr[i], i, _arr])) {
			flag = false;
			break;
		}
	}
	return flag;
}


// some源码
Array.prototype.some = function (func) {
	var _arr = clone([], this), len = _arr.length, param2 = arguments[1] || window, flag = false;
	for (var i = 0; i < len; i++) {
		if (func.apply(param2, [_arr[i], i, _arr])) {
			flag = true;
			break;
		}
	}
	return flag;
}


// reduce源码
Array.prototype.myReduce = function (func, initialValue) {
	var _arr = clone([], this), len = _arr.length, param2 = arguments[2] || window;
	for (var i = 0; i < len; i++) {
		initialValue = func.apply(param2, [initialValue, _arr[i], i, _arr]);
	}
	return initialValue;
}


// 区间随机数
function definedMandow(start, final) {
	var len = final - start;
	return Math.ceil(Math.random() * len + start);
}



//拖拽函数
function drag(dom) {
	var disX;
	var disY;
	dom.onmousedown = function (e) {
		disX = e.pageX - dom.offsetLeft;
		disY = e.pageY - dom.offsetTop;
		document.onmousemove = function (e) {
			dom.style.left = e.pageX - disX + "px";
			dom.style.top = e.pageY - disY + "px";
			// console.log({'x' : e.pageX, 'y' : e.pageY});
		}
		document.onmouseup = function () {
			document.onmousemove = false;
			document.onmousedown = false;
		}
	}
}



//拖拽函数
// $.fn.extend({
// 	drag: function () {
// 		var disX, disY, self = this;;
// 		$(this).on('mousedown', function (e) {
// 			disX = e.pageX - $(this).offset().left;
// 			disY = e.pageY - $(this).offset().top;
// 			$(document).on('mousemove', function (e) {
// 				$(self).css({ left: e.pageX - disX, top: e.pageY - disY });
// 			})
// 			$(document).on('mouseup', function () {
// 				$(document).off('mousemove').off('mouseup');
// 			})
// 		})
// 	}
// })



//拖拽函数
var drag = {
	init: function (dom) {
		this.dom = dom;
		this.disX;
		this.disY;
		this.bindMousedownEvent();
		self = this;
	},
	bindMousedownEvent: function () {
		this.dom.onmousedown = this.mouseDown.bind(this);
	},

	mouseDown: function (e) {
		document.onmousemove = this.mouseMove.bind(this.dom);
		document.onmouseup = this.mouseUp.bind(this.dom);
		this.disX = e.pageX - this.dom.offsetLeft;
		this.disY = e.pageY - this.dom.offsetTop;
	},

	mouseMove: function (e) {
		this.style.left = e.pageX - self.disX + "px";
		this.style.top = e.pageY - self.disY + "px";
	},

	mouseUp: function () {
		document.onmousemove = false;
		document.onmousedown = false;
	}
}



// 防抖函数   (一段时间内的多次触发只执行最新一次）
function debounce(handle, delay) {
	var timer = null;
	return function () {
		var _self = this;
		var _arg = arguments;
		clearTimeout(timer);
		timer = setTimeout(function () {
			handle.apply(_self, _arg);
		}, delay)
	}
}



// 节流函数（一次触发并执行后，过一段时间后才可以触发）
function throttle(handle, wait) {
	var lastTime = 0;
	return function (e) {
		var newTime = new Date().getTime();
		if (newTime - lastTime > wait) {
			handle.apply(this, arguments)
			lastTime = newTime;
		}
	}
}



// 封装ajax请求函数
function ajax(method, url, data, callback, time, flag) {

	// method 请求方式    url 请求数据地址      data 请求的数据     callback 请求回来的数据处理函数      time超时时间    flag 是否异步

	var xhr = null;

	// 兼容各浏览器ajax对象的方法
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		xhr = new ActiveXObject('Microsoft.XMLHttp');
	}

	// 兼容请求方式大小写
	method = method.toUpperCase();

	// 判断为何种请求
	if (method == "GET") {
		// get请求的文件
		xhr.open(method, url + '?' + data, flag);

		// 发送请求
		xhr.send();
	} else if (method == "POST") {

		// 异步get请求的文件
		xhr.open(method, url, flag);

		// 设置post请求头
		xhr.setRequestHeader('Content-type', 'application/X-www-form-urlencoded');

		// 发送请求
		xhr.send(data);
	}

	// 监听状态的改变，请求成功后执行回调函参数为服务器返回的数据
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				callback(xhr.responseText);
			} else {
				alert('服务器繁忙，请稍后重试');
			}
		}
	}

	setTimeout(function () {
		xhr.abort();
	}, time);
}



// 封装管理cookie的函数
manageCookie = {
	setCookie: function (name, value, time) {
		document.cookie = name + '=' + value + ';max-age=' + time;
		return this;
	},
	removeCookie: function (name) {
		return this.setCookie(name, '', -1);
	},
	getCookie: function (name, callback) {
		var allCookieArr = document.cookie.split('; ');
		for (var i = 0; i < allCookieArr.length; i++) {
			var itemCookieArr = allCookieArr[i].split('=');

			// 找到
			if (itemCookieArr[0] == name) {
				callback(itemCookieArr[1]);
				return this;
			}
		}

		// 没找到
		callback('undefined');
		return this;
	}
}



// $.extend({
// 	dafinedMandom: function (start, final) {
// 		var len = final - start;
// 		return Math.random() * len + start;
// 	}
// })




