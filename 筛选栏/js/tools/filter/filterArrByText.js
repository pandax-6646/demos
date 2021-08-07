// 根据文本来进行筛选函数（纯函数）
function filterArrByText (data, text) {
    if (!text) {
        return data;
    }else{

        // 返回筛选出的数据
        // console.log(1212)
        return data.filter(function (ele, index) {

            // 返回符合文本条件的数据
            return ele.name.indexOf(text) != -1; 
        });
    }
}