// pages/info/address/address.js
import http from '..//../../utils/axios'
var QQMapWX = require('../../../utils/qqmap-wx-jssdk');
const wxMap = new QQMapWX({
  key: 'GV4BZ-R5VK3-VJH3N-3XB62-NK2D5-PNB2E'
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city:'',//城市
    phone:'',//手机号
    name:'',//姓名
    ards:'',//详细地址
    
    x:'',
    y:'',
    id:false,
    data:[],//当前数据
    type:false
  },
  // 保存
  save(){
    let e = this.data
    if(e.city == ''){
      wx.showToast({
        title: '不可为空',
        icon:'none'
      })
      return
    }
    if(this.data.id){
      http.post('/indexinterface/my_address_update',{
        address_id:this.data.id,
        longitude:this.data.y,
        latitude:this.data.x
     }).then(res=>{
       console.log(res)
       wx.showToast({
         title: res.descrip,
         icon:'none'
       })
     })
    }else{
      http.post('/indexinterface/my_address_add',{
        longitude:this.data.y,
        latitude:this.data.x
      }).then(res=>{
        wx.showToast({
          title: res.descrip,
          icon:'none'
        })
      })
    }
  },
  // 选择地址
  xzadd(){
    wx.navigateTo({
      url: '../../map/map?x=' + this.data.x+'&y='+this.data.y,
    })
  },
  // // 手机号绑定
  // phone(e){
  //   this.setData({phone:e.detail.value})
  // },
  // // 验证码绑定
  // ards(e){
  //   this.setData({ards:e.detail.value})
  // },
  // // 姓名绑定
  // name(e){
  //   this.setData({name:e.detail.value})
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if(options&&options.ress){
      this.setData({
        city:options.ress,
        x:options.latitude,
        y:options.longitude,
        id:options.id
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if(this.data.type){
      let _this = this
      wxMap.reverseGeocoder({
        location: {
          // 你的经纬度
          latitude: _this.data.x,
          longitude: _this.data.y,
        },
        success: function (end) {
          console.log(end)
          _this.setData({
            city:end.result.formatted_addresses.recommend
          })
        },
        fail: function (end) {
          console.log(_this.data.x,_this.data.y);
        }
      });
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})