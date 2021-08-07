// 创建管理数据的函数
function createStore (initialStare) {

	// 兼容用户不传过滤条件
	var state = initialStare || {};

	// 储存订阅过的函数
	var list = [];

	// 获取状态
	function getState (type) {
		return state[type];
	}
	

	// 当状态发生改变，分发特定行为行为功能
	function dispatch (action) {

		state[action.type] = action.value;

		// 调用之前订阅过的函数
		list.forEach(function (ele) {
			ele();
		})

 	}

 	// 订阅函数功能
 	function subscribe (func) {
 		list.push(func);
 	}



	return {

		getState: getState,
		dispatch: dispatch,
		subscribe: subscribe
	}
}

var store = createStore({text : "", sex : "All", age: ""});