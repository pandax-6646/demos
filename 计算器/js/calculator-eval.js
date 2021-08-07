// 是否使用jQuery
if (window.confirm("是否使用jQuery?")) {

  // 请求jQuery库的压缩包并插入到页面中
  var oSrc = document.createElement('script');
  oSrc.setAttribute('src', 'https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js');
  document.head.appendChild(oSrc);

  // jQuery方式
  alert('jQuery 方式已启用');


  var str = '';
  var lock = true;

  // cdn jQuery 加载完成才执行
  window.onload = function () {
    $('#btn').on('click', 'li', function (e) {
      var text = $(e.target).text();
      var $Num1 = $('#num1');

      if (text === 'C') {
        $Num1.val('');
        str = '';
        lock = true;
      }


      if (text === '=' && $Num1 !== '') {
        $Num1.val(eval(str));
        str = eval(str);
        lock = false;
      }


      if (text === 'X' && $Num1.val() !== '') {
        str += '';
        str = str.slice(0, str.length - 1);
        $Num1.val(str);
      }


      if (lock) {
        if (text !== '=' && text !== 'C' && text !== 'X') {
          str += text;
          $Num1.val(str);
        }

      } else {
        if (text === '+' || text === '-' || text === '*' || text === '/') {
          str += text;
          $Num1.val(str);
          lock = true;
        }
      }
    })
    console.log($);
  }


} else {

  // 原生方式
  alert('原生方式已启用');

  var str = '';
  var lock = true;
  btn.onclick = function (e) {

    // 定义一个变量来接收点击的字符
    var character = e.target.innerText;

    if (character === 'C') {
      str = '';
      num1.value = '';
      lock = true;
    }


    if (character === '=' && num1.value !== '') {
      num1.value = eval(str);
      str = num1.value;
      lock = false;
    }

    
    if (character === 'X' && num1.value !== '') {
      str += '';
      str = str.slice(0, str.length - 1);
      num1.value = str;
    }


    if (lock) {
      if (character !== '=' && character !== 'C' && character !== 'X') {
        str += character;
        num1.value = str;
      }

    } else {
      if (character === '+' || character === '-' || character === '*' || character === '/') {
        str += character;
        num1.value = str;
        lock = true;
      }
    }
  }
  console.log($);
}