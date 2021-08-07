let showTime = {




  getCurrTimeStr() {
    let newTime = new Date();
    let timeArr = [newTime.getHours(), newTime.getMinutes(), newTime.getSeconds()];

    return timeArr.reduce(function (previous, value) {
      return previous + ('0' + value).slice(-2);
    }, '');


  },

  move() {
    let oNumsList = document.getElementsByClassName('nums');
    this.classArr = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'seven', 'seven'];
    let That = this;


    setInterval(() => {
      let time = this.getCurrTimeStr();

      [...oNumsList].forEach(function (value, index) {
        value.style.transform = 'translateY(calc(45% - ' + time[index] * 86 + 'px))';


        // 通过修改类名来修改样式
        [...value.children].forEach(function (v, i) {
          v.className = That.getClass(time[index], i);
        })

      })

    }, 500)
  },


  // 171645   time[index]  value
  // 123456   index


  getClass(value, index) {

    let className = this.classArr.find(function (ele, k) {
      return index - k == value || index + k == value;
    });

    return className || '';

  },

  init() {
    this.move();

  },





}


showTime.init();