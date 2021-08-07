// 根据年龄对数据进行排序
function sortByAge (data) {

	// 当点击age按钮就执行排序函数,
	if (ageBtn.className == "age") {
		var arr = [];
		// 需要排序时，用克隆的数据操作
		clone(arr, data).sort(function (a, b) {

        // 从小到大排
        return a.age - b.age;
		});

		// 返回排好序的克隆数据
		return arr
	}

	// 如果不点击就返回原数据，以便后续接力筛选操作
		return data;
}  