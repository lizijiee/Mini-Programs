const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function Format(da, fmt) {
  let _this = new Date(da)
  var o = {
    'M+': _this.getMonth() + 1,
    'd+': _this.getDate(),
    'H+': _this.getHours(),
    'm+': _this.getMinutes(),
    's+': _this.getSeconds(),
    'S+': _this.getMilliseconds()
  }
  console.log(o)
  // 因为date.getFullYear()出来的结果是number类型的,所以为了让结果变成字符串型，下面有两种方法：
  if (/(y+)/.test(fmt)) {
    // 第一种：利用字符串连接符“+”给date.getFullYear()+""，加一个空字符串便可以将number类型转换成字符串。
    fmt = fmt.replace(
      RegExp.$1,
      (_this.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      // 第二种：使用String()类型进行强制数据类型转换String(date.getFullYear())，这种更容易理解。
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(String(o[k]).length)
      )
    }
  }
  console.log('fmt:',fmt)
  return fmt
}

function subYear(val) {
  return val.substring(0, 4) + "年" + val.substring(4) + "月"
}
function subTime(val) {
  return val.substring(11)
}
module.exports = {
  formatTime: formatTime,
  format: Format,
  subYear:subYear,
  subTime:subTime
}