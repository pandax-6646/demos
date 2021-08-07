window.onload = () => {

	let data;
	let dataStr = localStorage.getItem('todoList');
	// 获取要渲染的数据
	if (dataStr) {
		data = JSON.parse(dataStr);
	} else {
		data = [];
	}

	let oTodoList = document.getElementsByClassName('todo-list')[0];
	let oToggleAll = document.getElementsByClassName('toggle-all')[0];
	let oNewTodo = document.getElementsByClassName('new-todo')[0];
	let oTodoCount = document.getElementsByClassName('todo-count')[0].getElementsByTagName('strong')[0];
	let oFiltersList = document.getElementsByClassName('filters')[0].getElementsByTagName('a');
	let oClearCompleted = document.getElementsByClassName('clear-completed')[0];



	// 数据渲染函数
	function rander(data) {
		if (data.length == 0) {
			return;
		}
		let str = '';
		let count = 0;
		let randerData = null;
		oTodoList.innerHTML = '';

		// 对数据进行筛选
		switch (location.hash) {

			// 待办
			case '#/active':
				randerData = data.filter(function (value, index) {
					return !value.done;
				})
				break;

			// 已完成
			case '#/completed':
				randerData = data.filter(function (value, index) {
					return value.done;
				})
				break;
			default:
				randerData = data;
		}




		for (let i = 0; i < randerData.length; i++) {
			str += `
				<li data-id=${randerData[i].id} class=${randerData[i].done ? "completed" : ""} >
					<div class="view">
						<input class="toggle" type="checkbox" ${randerData[i].done ? "checked" : ''}>
						<label>${randerData[i].todo}</label>
						<button class="destroy"></button>
					</div>
					<input class="edit" value="${randerData[i].todo}">
				</li>`
		}

		// 展示剩余未完成待办数量的功能
		randerData.forEach(value => {
			if (value.done == false) {
				count++;
			}
		})

		oTodoCount.innerHTML = count;
		oTodoList.innerHTML = str;
	}




	// 给ul绑定事件，将li里的事件冒泡执行
	oTodoList.addEventListener('click', (e) => {

		// 记录当前点击到的li的索引
		let id = e.target.parentElement.parentElement.getAttribute('data-id');
		let temp = data.find(value => value.id == id);

		// 只将完成待办的复选框点击事件冒泡执行
		if (e.target.className == 'toggle') {

			// 待办事项完成,即将点击到的复选框选中，然后再重新渲染
			temp.done = e.target.checked;

			// 当先代办完成后判断是否触发全选按钮
			if (data.every(value => value.done) == true) {
				oToggleAll.checked = true;
			} else {
				oToggleAll.checked = false;
			}

			// 当数据发生修改就要把数据存储到localStorage中
			localStorage.setItem('todoList', JSON.stringify(data));
			rander(data);
		}


		// 删除待办功能
		if (e.target.className == 'destroy') {
			data.splice(data.indexOf(temp), 1);

			// 当数据发生修改就要把数据存储到localStorage中
			localStorage.setItem('todoList', JSON.stringify(data));
			rander(data);
		}


		// 单击可以编辑待办
		if (e.target.tagName == 'LABEL') {

			// 待办编辑框展示
			e.target.parentElement.parentElement.className += ' editing';

			// 让文本框自动选中
			let oInput = e.target.parentElement.parentElement.getElementsByClassName('edit')[0];
			oInput.focus();

			// 调整输入框的光标到文字最右边
			oInput.setSelectionRange(-1, -1);
		}
	})




	oTodoList.addEventListener('keyup', (e) => {

		// 获取当前选中的重新编辑输入框的索引
		let id = e.target.parentElement.getAttribute('data-id');

		// 根据索引找到待办项li
		let temp = data.find(function (value) {
			return value.id == id;
		})

		// 将重新编辑过的待办项进行赋值
		if (e.target.className == 'edit' && e.keyCode == 13) {
			temp.todo = e.target.value;

			// 当数据发生修改就要把数据存储到localStorage中
			localStorage.setItem('todoList', JSON.stringify(data));
			rander(data);
		}
	})


	// 实现待办的全选和反选功能
	oToggleAll.addEventListener('change', () => {
		data.forEach(value => value.done = oToggleAll.checked);

		// 当数据发生修改就要把数据存储到localStorage中
		localStorage.setItem('todoList', JSON.stringify(data));
		rander(data)
	})




	// 添加待办功能
	oNewTodo.addEventListener('keyup', e => {
		if (e.key == 'Enter') {
			let obj = {
				id: data.length == 0 ? 1 : data[data.length - 1].id + 1,
				todo: e.target.value,
				done: false,
			}
			data.push(obj);

			// 当数据发生修改就要把数据存储到localStorage中
			localStorage.setItem('todoList', JSON.stringify(data));
			rander(data);

			// 待办创建完毕清除输入框
			e.target.value = '';
		}
	})



	// 三个按钮的筛选功能
	window.onhashchange = function () {
		// a标签样式class类名的修改
		Array.from(oFiltersList).forEach(function (value, index) {
			if (value.hash == location.hash) {
				document.getElementsByClassName('selected')[0].className = '';
				oFiltersList[index].className = 'selected';
			}
		})


		// 重新渲染数组
		rander(data);
	}





	// 一键清除完成事项功能
	oClearCompleted.onclick = function (e) {
		data = data.filter(function (value) {
			return !value.done;
		})

		// 当数据发生修改就要把数据存储到localStorage中
		localStorage.setItem('todoList', JSON.stringify(data));
		rander(data);
	}

	
// 取消重新编辑待办项的聚焦事件，blur失焦事件无法冒泡，可用focusout代替
oTodoList.addEventListener('focusout', function (e) {
	

	if (e.target.className == 'edit') {

 		// 将li上editing的类名删掉
		let str = e.target.parentElement.getAttribute('class')
		e.target.parentElement.className = str.replace(' editing', '')
	}
})

	rander(data);
}