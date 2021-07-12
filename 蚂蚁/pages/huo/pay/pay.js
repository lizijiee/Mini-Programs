// pages/info/pay/pay.js
import http from '../../../utils/axios'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderid:'',//订单号
    pirice:'',//金额
    show:1,
  },
  submit(){
    wx.showLoading()
    let _this = this
   wx.login({
    success(end){
      console.log(end)
      http.post('/indexinterface/sign_wxpay',{
        code:end.code,
        order_code:_this.data.orderid
      }).then(res=>{
        wx.hideLoading()
        if(res.code == 0){
          wx.requestPayment({
            'timeStamp':res.data.timeStamp ,
            'nonceStr': res.data.nonceStr,
            'package': res.data.package,
            'signType': res.data.signType,
            'paySign': res.data.paySign,
            success:function(item){
              console.log(item)
              _this.setData({show:2})
              _this.confim()
            },
            fail:function(err){
              console.log(err)
              _this.setData({show:3})
            }
          })
        }else{
          wx.showToast({
            title: res.descrip,
            icon:'none'
          })
        }
      })
    }
   })
  
  },
  // 成功
  confim(){
    http.post('/indexinterface/sign_demo',{
      code:this.data.orderid,
      total:this.data.pirice
    }).then(res=>{

    }).catch(err=>{

    })
  },
  // 返回首页
  home(){
    wx.switchTab({
      url: '../../home/home',
    })
  },
  // 重新发起
  chon(){
    this.setData({show:1})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    http.post('/indexinterface/member_information').then(res=>{
      if(res.code == 0){
        wx.setStorageSync('user',res.data)
      }
    })
    this.setData({
      orderid:options.orderid,
      pirice:options.pirice
    })
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