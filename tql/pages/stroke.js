var b5_width = 176; // B5 纸的码点宽度

var b5_height = 250; // B5纸的码点高度

var x_codepoint_size = 1.524; // 横坐标码点的大小

var y_codepoint_size = 1.524; // 纵坐标码点的大小

const ax = b5_width / x_codepoint_size;
const ay = b5_height / y_codepoint_size;

class Stroke {
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
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "miter";
    this.ctx.miterLimit = 1;
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
  } // 切页


  changePage(index) {
    if (index === this.lastPage && !this.isReplay) {
      return;
    }

    this.lastPage = index;
    this.drawImage(this.imgUrls[index & 1 ? 1 : 0], 0, 0, this.canvasWidth * 2, this.canvasHeight * 2);
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
  } //  四舍五入算法


  roundNum(number, fractionDigits) {
    return Math.round(number * Math.pow(10, fractionDigits)) / Math.pow(10, fractionDigits);
  } // 数据处理


  usbData(data) {
    if (data.dotType === 'PEN_DOWN') {
      this.addPageId(data.pageID, data);
    }

    let xPoint = this.roundNum((data.x + data.fx / 100) * this.canvasWidth * 2 / ax, 13); // console.log(this.canvasWidth)

    let yPoint = this.roundNum((data.y + data.fy / 100) * this.canvasHeight * 2 / ay, 13); // console.log(xPoint, yPoint)

    this.penType(data.dotType, xPoint, yPoint, data.force); // console.log(xPoint, yPoint, data.force)
  } // 点分类型


  penType(dotType, x, y, force) {
    dotType === "PEN_DOWN" ? this.onDown(x, y, force) : dotType === "PEN_MOVE" ? this.onMove(x, y, force) : this.onUp(x, y, force, this.ctx);
  } // down点方法


  onDown(x, y, force) {
    penDown(x, y, force);
  } // move方法


  onMove(x, y, force) {
    penMove(x, y, force);
  } // up点方法


  onUp(x, y, force, context) {
    penUp(x, y, force, context);
  }

}

class ControlPoint {
  // x = null
  // y = null
  // alpha = 255
  // width = null
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

} //贝塞尔类


class Bezier {
  // //    控制点
  // mControl = new ControlPoint();
  // //    距离
  // mDestination = new ControlPoint()
  // //    下一个需要控制点
  // mNextControl = new ControlPoint()
  // //    资源的点
  // mSource = new ControlPoint()
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
    this.mNextControl.set(x, y, width); // console.log(this.mDestination,this.mNextControl,this.mSource,this.mControl)
  } //


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

}

function calculatePressure(force) {
  return force >= 0 && force <= 20 ? 40 : force < 20 && force <= 40 ? 60 : force > 40 && force <= 60 ? 80 : force > 60 && force <= 90 ? 100 : force > 90 && force <= 150 ? 120 : 130;
}

const getMid = (x, y) => (x + y) / 2;

const getWidth = (w0, w1, t) => w0 + (w1 - w0) * t; // 当前点


let curPoint = null; //上一个点

let mLastPoint = null; // 计算出来的线段宽度

let mLastWidth = null; // 贝塞尔控制点

let mBezier = new Bezier(); // 笔画的第一点

let mFirstPoint = null; // 点个数

let pointNum = 0;
const transFormScale = 80;
let penWidth = 1.6;
let nowList = [];
let lastForce = null; // down点方法

const penDown = (x, y, force) => {
  let pressure = calculatePressure(force);
  mLastWidth = pressure / transFormScale * penWidth;
  pointNum = 1; // 记录down点信息

  curPoint = new ControlPoint(x, y, mLastWidth);
  mLastPoint = new ControlPoint(x, y, mLastWidth);
  mFirstPoint = new ControlPoint(x, y, mLastWidth);
  nowList.push(curPoint);
  lastForce = force;
};

const penMove = (x, y, force) => {
  let pressure = calculatePressure(force);
  let pressureCheck = forceCreck(lastForce, pressure);
  lastForce = pressureCheck;
  let curWidth = pressureCheck / transFormScale * penWidth;
  curPoint = new ControlPoint(x, y, curWidth);
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
};

function penUp(x, y, force, context) {
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

  draws(context);
  nowList = [];
}

function doMove(curDis) {
  let steps = 1 + Math.floor(curDis / 10);
  let step = 1 / steps;

  for (let t = 0; t < 1; t += step) {
    let Point = mBezier.getPoint(t);
    nowList.push(Point);
  }
}

function draws(context) {
  doPreDraw(context);
}

function doPreDraw(context) {
  let curPoint = nowList[0];
  let length = nowList.length;

  for (let i = 1; i < length; i++) {
    drawPoint(curPoint, nowList[i], context);
    curPoint = nowList[i];
  }
}

function drawPoint(curPoint, point, context) {
  if (curPoint.x === point.x && curPoint.y === point.y) {
    return;
  }

  drawLine(curPoint.x, curPoint.y, curPoint.width, point.x, point.y, point.width, context);
}

function drawLine(x0, y0, w0, x1, y1, w1, context) {
  // console.log(x0, y0, w0, x1, y1, w1)
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
  let w = w0; // console.log(context)

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
};

export { Stroke };