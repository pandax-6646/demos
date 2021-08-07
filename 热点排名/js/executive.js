( function (data) {

// 初始换变量   即从外往里选标签
    var $Wrapper = $('.wrapper');
    var $ShowSection = $Wrapper.find('.showSection');

// 热点前三的颜色
    var colorsArray = ['#f54545', '#ff8547', '#ffac38'];

// 用一个索引记录一页的数据
// 第一页   1 ~ 10   
// 第二页   11 ~ 20
// 第三页   21 ~ 30
//   ...      ...
//   ...      ...
// 第N页    (N - 1) * 10 + 1 ~ n * 10


    //页码索引
    var curPage = 0;


    // 总共页数
    var totalPage  = Math.ceil(data.length / 10);

    // 初始化隐藏数据
    $ShowSection.hide();

    // 绑定点击事件
    function bindEvent () {
        $Wrapper.find('.change').on('click', function (){

            // 当在最后一页点击换一换切换到第一页
            curPage = ++curPage % totalPage;

            // 点击翻页重新渲染页面
            randerPage(data);
        })
    }
    function randerPage (data) {

    // 隐藏前一页的数据
    $ShowSection.hide().find('.showItem').remove();

    // 控制每页应该渲染多少数据
    var len = (data.length - curPage * 10) >= 10 ? 10 : data.length - curPage * 10;

    // 拿到当前页渲染的数据
    for (var i = 0; i < len; i++) {

        // 克隆模板并修改class类名
        var $Clone = $Wrapper.find('.tpl').clone().removeClass('tpl').addClass('showItem');
       
        //每页第一条数据
        var ele = data[i + curPage * 10];       
        $Clone.children('span').eq(0)

            //加前面的排名数字并给前三加上不同的颜色
            .text(i + curPage * 10 + 1).css('backgroundColor', curPage == 0 && colorsArray[i + curPage])   
                 .next()  
                    .text(ele.title)
                        .next()
                            .text(ele.search)
                                .addClass(ele.search > ele.hisSearch ? 'up' : 'down');
                                    
            // 向页面插入克隆的数据
            $ShowSection.append($Clone);
        }
        $ShowSection.fadeIn();
    }
    // 事件绑定在所有HTML结构渲染出来之后
    bindEvent();
    randerPage(data);
})(data);