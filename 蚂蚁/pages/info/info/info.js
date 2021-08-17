// pages/info/info/info.js
import http from '../../../utils/axios'
var QQMapWX = require('../../../utils/qqmap-wx-jssdk');
const wxMap = new QQMapWX({
  key: 'GV4BZ-R5VK3-VJH3N-3XB62-NK2D5-PNB2E'
});
var num = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city:'',//城市
    phone:'',//手机号
    code:'',//验证码
    name:'',//姓名
    idnumber:'',//身份证号
    age:'',//性别
    
    x:'',
    y:'',
    type:false,
    timecode:'获取验证码',//时间
    timenull:null,

    show:false,//是否需要验证码
  },
  //获取验证码
  getcode(){
    if(num>0){
      return
    }
    let ps = /^(1[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{9}$/
    if(!ps.test(this.data.phone)){
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
      parent_phone:this.data.phone
    }).then(res=>{
      console.log(res)
    })
  },
  // 手机号绑定
  phone(e){
    this.setData({phone:e.detail.value,show:true})
  },
  // 验证码绑定
  code(e){
    this.setData({code:e.detail.value})
  },
  // 姓名绑定
  name(e){
    this.setData({name:e.detail.value})
  },
  // 身份证号绑定
  idnumber(e){
    this.setData({idnumber:e.detail.value})
  },
  // 性别绑定
  age(e){
    this.setData({age:e.detail.value})
  },
  // 选择地址
  xzadd(){
    console.log('点击了')
    wx.navigateTo({
      url: '../../map/map',
    })
  },
  // 保存
  save(){
    wx.showToast({
      title: '保存中...',
      icon:'none'
    })
    let e = this.data
    if(this.data.show){
      if (e.phone == '' || e.code == '' || e.name == '' || e.idnumber == '' || e.age == ''){
        wx.hideLoading({
          success: (res) => {},
        })
        wx.showToast({
          title: '不可为空',
          icon:'none'
        })
       
        return
      }
    }else{
      if(e.phone == '' || e.name == '' || e.idnumber == '' || e.age == ''){
        wx.hideLoading({
          success: (res) => {},
        })
        wx.showToast({
          title: '不可为空',
          icon:'none'
        })
       
        return
      }
    }
    let ps = /^(1[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{9}$/
    if(!ps.test(e.phone)){
      wx.hideLoading({
        success: (res) => {},
      })
      wx.showToast({
        title: '请输入正确手机号',
        icon:'none'
      })
     
      return
    }
    let idn = /^\d{15}|\d{18}$/
    if(!idn.test(e.idnumber)){
      wx.hideLoading({
        success: (res) => {},
      })
      wx.showToast({
        title: '请输入正确身份证号',
        icon:'none'
      })
      
      return
    }
   
    http.post('/indexinterface/update_information',{
      parent_phone:this.data.phone,
      code:this.data.code,
      child_name:this.data.name,
      child_ID:this.data.idnumber,
      child_sex:this.data.age
    }).then(res=>{
      wx.hideLoading({
        success: (res) => {},
      })
      console.log(res)
      wx.showToast({
        title: res.descrip,
        icon:'none'
      })
      if(res.code == 0){
        wx.setStorageSync('user',res.data)
      }
    }).catch(err=>{
      wx.hideLoading({
        success: (res) => {},
      })
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let user = wx.getStorageSync('user');
    console.log('user----------',user)
    if(user.parent_phone){
      this.setData({
        phone:user.parent_phone,
        name:user.child_name,
        idnumber:user.child_ID,
        age:user.child_sex
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