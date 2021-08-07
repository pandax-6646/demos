let $inspectors = $('.inspectors');
let $Span = $inspectors.find('span');
let $LiList = $('li');

let num = 0;

let timer;


// 轮播运动函数
function sliderShow(index) {


    let len = $LiList.length;

    // 正中展示的图片索引
    index = index % len;

    // 左图片的索引
    let prevIndex = (index - 1) < 0 ? len - 1 : index - 1;

    // 有图片的索引
    let nextIndex = (index + 1) == len ? 0 : index + 1;

    // 清除上次轮播的class类名
    $LiList.removeClass();

    // 添加当前这次轮播的类名
    $($LiList[prevIndex]).addClass('action-L');
    $($LiList[index]).addClass('action-M');
    $($LiList[nextIndex]).addClass('action-R');


    // 小圆点跟随图片运动
    $Span.removeClass('active');
    $Span.eq(index).addClass('active');


    // 背景图片跟随切换
    $('.bg').css('background-image', 'url(' + $LiList.eq(index).find('img').prop('src') + ')');


}


// 小圆点点击后带动图片轮播
$Span.click(function (e) {

    // 获取当前点击到的元素在父级的索引
    num = $(e.target).index();
    sliderShow(num);
    num++;
})



// 自动轮播
function autoSlider() {
    timer = setInterval(function () {
        sliderShow(num);
        num++;
    }, 2000);
}



// 鼠标移入停止轮播移出继续正常轮播
$('.wrapper').mouseenter(function () {
    clearInterval(timer);
}).mouseleave(function () {
    autoSlider();
})



// 默认启动自动轮播
autoSlider();
