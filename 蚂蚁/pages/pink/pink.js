// pages/huo/info/info.js
import http from '../../utils/axios'
const app = getApp()
var num = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '', //姓名
    age: '', //年龄
    code: '', //身份证号
    tel: '', //电话号
    id: '', //参加活动id
    timecode: '获取验证码', //时间
    timenull: null,
    numcode: '', //验证码
    
    // 默认课程信息
    course_name:'',
    course_date:'',
    course_type:'',
    course_age:'',
    course_place_type:'',
    course_place:'',
    course_place_detail:''
  },
  names(e) {
    this.setData({
      name: e.detail.value
    })
  },
  validateNumber(val) {
    return val.replace(/\D/g, '')
  },
  ages(e) {
    let value = this.validateNumber(e.detail.value)
    this.setData({
      age: value
    })
  },
  codes(e) {
    this.setData({
      code: e.detail.value
    })
  },
  tels(e) {
    this.setData({
      tel: e.detail.value
    })
  },
  numcode(e) {
    this.setData({
      numcode: e.detail.value
    })
  },


  //获取验证码
  getcode() {
    if (num > 0) {
      return
    }
    let ps = /^(1[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{9}$/
    if (!ps.test(this.data.tel)) {
      wx.showToast({
        title: '请输入正确手机号',
        icon: 'none'
      })
      return
    }

    num = 60
    this.data.timenull = setInterval(() => {
      if (num <= 0) {
        num = 0
        this.setData({
          timecode: '获取验证码',
          timenull: null
        })
        return
      }
      num--
      this.setData(({
        timecode: num + '后重新获取'
      }))
    }, 1000);
    wx.showToast({
      title: '发送成功',
      icon: 'none'
    })
    http.post('/indexinterface/sendSms', {
      parent_phone: this.data.tel
    }).then(res => {
      console.log(res)
    })
  },
  //参与活动
  addh() {
    wx.showLoading({
      title: '加载中...',
    })
    let item = this.data
    if (item.name == ''||item.age == '' || item.tel == '' || item.numcode == '') {
      wx.hideLoading()
      wx.showToast({
        title: '信息不可为空',
        icon: 'none'
      })
    } else {
      http.post('/indexinterface/decide_yzm', {
        contact_phone: item.tel,
        code: item.numcode
      }).then(res => {
        if (res.code == 0) {
          let data = {
            ...app.globalData.orderinfo,
            child_name: item.name,
            age: item.age+'岁',
            contact_phone: item.tel,
            code: item.numcode
          }
          app.globalData.orderinfo = data
          console.log(data)
          wx.hideLoading()
          wx.navigateTo({
            url: '../info/sure/sure?types=1&course=join',
          })
        } else {
          wx.hideLoading()
          wx.showToast({
            title: '验证码不正确',
            icon: 'none'
          })
        }
      })



    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const classinfo =JSON.parse(options.classdetail).data
    // console.log(data)
    this.setData({
      course_name:classinfo.course_name,
      course_date:classinfo.lessontime,
      course_type:classinfo.classtype,
      course_age:classinfo.course_age,
      course_place_type:classinfo.placetype,
      course_place:classinfo.lesson_place,
      course_place_detail:classinfo.address_descrip
    })
    // this.setData({
    //   id: options.id
    // })
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