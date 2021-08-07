function combineFilter (config) {

	// 返回一个闭包
	return function (data) {
		
		// 循环执行所有操作数据的方法，
		for (var prop in config) {
			// console.log(prop, config, config[prop], state[prop]);

			

			// data作为被接力筛选和排序的对象，被筛选方法实时更新，虽然sortByAge方法只有一个实参，但并不影响函数执行，第二个形参会被忽略
			
			data = config[prop](data, store.getState(prop));
		}

		// 将最后得到的数据返回出来
		return data;
	}
}

// 存储一些筛选数据方法
var lastFilter = combineFilter({
	text: filterArrByText,
	sex: filterArrBySex,
	age: sortByAge
})
