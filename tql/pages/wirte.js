var b5_width = 176; // B5 纸的码点宽度

var b5_height = 250; // B5纸的码点高度

var x_codepoint_size = 1.524; // 横坐标码点的大小

var y_codepoint_size = 1.524; // 纵坐标码点的大小

ax = b5_width / x_codepoint_size;
ay = b5_height / y_codepoint_size;

class myCanvas {
  constructor(canvasId, canvasWidth, canvasHeight, imgUrls) {
    this.canvas = null;
    this.canvasNode = null;
    this.ctx = null;
    this.allImage = {};
    this.force = 0;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.mapData = new Map();
    this.x_coordinate = null;
    this.y_coordinate = null;
    this.color = '#000';
    this.isDown = false;
    this.lastPage = null;
    this.initCanvas(canvasId, canvasWidth, canvasHeight);
    this.isReplay = false;
    this.p_index = 0;
    this.scale = 1;
    this.offsetX = 0;
    this.offsetY = 0;
    this.lineWidth = 2;
    this.penWidth = 1.0;
    this.currentX = 0;
    this.currentY = 0;
    this.currentMidX = 0;
    this.currentMidY = 0;
    this.preMidX = 0;
    this.preMidY = 0;
    this.preX = 0;
    this.preY = 0;
    this.lastPointX = 0;
    this.lastPointY = 0;
    this.imgUrls = imgUrls;
  } // 初始化canvas


  async initCanvas(canvasId, canvasWidth, canvasHeight) {
    this.canvasNode = await new Promise((resolve, reject) => {
      const query = uni.createSelectorQuery();
      query.select(canvasId).fields({
        node: true,
        size: true
      }).exec(res => {
        resolve(res[0]);
      });
    });
    this.canvas = this.canvasNode.node;
    this.ctx = this.canvas.getContext('2d'); // 以下为canvas的缩放比例 默认为2倍 如有其它需求 请自行更改

    this.canvas.width = canvasWidth * 2;
    this.canvas.height = canvasHeight * 2;
  } // 绘制图片


  async drawImage(imgUrl, x1, y1, x2, y2) {
    console.log(this);

    if (!this.allImage[imgUrl]) {
      this.allImage[imgUrl] = await new Promise(resolve => {
        console.log(this.canvas);
        const img = this.canvas.createImage();
        img.src = imgUrl;

        img.onload = () => {
          resolve(img);
        };
      });
    }

    this.ctx.drawImage(this.allImage[imgUrl], x1, y1, x2, y2);
  } //  四舍五入算法


  roundNum(number, fractionDigits) {
    return Math.round(number * Math.pow(10, fractionDigits)) / Math.pow(10, fractionDigits);
  } // 数据处理


  getDrawData(data) {
    if (data.dotType === 'PEN_DOWN') {
      this.addPageId(data.pageID, data);
    }

    this.force = data.force;
    let xPoint = this.roundNum((data.x + data.fx / 100) * this.cvsWidth / ax, 13);
    let yPoint = this.roundNum((data.y + data.fy / 100) * this.cvsHeight / ay, 13);
    this.x_coordinate = data.x + data.fx / 100;
    this.y_coordinate = data.y + data.fx / 100;
    this.mapData.get(data.pageID).push({
      bookId: data.bookID,
      pageID: data.pageID,
      timeLog: data.timeLong,
      xPoint,
      yPoint,
      dotType: data.dotType,
      penWidth: data.force,
      color: this.color
    });
    this.penType(data.dotType, xPoint, yPoint, color);
  }

  addPageId(myPageId) {
    if (myPageId === this.lastPage) {
      !this.mapData.get(myPageId) && this.mapData.set(myPageId, []);
      return;
    }

    this.changePage(myPageId);
    !this.mapData.has(myPageId) && this.mapData.set(myPageId, []);
    this.mapData.get(myPageId).forEach(item => {
      penWidth = this.setPenFront(item.force);
      this.penType(item.dotType, item.xPoint, item.yPoint, item.color);
    });
  }

  setPenFront() {} // 点分类型


  penType(penType, x, y, color) {
    penType === "PEN_DOWN" ? this.penDown(x, y, color) : penType === "PEN_MOVE" ? this.penmove(x, y, color) : this.penup(x, y, color);
  } // down点


  penDown(x, y, color) {
    if (this.isDown) {
      this.drawPen(scale, this.offsetX, this.offsetY, this.lineWidth, this.preX, this.preY, 0);
      this.isDown = false;
    }

    this.p_index = 0;
    this.color = color;
    this.drawPen(scale, this.offsetX, this.offsetY, this.lineWidth, x, y, thos.force);
    this.isDown = true;
    this.lastPointX = 0;
    this.lastPointY = 0;
  } // move点


  penMove(x, y, color) {
    if (!this.isDown) {
      this.p_index = 0;
      this.isDown = true;
      this.drawPen(this.scale, this.offsetX, this.offsetY, this.lineWidth, x, y, this.force);
      return;
    }

    this.p_index += 1;
    this.drawPen(this.scale, this.offsetX, this.offsetY, this.lineWidth, x, y, 0);
  } // up点


  penUp(x, y, color) {
    this.isDown = false;
    this.drawPen(this.scale, this.offsetX, this.offsetY, this.lineWidth, x, y, this.force);
  } // 写字方法


  drawPen(scale, offsetX, offsetY, lineWidth, x_o, y_o, force) {
    if (this.p_index === 0) {
      this.currentMidX = this.preX = this.preMidX = this.currentX = x_o * scale + offsetX + 0.1;
      this.currentMidY = this.preY = this.preMidY = this.currentY = y_o * scale + offsetY;
      return;
    }

    if (this.p_index > 1) {
      this.currentX = x_o * scale + offsetX + 0.1;
      this.currentY = y_o * scale + offsetY;
      this.currentMidX = (this.currentX + this.preX) / 2.0;
      this.currentMidY = (this.currentY + this.preY) / 2.0;
      this.ctx.beginPath(); // this.ctx.setLineCap('round');
      // this.ctx.setLineJoin('miter');

      this.ctx.lineCap = "round";
      this.ctx.lilneJoin = "miter";
      this.ctx.moveTo(this.preMidX, this.preMidY);
      this.ctx.lineWidth = 2;
      this.ctx.quadraticCurveTo(this.preX, this.preY, this.currentMidX, this.currentMidY);
      this.ctx.setStrokeStyle("#000");
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.closePath(); // this.ctx.draw(true);

      if (force === 0) {
        this.ctx.moveTo(this.currentMidX, this.currentMidY);
        this.ctx.lineWidth = this.penWidth;
        this.ctx.lineTo(this.currentX, this.currentY);
      }

      this.preMidX = this.currentMidX;
      this.premidY = this.currentMidY;
      this.preX = this.currentX;
      this.preY = this.currentY;
    }
  } // 切页


  changePage(index) {
    if (index === this.lastPage && !this.isReplay) {
      return;
    }

    this.lastPage = index;
    this.drawImage(this.imgUrls[index & 1 ? 1 : 0], 0, 0, this.canvasWidth * 2, this.canvasHeight * 2);
  }

}

export { myCanvas };