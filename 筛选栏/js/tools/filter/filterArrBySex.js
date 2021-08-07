// 根据性别来筛选数据函数
function filterArrBySex (data, sex) {

    // 默认和用户点击All按钮
    if (sex == "All") {

        // 不进行操作，返回原数组
        return data;
    }else {

        // 返回根据性别筛选出来的数据
        return data.filter(function (ele, index) {

            // 因为请求来的数据的性别首字母是小写，而行间里的是大写，所以用正则将点击到的行间里的性别替换成小写
            var reg = /^\w/g;

            // 返回数据中具有相同的性别的一些数据，因为别正则不改变原字符串，所以不需要克隆点击到的字符，
            return ele.sex == sex.replace(reg, function ($) {
                return $.toLowerCase(); 
            });
        });
    }
}