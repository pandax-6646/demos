function handleNum(dom, v) {

  var reg = /\.+/g;
  // 小数点输入
  if (v == '.') {
    if (dom.value == '0') {
      dom.value = '0.';
    } else {

      // 防止用户重复输入小数点
      if (dom.value.match(reg) && dom.value.match(reg).length > 0) {
        dom.value.replace(reg, '.')
      } else {
        dom.value += v;
      }

    }

  }

  // 数字
  if (!isNaN(Number(v))) {
    dom.value += v;
    dom.value = Number(dom.value);
  }
  num3.value = '';
}

// 加锁
var lock = true;

// 运算符
var operator = null;

// 输出
var output = null;

btn.onclick = function (e) {
  var btnValue = e.target.innerText;

  if (lock) {

    // 第一个input输入
    handleNum(num1, btnValue);

    // 运算符号
    if (btnValue == '+' || btnValue == '-' || btnValue == 'x' || btnValue == '/') {
      lock = false;
      operator = btnValue;
    }
  } else {

    // 第二个input输入
    handleNum(num2, btnValue);

    // 等号运算
    if (btnValue == '=') {
      switch (operator) {
        case '+':
          output = Number(num1.value) + Number(num2.value);
          break;

        case '-':
          output = Number(num1.value) - Number(num2.value);
          break;

        case 'x':
          output = Number(num1.value) * Number(num2.value);
          break;

        case '/':
          output = Number(num1.value) / Number(num2.value);
          break;
      }
      num3.value = output;
      num1.value = '0';
      num2.value = '';
      lock = true;
    }
  }


  if (btnValue == 'C') {
    num1.value = '0';
    num2.value = '';
    num3.value = '';
    lock = true;
  }
}