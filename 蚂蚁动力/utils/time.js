var time = function addDate(date, days) {

  if(days == undefined || days == '') {
      days = 1;
  }
  var date = new Date(date);
  date.setDate(date.getDate() + days);
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var mm = "'" + month + "'";
  var dd = "'" + day + "'";
  //单位数前面加0
  if(mm.length == 3) {
      month = "0" + month;
  }
  if(dd.length == 3) {
      day = "0" + day;
  }
  var time = date.getFullYear() + "-" + month + "-" + day+ " " + hours + ":" + minutes;
  return time;
}


module.exports = {
  time: time,
}
