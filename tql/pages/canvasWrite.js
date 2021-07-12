var b5_width = 175; // B5 纸的码点宽度

var b5_height = 250; // B5纸的码点高度

var x_codepoint_size = 1.454; // 横坐标码点的大小
var y_codepoint_size = 1.524; // 纵坐标码点的大小

let ax = b5_width / x_codepoint_size;
let ay = b5_height / y_codepoint_size;

const event = require("../tqlsdk/event.js");

class myCanvas {
  constructor(canvasId, canvasWidth, canvasHeight, imgUrl) {
    this.canvas = null;
    this.canvasNode = null;
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
    this.color = '#141414';
    this.isDown = false;
    this.lastPage = null;
    this.initCanvas(canvasId, canvasWidth, canvasHeight, imgUrl);
    this.isReplay = false;
    this.p_index = 0;
    this.scale = 1;
    this.offsetX = 0;
    this.offsetY = 0;
    this.lineWidth = 2;
    this.penWidth = 0.5;
    this.strokeFlag = true;
    this.lastPoint = null;
    this.imgUrls = null;
    this.offlineFlag = false;
    this.readLocalFileFlag = false;
  } // 开关笔锋


  changeStroke(flag) {
    this.strokeFlag = flag;
  } // 改变笔迹宽度


  changeWidth(width) {
    this.penWidth = width;
  } // 初始化canvas 


  async initCanvas(canvasId, canvasWidth, canvasHeight, imgUrl) {
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
    this.imgUrls = imgUrl;
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "miter";
    this.ctx.miterLimit = 1;
  } // 改变颜色


  changeColor(color) {
    this.color = color;
    this.ctx.fillStyle = color;
    this.ctx.strokeStyle = color;
  } // 绘制图片


  async drawImage(imgUrl, x1, y1, x2, y2) {
    if (!this.allImage[imgUrl]) {
      this.allImage[imgUrl] = await new Promise(resolve => {
        const img = this.canvas.createImage();
        img.src = imgUrl;

        img.onload = () => {
          resolve(img);
        };
      });
    }

    this.ctx.drawImage(this.allImage[imgUrl], x1, y1, x2, y2);
  } // 切页


  async changePage(index) {
	  console.log(index)
    if (index === this.lastPage && !this.isReplay) {
      return;
    } // 此处切页


    event.emit('changePage', index);
    this.lastPage = index;
	await this.drawImage(this.imgUrls[index], 0, 0, this.canvasWidth * 2, this.canvasHeight * 2); // 切页绘制
    //await this.drawImage(this.imgUrls[index & 1 ? 1 : 0], 0, 0, this.canvasWidth * 2, this.canvasHeight * 2); // 切页绘制
    // 此处切页绘制会有bug

    if (!this.isReplay) {
      let pageData = this.mapData.get(index);
      let pageLength = pageData.length;

      for (let i = 0; i < pageLength; i++) {
        this.strokeFlag ? this.strokeType(pageData[i].dotType, pageData[i].xPoint, pageData[i].yPoint, pageData[i].force) : this.penType(pageData[i].dotType, pageData[i].xPoint, pageData[i].yPoint);
      }
    }
  } // 清除


  async clear() {
    this.mapData.clear();
    this.ctx.clearRect(0, 0, this.canvasWidth * 2, this.canvasHeight * 2); // 清除后重新绘制底图

    this.addPageId(this.lastPage);
    await this.drawImage(this.imgUrls[this.lastPage & 1 ? 1 : 0], 0, 0, this.canvasWidth * 2, this.canvasHeight * 2);
  } // 回放


  async replay() {
    this.isReplay = true;
    this.ctx.clearRect(0, 0, this.canvasWidth * 2, this.canvasHeight * 2); // 清除后重新绘制底图

    this.drawImage(this.imgUrls[this.lastPage & 1 ? 1 : 0], 0, 0, this.canvasWidth * 2, this.canvasHeight * 2);

    if (!this.mapData.has(this.lastPage) || this.mapData.get(this.lastPage).length === 0) {
      this.isReplay = false;
      return;
    }

    let currentPageData = this.mapData.get(this.lastPage);
    let dataLength = currentPageData.length;

    for (let index = 0; index < dataLength; index++) {
      await sleep(20);
      this.strokeFlag ? this.strokeType(currentPageData[index].dotType, currentPageData[index].xPoint, currentPageData[index].yPoint, currentPageData[index].force) : this.penType(currentPageData[index].dotType, currentPageData[index].xPoint, currentPageData[index].yPoint);
    }

    this.isReplay = false;
  } // 储存数据


  addPageId(myPageId) {
    if (myPageId === this.lastPage) {
      !this.mapData.has(myPageId) && this.mapData.set(myPageId, []);
      return;
    }

    !this.mapData.has(myPageId) && this.mapData.set(myPageId, []);
    this.changePage(myPageId);
  } //  四舍五入算法


  roundNum(number, fractionDigits) {
    return Math.round(number * Math.pow(10, fractionDigits)) / Math.pow(10, fractionDigits);
  } // 数据处理


  usbData(data) {
    if (data.dotType === "PEN_DOWN") {
      // 切页
      this.addPageId(data.pageID);
    } // 得到的x，y坐标 因为此处canvas为2倍放大 所以图标宽度也需要乘以2


    let xPoint = this.roundNum((data.x + data.fx / 100) * this.canvasWidth * 2 / ax, 13);
    let yPoint = this.roundNum((data.y + data.fy / 100) * this.canvasHeight * 2 / ay, 13); // 离线数据和读取本地文件不进行数据存储

    if (!this.offlineFlag && !this.readLocalFileFlag) {
      this.mapData.get(data.pageID).push({
        bookId: data.bookID,
        pageID: data.pageID,
        timeLog: data.timeLong,
        xPoint,
        yPoint,
        dotType: data.dotType,
        force: data.force,
        color: this.color
      });
    }

    this.strokeFlag ? this.strokeType(data.dotType, xPoint, yPoint, data.force) : this.penType(data.dotType, xPoint, yPoint);
  } // 点分类型（有笔锋）


  strokeType(dotType, x, y, force) {
    console.log(x, y, force);
    dotType === 'PEN_DOWN' ? this.strokeDown(x, y, force, this.penWidth) : dotType === 'PEN_MOVE' ? this.strokeMove(x, y, force, this.penWidth) : this.strokeUp(x, y, force, this.ctx, this.penWidth);
  } // 点分类型（无笔锋）


  penType(dotType, x, y) {
    dotType === 'PEN_DOWN' ? this.penDown(x, y) : dotType === 'PEN_MOVE' ? this.penMove(x, y) : this.penUp(x, y);
  } // down点方法（无笔锋）


  penDown(x, y) {
    this.lastPoint = {
      x,
      y
    };
  } // move点方法（无笔锋）


  penMove(x, y) {
    let newPoint = {
      x,
      y
    };
    this.drawLine(this.lastPoint.x, this.lastPoint.y, newPoint.x, newPoint.y);
    this.lastPoint = newPoint;
  } // up点方法


  penUp(x_0, y_0) {
    this.drawLine(this.lastPoint.x, this.lastPoint.y, x_0, y_0);
  } // 绘制方法（无笔锋）


  drawLine(x1, y1, x2, y2) {
    this.ctx.beginPath();
    this.ctx.moveTo(x1 * 0.97, y1 * 0.976);
    this.ctx.lineWidth = this.penWidth * 2;
    this.ctx.lineTo(x2 * 0.97, y2 * 0.976);
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();
  } // down点方法（有笔锋）


  strokeDown(x, y, force, width) {
    console.log(123);
    penStrokeDown(x, y, force, width);
  } // move点方法（有笔锋）


  strokeMove(x, y, force, width) {
    penStrokeMove(x, y, force, width);
  } // up点方法（有笔锋）


  strokeUp(x, y, force, ctx, penWidth) {
    penStrokeUp(x, y, force, ctx, penWidth);
  }

} // 控制点类


class ControlPoint {
  constructor(x, y, width) {
    this.x = x;
    this.y = y;
    this.width = width;
  }

  set(x, y, width) {
    this.x = x;
    this.y = y;
    this.width = width;
  }

  setControlPoint(point) {
    this.x = point.x;
    this.y = point.y;
    this.width = point.width;
  }

} // 贝塞尔类


class Bezier {
  constructor() {
    //    控制点
    this.mControl = new ControlPoint(); //    距离

    this.mDestination = new ControlPoint(); //    下一个需要控制点

    this.mNextControl = new ControlPoint(); //    资源的点

    this.mSource = new ControlPoint();
  }

  initPoint(last, cur) {
    this.init(last.x, last.y, last.width, cur.x, cur.y, cur.width);
  }

  init(lastX, lastY, lastWidth, x, y, width) {
    //资源点设置 最后的点位资源点
    this.mSource.set(lastX, lastY, lastWidth);
    let xMid = getMid(lastX, x);
    let yMid = getMid(lastY, y);
    let wMid = getMid(lastWidth, width); //    距离单为平均点

    this.mDestination.set(xMid, yMid, wMid); //   控制点为当前的距离点

    this.mControl.set(getMid(lastX, xMid), getMid(lastY, yMid), getMid(lastWidth, wMid)); //    下个控制点为当前点

    this.mNextControl.set(x, y, width);
  }

  addNodePoint(cur) {
    this.addNode(cur.x, cur.y, cur.width);
  } //替换旧的点 原来的距离点变换为资源点，控制点变为原来的下一个控制点，距离点取原来控制点的和新的的一半 下个控制点为新的点


  addNode(x, y, width) {
    this.mSource.setControlPoint(this.mDestination);
    this.mControl.setControlPoint(this.mNextControl);
    this.mDestination.set(getMid(this.mNextControl.x, x), getMid(this.mNextControl.y, y), getMid(this.mNextControl.width, width));
    this.mNextControl.set(x, y, width);
  } //结束时改变点的位置


  penEnd() {
    this.mSource.setControlPoint(this.mDestination);
    this.mControl.set(getMid(this.mNextControl.x, this.mSource.x), getMid(this.mNextControl.y, this.mSource.y), getMid(this.mNextControl.width, this.mSource.width));
    this.mDestination.setControlPoint(this.mNextControl);
  } //    获取点的信息


  getPoint(t) {
    let point = new ControlPoint();
    point.set(this.getX(t), this.getY(t), this.getW(t));
    return point;
  } //三阶曲线控制点


  getValue(p0, p1, p2, t) {
    let a = p2 - 2 * p1 + p0;
    let b = 2 * (p1 - p0);
    return a * t * t + b * t + p0;
  }

  getX(t) {
    return this.getValue(this.mSource.x, this.mControl.x, this.mDestination.x, t);
  }

  getY(t) {
    return this.getValue(this.mSource.y, this.mControl.y, this.mDestination.y, t);
  }

  getW(t) {
    return getWidth(this.mSource.width, this.mDestination.width, t);
  }

} // 计算压力值


const calculatePressure = force => force >= 0 && force <= 20 ? 40 : force < 20 && force <= 40 ? 60 : force > 40 && force <= 60 ? 80 : force > 60 && force <= 90 ? 100 : force > 90 && force <= 150 ? 120 : 130; // 获取中间值


const getMid = (x, y) => (x + y) / 2; // 计算宽度


const getWidth = (w0, w1, t) => w0 + (w1 - w0) * t; // 当前点


let curPoint = null; // 上一个点

let mLastPoint = null; // 计算出来的线段宽度

let mLastWidth = null; // 贝塞尔类实例

let mBezier = new Bezier(); // 笔画的第一点

let mFirstPoint = null; // 点击数

let pointNum = 0; //转换参数

const transFormScale = 80; // 每笔的数据

let nowList = []; // 上一压力值

let lastForce = null; // down点（笔锋）

const penStrokeDown = (x, y, force, width) => {
  let pressure = calculatePressure(force);
  mLastWidth = pressure / transFormScale * width;
  pointNum = 1; // 记录down点信息

  curPoint = new ControlPoint(x, y, mLastWidth);
  mLastPoint = new ControlPoint(x, y, mLastWidth);
  console.log(mLastPoint);
  mFirstPoint = new ControlPoint(x, y, mLastWidth);
  nowList = [];
  nowList.push(curPoint);
  lastForce = force;
}; // move点方法（笔锋）


const penStrokeMove = (x, y, force, penWidth) => {
  let pressure = calculatePressure(force);
  let pressureCheck = forceCreck(lastForce, pressure);
  lastForce = pressureCheck;
  let curWidth = pressureCheck / transFormScale * penWidth;
  curPoint = new ControlPoint(x, y, curWidth);
  console.log(curPoint, mLastPoint);
  let curDis = Math.hypot(curPoint.x - mLastPoint.x, curPoint.y - mLastPoint.y);

  if (pointNum === 1) {
    pointNum++;
    mBezier.initPoint(mLastPoint, curPoint);
  } else {
    mBezier.addNodePoint(curPoint);
  }

  mLastWidth = curWidth;
  doMove(curDis);
  mLastWidth = new ControlPoint(curPoint.x, curPoint.y, curPoint.width);
  console.log(mFirstPoint);
}; // up点方法（笔锋）


const penStrokeUp = (x, y, force, context, penWidth) => {
  if (nowList.length === 0) {
    return;
  }

  curPoint = new ControlPoint(x, y, 0);
  let deltaX = curPoint.x - mLastPoint.x;
  let deltaY = curPoint.y - mLastPoint.y;
  let curDis = Math.hypot(deltaX, deltaY);
  mBezier.addNodePoint(curPoint);
  let steps = 1 + Math.floor(curDis / 10);
  let step = 1 / steps;

  for (let t = 0; t < 1; t += step) {
    let point = mBezier.getPoint(t);
    nowList.push(point);
  }

  mBezier.penEnd();

  for (let t = 0; t < 1; t += step) {
    let point = mBezier.getPoint(t);
    nowList.push(point);
  }

  draws(context, penWidth);
  nowList = [];
};

function doMove(curDis) {
  let steps = 1 + Math.floor(curDis / 10);
  let step = 1 / steps;

  for (let t = 0; t < 1; t += step) {
    let Point = mBezier.getPoint(t);
    nowList.push(Point);
  }
}

function draws(context, penWidth) {
  doPreDraw(context, penWidth);
}

function doPreDraw(context, penWidth) {
  let curPoint = nowList[0];
  let length = nowList.length;

  for (let i = 1; i < length; i++) {
    drawPoint(curPoint, nowList[i], context, penWidth);
    curPoint = nowList[i];
  }
}

function drawPoint(curPoint, point, context, penWidth) {
  // 相同点不绘制
  if (curPoint.x === point.x && curPoint.y === point.y) {
    return;
  }

  drawLine(curPoint.x, curPoint.y, curPoint.width, point.x, point.y, point.width, context, penWidth);
} // 绘制方法


function drawLine(x0, y0, w0, x1, y1, w1, context, penWidth) {
  let curDis = Math.hypot(x1 - x0, y1 - y0);
  let step = 1;

  if (penWidth <= 6) {
    step = 1 + Math.floor(curDis);
  } else if (penWidth > 60) {
    step = 1 + Math.floor(curDis / 4);
  } else {
    step = 1 + Math.floor(curDis / 3);
  }

  let deltaX = (x1 - x0) / step;
  let deltaY = (y1 - y0) / step;
  let deltaW = (w1 - w0) / step;
  let x = x0;
  let y = y0;
  let w = w0;

  for (let i = 0; i < step; i++) {
    let left = x + w / 2;
    let top = y + w / 2;
    let right = x - w / 2;
    let bottom = y - w / 2;
    let midPointX = (left + right) / 2;
    let midPointY = (top + bottom) / 2;
    let xRadius = Math.abs((left - right) / 2);
    let yRadius = Math.abs((top - bottom) / 2);
    context.setLineDash([]);
    context.beginPath();
    context.ellipse(midPointX * 0.97, midPointY * 0.976, xRadius, yRadius, 0, 0, Math.PI * 2);
    context.stroke();
    context.closePath();
    context.fill();
    x += deltaX;
    y += deltaY;
    w += deltaW;
  }
} // 压力值前后差距过大补正


const forceCreck = (lastForce, curForce) => {
  if (curForce - lastForce > 35) {
    return (lastForce + curForce) / 2;
  }

  return curForce;
}; // 休眠方法


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export { myCanvas };