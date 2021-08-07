// 点击性别按钮时css样式改变函数
function changeSexStyle (currActiveBtn) {

    // 把上次被点击的具有active属性元素的样式清除
    lastActiveBtn.className = "";

    // 只有age按钮被点击才会有修改作用，否则一直都是only
    ageBtn.className = "only";

    // 当前被点击的元素具有active样式
    currActiveBtn.className = "active";

    // 更新上次被点击的具有active属性元素，以便后续点击操作
    lastActiveBtn = currActiveBtn;
}