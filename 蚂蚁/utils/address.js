var QQMapWX = require('./qqmap-wx-jssdk');
// 实例化API核心类
const wxMap = new QQMapWX({
  key: 'GV4BZ-R5VK3-VJH3N-3XB62-NK2D5-PNB2E'
});

function cut(x,y){
  return new Promise(resolve=>{
    wxMap.reverseGeocoder({
       location: {
         // 你的经纬度
         latitude: x,
         longitude: y,
       },
       success: function (res) {
         resolve(res.result.formatted_addresses.recommend)
       },
       fail: function (res) {
         console.log(res);
       }
     });
  })
}
module.exports = {
 cut : cut,
}