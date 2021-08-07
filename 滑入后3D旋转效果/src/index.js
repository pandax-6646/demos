Array.prototype.slice.call(document.getElementsByTagName('li')).forEach(function (ele, index) {
    // 把每个li的宽高保存到dom上
    ele.spec = getSpec(ele);
    
    ele.addEventListener('mouseenter', function (e) {
            addClass(this, e, 'in');
    },false)

    ele.addEventListener('mouseleave', function (e) {

            addClass(this, e, 'out');
    },false)
})

function getSpec(ele) {
    return{
        x : ele.offsetWidth,
        y : ele.offsetHeight
    }
}

function addClass (ele, e, start) {
    var side = (Math.round((Math.atan2(e.offsetY - (ele.spec.x / 2), e.offsetX - (ele.spec.y / 2)) * (180 / Math.PI) + 180) / 90) + 3) % 4;
    
    var direction = "";
    switch (side) {
        case 0:
            direction = "top";
            break;
        case 1:
            direction = "right";
            break;
        case 2:
            direction = "bottom";
            break;
        case 3:
            direction = "left";
    }
        ele.className = start + '-' + direction;

}