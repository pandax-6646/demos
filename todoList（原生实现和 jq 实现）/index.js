if (window.confirm("是否使用jQuery?")) {
  // 
  // 请求jQuery库的压缩包并插入到页面中
  var oSrc = document.createElement('script');
  oSrc.setAttribute('src', 'https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js');
  document.head.appendChild(oSrc);

  // jQuery方式
  alert('jQuery + 自定义属性方案 已启用');


  // 所有数据都加载完成
  window.onload = function () {
    var arr = [];

    // 渲染列表方法
    function rander(data) {
      var str = '';
      var $Ul = $('ul');
      data.forEach(function (value, index) {
        str += `
                    <li data-index=${index}>
                        <p>${index + 1}. ${value}</p>
                        <span>x</span>
                    </li>`;
      })
      $Ul.html(str);

      if ($Ul.children().length == 1) {
        $Ul.css('display', 'block');
      } else if ($Ul.children().length == 0) {
        $Ul.css('display', 'none');
      }
    }


    // 键盘回车事件（添加清单）
    window.onkeydown = function (e) {
      var $Input = $('#input');
      if (e.key == 'Enter') {
        var val = $Input.val();

        if (val != '') {
          arr.push($Input.val());
          $Input.val('');

          rander(arr);
        }
      }
    }

    // 删除清单
    $('ul').on('click', 'span', function () {
      if (!window.confirm("是否删除这条清单?")) return;
      var index = $(this).parent().attr('data-index');

      arr.splice(index, 1);

      rander(arr);
    })
    console.log($);
  }



} else {
  alert('原生js + 正则方案 已启用');

  var oUl = document.getElementsByTagName('ul')[0];
  var str = '';

  // 禁止用户输入 <数字.> 格式的任务
  input.oninput = function () {
    input.value = input.value.replace(/(\d+)(\.)/, function ($, $1) {
      return $1 + '';
    })
  }

  // 键盘回车事件
  window.onkeydown = function (e) {
    var index = oUl.children.length;
    var val = input.value;

    // 按下回车按钮并且输入框不为空时，才添加任务
    if (e.key == 'Enter' && val != '') {
      str = `<li>
                    <p>${index + 1}. ${val}</p>
                    <span>x</span>
                </li>`;
      oUl.innerHTML += str;

      input.value = '';

      if (oUl.children && oUl.children.length == 1) {
        oUl.style.display = 'block';
      }
    }
  }


  oUl.onclick = function (e) {
    var str = '';
    var oLiList = oUl.children;
    var reg = /\d+(?=\.)/g;

    // 删除清单
    if (e.target.nodeName == 'SPAN') {
      if (!window.confirm("是否确认删除这条清单？")) return;
      e.target.parentNode.remove();

      if (oLiList && oLiList.length == 0) {
        oUl.style.display = 'none';
      }
    }

    //  修改清单的索引
    [...oLiList].forEach(function (value, index) {
      // 获取每条清单里的文本
      var text = value.innerHTML;

      // 用正则替换每条清单里的索引
      text = text.replace(reg, index + 1);

      str += `<li>${text}</li>`;
    })
    oUl.innerHTML = str;
  }

  console.log($)
}