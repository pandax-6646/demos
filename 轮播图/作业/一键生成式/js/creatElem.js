// 标签创建逻辑 
function creatElem (dom, target) {
    
    //图片部分ul标签
    sliderTop = document.createElement("ul");
    sliderTop.setAttribute("class", "sliderPageTop");

    //小圆点部分ul标签
    var sliderBottom = document.createElement("ul");
    sliderBottom.setAttribute("class", "sliderPageBottom");
    var leng = target.length;
    // 循环创建出个li
    for (var i = 0; i < leng; i++) {

        //图片部分li标签插入图片部分ul标签内
        sliderTop[i] = document.createElement("li"); 
        var img = document.createElement("img");
        img.setAttribute("src", target[i]);
        sliderTop[i].appendChild(img);
        sliderTop.appendChild(sliderTop[i]);

        //小圆点部分li标签插入小圆点部分ul标签内
        sliderBottom[i] = document.createElement("li"); 
        sliderBottom.appendChild(sliderBottom[i]);

    }
    
    // 因为n张图的轮播需要n+1个li来装图片，而小圆点只要n个，但进过上面for循环操作后只创建了n个li，所以还需手动再创建一个li
    
    sliderTop[leng] = document.createElement("li");
    var imgLast = document.createElement("img");
    imgLast.setAttribute("src", target[0]);
    sliderTop[leng].appendChild(imgLast);
    sliderTop.appendChild(sliderTop[leng]);

    

    // 图片部分ul标签插入div标签里
    dom.appendChild(sliderTop);
    
    // 在div标签里创建图片两边的按钮span标签并插入
    var buttonLeft = document.createElement("sapn");
    var buttonRight = document.createElement("span");
    dom.appendChild(buttonLeft);
    dom.appendChild(buttonRight)
    buttonLeft.setAttribute("class", "btn btn-left");
    buttonRight.setAttribute("class", "btn btn-right");
    buttonLeft.innerHTML = "&lt";
    buttonRight.innerHTML = "&gt";

    // 小圆点部分的第一个li初始化为选中
    sliderBottom[0].setAttribute("class", "active");
    
    // 小圆点部分ul标签插入div标签里
    dom.appendChild(sliderBottom);

    // 创建style标签
    var style = document.createElement("style");

    // 给创建好的标签添加样式逻辑
        // 图片标签样式
        style.innerHTML = "* {padding: 0px; margin: 0px; list-style: none}" + 
            ".wrapper {height: 350px; width: 500px; position: relative; margin: 150px auto; overflow: hidden; border: 1px solid black;}" + 
            ".wrapper .sliderPageTop {position: absolute; height: 350px; top: 0px; left: 0px;}" + 
            ".wrapper .sliderPageTop li {float: left; height: 350px; width: 500px;}" + 
            ".wrapper .sliderPageTop li img{width: 100%; height: 100%;}" + 

            // 按钮span标签样式
            ".wrapper .btn{height: 36px; width: 50px; position: absolute; background-color: black; top: 50%; margin-top: -25px; color: #fff; text-align: center; line-height: 36px; border-radius: 50%; opacity: 0.2; font-size: 25px;}" + 
            ".wrapper .btn:hover{opacity: 0.5;cursor: pointer;}" + 
            ".wrapper .btn-left{left: 20px;}" + 
            ".wrapper .btn-right{right: 20px;}" + 

            // 小圆点部分标签样式
            ".wrapper .sliderPageBottom{position: absolute; height: 10px; left: 50%; margin-left: -45px; bottom: 30px; }" + 
            ".wrapper .sliderPageBottom li{float: left; height: 10px; width: 10px; background-color: #c7c2c2; margin-right: 5px; border-radius: 50%;}" + 
            ".wrapper .sliderPageBottom .active{background-color: #f40;}"; 

    
        
        //根据传入的图片数量的不同，控制ul的宽度足以容纳这些图片
        var liWidth = parseInt(getStyle(sliderTop.children[0], "width"));
        sliderTop.style.width = liWidth * (sliderTop.children.length ) + "px";
        console.log(liWidth);

        var oHead = document.getElementsByTagName("head")[0];

        // 将样式写好后再将style标签插入，可以省很多效率
        oHead.appendChild(style);
    

}

var oDiv = document.getElementsByClassName("wrapper")[0];

    // 需要插入的地方
creatElem( oDiv,["img/link1.jpg", "img/link2.jpg", "img/link3.jpg",  "img/link2.jpg", "img/link3.jpg", "img/link4.jpg", "img/link5.jpg"]);









    
