class Game {
  constructor(tr, td) {
    this.tr = tr;
    this.td = td;
    this.oImgArea = $('.imgArea');

    // 是否开始
    this.play = true;

    // 标准列表序列数组
    this.origArr = [];

    // 乱序列表序列数组
    this.randArr = [];

    // 小图片的宽和高的对象
    this.cellHW;

    // 小图片的元素数组
    this.oImgCellArr;

    this.firstTime;

    this.currTime;
  }

  // 得到每个小图片的宽高
  getCellWH() {
    return {
      H: parseInt(this.oImgArea.css('height')) / this.tr,
      W: parseInt(this.oImgArea.css('width')) / this.td
    }
  }



  // 初始化
  init() {

    randerGameTime();

    this.cellHW = this.getCellWH();
    let count = 0;

    this.oImgArea.text('');

    // 生成棋盘
    for (let i = 0; i < this.tr; i++) {
      for (let j = 0; j < this.td; j++) {

        let cell = $('<div class="imgCell"></div>');

        $(cell).css({
          'width': this.cellHW.W + 'px',
          'height': this.cellHW.H + 'px',
          'left': this.cellHW.W * j,
          'top': this.cellHW.H * i,
          'backgroundPosition': (-this.cellHW.W) * j + 'px ' + (-this.cellHW.H) * i + 'px',
        });

        this.oImgArea.append(cell);

        this.origArr.push(count);
        this.randArr.push(count);
        count++
      }
    }

    this.startGame();
  }

  // 生成随机数
  randomNum() {

    this.randArr.sort(function () {
      return Math.random() - 0.5;
    })
    if (this.randArr.toString() == this.origArr.toString()) {
      this.randomNum();
    }
  }

  // 开始游戏
  startGame() {

    this.oImgCellArr = $('.imgCell');
    let That = this;
    $('.start').on('click', () => {
      if (this.play) {

        this.randomNum()

        $('.start').text('复原').css('backgroundColor', '#0ff');
        this.play = false;

        this.cellRander(this.randArr);

        this.oImgCellArr.on('mousedown', function (e) {

          // 当前点击到的元素在父级里的索引
          let indexDown = $(this).index();
          let leftDown = e.pageX - That.oImgCellArr.eq(indexDown).offset().left;
          let topDown = e.pageY - That.oImgCellArr.eq(indexDown).offset().top;
          $(document).on('mousemove', function (event) {
            That.oImgCellArr.eq(indexDown).css({
              'z-index': '40',
              'left': event.pageX - leftDown - That.oImgArea.offset().left + 'px',
              'top': event.pageY - topDown - That.oImgArea.offset().top + 'px'
            })
          }).on('mouseup', function (event) {

            // 保存鼠标松开时该移动的元素的位置
            let topUp = event.pageY - That.oImgArea.offset().top;
            let leftUp = event.pageX - That.oImgArea.offset().left;

            let indexUp = That.getIndexUp(leftUp, topUp, indexDown);

            if (indexUp == indexDown) {

              That.cellMove(That.randArr, indexDown, indexDown);

            } else {
              // 以修改乱序数组里的索引来达到让元素替换位置的效果
              That.cellsPositionChange(indexDown, indexUp);
            }

            $(document).off('mousemove').off('mouseup');
          })
        })


      } else {
        $('.start').text('打乱').css('backgroundColor', '#f0f');

        this.cellRander(this.origArr);
        this.play = true;

        $(this.oImgCellArr).off('mousemove').off('mouseup').off('mousedown');
      }
    })
  }



  // 小图片运动函数
  cellMove(arr, to, from) {
    this.oImgArea.find('.imgCell').eq(to).animate({
      'top': (this.cellHW.H) * (arr[from] - (arr[from] % this.td)) / this.td + 'px',
      'left': (this.cellHW.W) * (arr[from] % this.td) + 'px'
    }, 600, function () {

      // 修改层级
      $(this).css('z-index', '10')
    })
  }


  // 渲染小图片
  cellRander(arr) {
    for (let i = 0; i < this.origArr.length; i++) {

      this.cellMove(arr, i, i)
    }
  }


  // 获取当前鼠标抬起时的位置下的元素的索引
  getIndexUp(x, y, index) {

    if (x < 0 || x > (this.td * this.cellHW.W) || y < 0 || y > (this.tr * this.cellHW.H)) {
      return index;

    } else {

      // 行
      let row = Math.floor(y / this.cellHW.H);

      // 列 column
      let col = Math.floor(x / this.cellHW.W);
      let l = row * this.td + col;

      // 找到乱序数组里的这个数
      let i = 0;
      let len = this.randArr.length;
      while ((i < len) && this.randArr[i] !== l) {
        i++;
      }
      return i;
    }

  }

  cellsPositionChange(from, to) {

    let temp = this.randArr[from];

    this.cellMove(this.randArr, from, to)
    this.cellMove(this.randArr, to, from)

    // 交换索引
    this.randArr[from] = this.randArr[to];
    this.randArr[to] = temp;

    this.chack();

  }

  // 检测所有小图形是否归位 
  chack() {
    if (this.randArr.toString() == this.origArr.toString()) {

      // 延迟执行，使得图片运动完成后再触发
      setTimeout(() => {

        alert('恭喜你！拼图成功！！请进入下一关');

        this.origArr = [];

        this.randArr = [];

        this.tr += 1;
        this.td += 1;

        let game = new Game(this.tr, this.td);
        game.init();

        $('.start').text('打乱').css('backgroundColor', '#f0f');

      }, 1000)
    }
  }








}

// 修改参数可以更改游戏难度
let game = new Game(2, 2);
game.init();