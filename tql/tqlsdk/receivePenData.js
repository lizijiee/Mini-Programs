/**
 * utils/receivePenData.js
 * create: kimswang
 * date: 2018-10-31
 */
var event = require('./event.js')
var arrayDot = new Array();

/**
 * 接收笔传过来的数据
 */
function receivedData(dot) {
	var jsonDot = {
		counter: dot.counter, // 点计数
		sectionID: dot.sectionID, // 区域ID
		ownerID: dot.ownerID, // 客户ID
		bookID: dot.bookID, // 书号
		pageID: dot.pageID, // 页号
		timeLong: dot.timeLong, // 当前点的RTC 时间，返回时间戳 ms（起止时间是2018-01-01 00:00:00,000）
		x: dot.x, // 点横坐标，整数部分
		y: dot.y, // 点纵坐标，整数部分
		fx: dot.fx, // 点横坐标，小数部分
		fy: dot.fy, // 点纵坐标，小数部分
		ab_x: dot.ab_x, // 点横坐标，整数+小数部分
		ab_y: dot.ab_y, // 点纵坐标，整数+小数部分
		dotType: dot.dotType,
		force: dot.force, // 点的压力值
		angle: dot.angle, // 点的角度值
		color: dot.color, // 笔的颜色值
	};
	console.log('jsonDot content is: ' + JSON.stringify(jsonDot));
	//console.log('dot.force'+ dot.force + 'dot.trpe' + dot.dotType + 'dot.x'+ dot.x + 'dot.y'+ dot.y);
	if (dot != null) {
		event.emit('AddressDataChanged', dot)
	}
	// arrayDot.push(jsonDot);
}

/**
 * 送出数据
 */
function getBleData() {
	var dotData;
	if (arrayDot.length > 0) {
		for (let i = 0; i < arrayDot.length; i++) {
			dotData = arrayDot[i];
			if (arrayDot.length != 0) {
				arrayDot.splice(i, 1);
			}
			return dotData;
		}
	} else {
		//console.log('Dot data is null : ' + JSON.stringify(arrayDot));
	}
}


module.exports = {
	receivedData: receivedData,
	getBleData: getBleData
}
