// pages/huo/info/info.js
import http from '../../../utils/axios'
const app = getApp()
var num = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',//姓名
    age:'',//年龄
    code:'',//身份证号
    tel:'',//电话号
    id:'',//参加活动id
    timecode:'获取验证码',//时间
    timenull:null,
    numcode:'',//验证码
  },
  names(e){this.setData({name:e.detail.value})},
  ages(e){this.setData({age:e.detail.value})},
  codes(e){this.setData({code:e.detail.value})},
  tels(e){this.setData({tel:e.detail.value})},
  numcode(e){this.setData({numcode:e.detail.value})},


//获取验证码
  getcode(){
    if(num>0){
      return
    }
    let ps = /^(1[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{9}$/
    if(!ps.test(this.data.tel)){
      wx.showToast({
        title: '请输入正确手机号',
        icon:'none'
      })
      return
  }

      num = 60
  this.data.timenull = setInterval(() => {
    if(num <= 0){
      num = 0
      this.setData({
        timecode:'获取验证码',
        timenull:null
      })
      return
    }
      num--
      this.setData(({
        timecode:num + '后重新获取'
      }))
  },1000);
  wx.showToast({
    title: '发送成功',
    icon:'none'
  })
    http.post('/indexinterface/sendSms',{
      parent_phone:this.data.tel
    }).then(res=>{
      console.log(res)
    })
  },
  //参与活动
  addh(){
    wx.showLoading({
      title: '加载中...',
    })
    let item = this.data
    if(item.name == ''||item.age == ''||item.code == ''||item.tel == ''||item.numcode == ''){
      wx.hideLoading()
      wx.showToast({
        title: '信息不可为空',
        icon:'none'
      })
    }else{
      http.post('/indexinterface/decide_yzm',{
        contact_phone:item.tel,
        code:item.numcode
      }).then(res=>{
        if(res.code == 0){
          let data = {
            name:item.name,
            age:item.age,
            code:item.age,
            tel:item.tel,
            id:item.id,
            numcode:item.numcode
          }
          app.globalData.huod = data
          http.post('/indexinterface/sign_confirm_purchase',{
            my_sign_up_id:item.id
          }).then(a=>{
             wx.hideLoading()
            console.log(data)
            app.globalData.orderinfo = a.data
            wx.navigateTo({
              url: '../order/order?id='+item.id,
            })
          })

        }else{
          wx.showToast({
            title: '验证码不正确',
            icon:'none'
          })
        }
      })
     
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({id:options.id})
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