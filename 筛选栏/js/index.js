
    // 项目优化点：
        // .筛选条件增加导致行为增加如何进行统一管理
        // .诸多状态如何管理
        // .行为频繁触发操作DOM如何提高性能

    // redux里的状态管理思想和一些设计模式思想    


// initial variable
var oUl = document.getElementsByTagName("ul")[0];
var oInput = document.getElementsByTagName("input")[0];
var ageBtn = document.getElementsByClassName("only")[0]; 



store.subscribe(function () {

    // 每次一个状态改变后更新视图的作用
    randerPage(lastFilter(personArr));
    
})



// 数据渲染到页面
function randerPage (data) {
    // 遍历数据，并把数据填入页面之中
    var htmlStr = "";

    // 防止请求数据不成功导致出BUG
    oUl.innerHTML = "";
    data.forEach(function (ele, index, self) {

        // 字符串拼接方法
        htmlStr += "<li><img src='./img/1.png'><p class='name'>" + ele.name + "</p><p class='age'>" + ele.age + "</p><p class='say'>" + ele.email + "</p>";
    });

    // 将拼接好的字符串插入到页面中
    oUl.innerHTML = htmlStr;
}

// 首次渲染得到初始页面
randerPage(personArr);





// 添加行为

// 输入框行为
oInput.oninput = debounce(function () {

    console.log(111)

     // 获取输入框的状态，并为其分发行为函数，
    store.dispatch({type: "text", value: this.value})

},500)





// btn varible
// 原生方法获取到一堆的DOM元素时，得到的是个类数组
var oBtnArr  = [].slice.call(document.getElementsByTagName("button"), 0);

 //获取上一次具有被点击样式的元素
var lastActiveBtn = document.getElementsByClassName("active")[0];        
  

// btn 点击样式行为

// 注册事件
oBtnArr.forEach(function(ele, index, self) {
    ele.onclick = function () {
        var len = self.length;
        var data = personArr;
        if (ele.innerText != "age") {

            // 当一点击性别，css样式就发生改变
            changeSexStyle(this);

            // 获取性别的状态，（当前被点击的性别）并为其分发行为函数，
            store.dispatch({type: "sex", value: ele.innerText})

        }else{

            // 当一点击年龄，css样式就发生改变
            changeAgeStyle(this);

            // 年龄不用更新，因为排序函数都在combineFilter里最后执行，执行时会顺利地拿到按Sex筛选出的数据或者是初始数据然后进行排序

            // 获取状态，并为其分发行为函数，
            store.dispatch({type: "age", value: data})
        }
    }
})

