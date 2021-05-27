// pages/info/sure/sure.js
import http from '../../../utils/axios'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: [], //确认购买信息
    show: false,
    value: '', //input
    coupshow: false, //优惠券是否显示
    pirce: '', //金钱价格
    disabled: false,
    check: false, //是否选择优惠券
    jin: '', //金额
    confim: false,
    types: '', //购买类型
    checked: false,
    protocolChecked:false,
    user: [],
    button: '发起拼课'
  },
  // 新人专享
  onChange(e) {
    let item = this.data
    this.setData({
      checked: e.detail,
    });
    if (e.detail) {
      this.setData({
        value: '',
        pirce: 19.9,
        jin: 19.9,
      })
      item.info.coupon.map(res => {
        res.checked = false
      })
    } else {
      this.setData({
        pirce: item.info.course_present_price,
        jin: item.info.course_present_price,
      })
    }
  },
  // 选择优惠券
  xzyouh() {
    if (this.data.checked) {
      wx.showToast({
        title: '您已选择新人优惠',
      })
    } else {
      this.setData({
        coupshow: true
      })
    }
  },
  // 关闭选择优惠券
  onClose() {
    this.setData({
      coupshow: false
    });
  },
  // 确认选择优惠券
  cut(e) {
    console.log(e)
    let item = this.data
    let index = e.currentTarget.dataset.index
    let _this = this
    let data = item.info.coupon[index]
    var playStatus = "info.coupon[" + index + "].checked";

    if (data.checked) {
      let a = (Number(item.jin) + Number(data.coupon_money)).toFixed(2)
      _this.setData({
        pirce: a,
        jin: a
      })
    } else {
      let a = (item.jin - data.coupon_money).toFixed(2)
      _this.setData({
        pirce: a,
        jin: a
      })
    }
    console.log(item.jin, 1)
    _this.setData({
      [playStatus]: !data.checked,
      value: ''
    })
  },
  onChange(e){
    this.setData({
      protocolChecked: e.detail,
    });
  },
  // 发起拼课
  seve() {
    let item = this.data;
    if(!item.protocolChecked){
      wx.showToast({
        title: '请仔细阅读合同，并进行勾选',
        icon:'none'
      })
      return 
    }
    if (item.value > item.info.integral) {
      wx.showToast({
        title: '当前积分余额不足',
        icon: 'none'
      })
    } else {
      wx.showLoading()
      let user = wx.getStorageSync('user')
      let index = item.info.coupon.findIndex(a => {
        return a.checked == true
      })
      var id = ''
      if (index != -1) {
        id = item.info.coupon[index].id
      }
      console.log(index)
      http.post('/indexinterface/generate_order2', {
        is_zhuanxiang: item.checked ? 1 : 0,
        my_lesson_id: item.info.my_lesson_id,
        total: item.info.course_present_price,
        paid_in_total: item.pirce,
        integral: item.value ? item.value : 0,
        coupon_id: id ? id : 0,
        age: item.info.age,
        classtype: item.info.classtype,
        lessontime: item.info.lessontime,
        lesson_place: item.info.lesson_place,
        placetype: item.info.placetype,
        address_descrip: item.info.place_pic,
        longitude: item.info.longitude,
        latitude: item.info.latitude,
        is_pinke: item.types,
        jiarupinke_id: item.types == 1 ? item.info.jiarupinke_id : 0,
        contact_phone: item.info.contact_phone,
        child_name: item.info.child_name,
        code: item.info.code
      }).then(res => {

        if (res.code == 0) {
          this.setData({
            confim: true
          })
          wx.navigateTo({
            url: '../pay/pay?orderid=' + res.data.code + '&pirice=' + res.data.paid_in_total,
          })
        } else {
          wx.hideLoading({
            success: (res) => {},
          })
          wx.showToast({
            title: res.descrip,
            icon: 'none'
          })
        }
        wx.hideLoading({
          success: (res) => {},
        })
      })
    }
  },
  // 积分转换
  input(e) {
    let value = this.validateNumber(e.detail.value)
    let item = this.data
    let _this = this
    let num = 0.1
    if (Number(value) >= Number(item.info.max_integral)) {
      if (Math.floor(item.info.integral) >= Number(item.info.max_integral)) {
        console.log(1)
        value = item.info.max_integral
        _this.setData({
          pirce: item.jin
        })
      } else {
        console.log(2)
        value = Math.floor(item.info.integral)
        _this.setData({
          pirce: item.jin
        })
      }
    } else {
      if (Math.floor(item.info.integral) >= Number(item.info.max_integral)) {
        console.log(3)
        _this.setData({
          pirce: item.jin
        })
      } else {
        //  value = Math.floor(item.info.integral)
        _this.setData({
          pirce: item.jin
        })
      }
    }
    let a = item.jin - (value * num)
    a = a.toFixed(2)
    value = parseInt(value)
    console.log(item.jin, 2)
    this.setData({
      pirce: a,
      value: value
    })
  },

  // 正则
  validateNumber(val) {
    return val.replace(/\D/g, '')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let user = wx.getStorageSync('user')

    console.log('options:', options, user);

    // if(options&&options.types){
    //   if(options.types == 1){
    //     this.setData({button:'加入拼课'})
    //   }else if(options.types == 3){
    //     this.setData({button:'购买'})
    //   }
    // }
    // 发起拼课用户与加入拼客用户相同
    if (options.course === 'join') {
      this.setData({
        button: '加入拼课'
      })
    }

    let info = app.globalData.orderinfo
    console.log(info)
    info.coupon.map(a => {
      a.checked = false
    })
    this.setData({
      user,
      info,
      pirce: info.course_present_price,
      jin: info.course_present_price,
      types: options.types
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