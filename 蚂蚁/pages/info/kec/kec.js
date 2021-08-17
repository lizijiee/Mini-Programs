// pages/info/kec/kec.js
import http from '../../../utils/axios'
const util = require('../../../utils/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0, //选中下标
    list: [], //所有
    scrtop: [], //顶部展示
    show: false, //是否显示
  },
  // 立即支付
  submit(e) {
    let _this = this
    let item = e.currentTarget.dataset.item
    let a = item.is_baoming == 0 ? item.order_code : item.code
    let b = item.is_baoming == 0 ? item.order_paid_in_total : item.paid_in_total
    if (item.is_baoming == 0) {
      wx.navigateTo({
        url: '../pay/pay?orderid=' + a + '&pirice=' + b
      })
    } else {
      wx.navigateTo({
        url: '../../huo/pay/pay?orderid=' + a + '&pirice=' + b,
      })
    }
  },
  // 取消订单
  qux(e) {
    wx.showLoading({
      title: '正在取消..',
    })
    let _this = this
    let item = e.currentTarget.dataset.item
    console.log(e)
    if (item.is_baoming == 1) {
      http.post('/indexinterface/cancellation_sign_of_order', {
        my_sign_up_id: item.my_sign_up_id,
        code: item.code
      }).then(res => {
        wx.hideLoading()
        if (res.code == 0) {
          wx.showToast({
            title: '取消成功',
          })
          _this.getlist()
        } else {
          wx.showToast({
            title: res.descrip,
            icon: 'none'
          })
        }
      }).catch(err => {
        wx.hideLoading()
      })
      return
    }
    http.post('/indexinterface/cancellation_of_order', {
      my_lesson_id: item.list_lesson_id,
      code: item.order_code
    }).then(res => {
      wx.hideLoading()
      if (res.code == 0) {
        wx.showToast({
          title: '取消成功',
        })
        _this.getlist()
      } else {
        wx.showToast({
          title: res.descrip,
          icon: 'none'
        })
      }
    }).catch(err => {
      wx.hideLoading()
    })
  },
  // 进入详情
  deta(e) {
    console.log(e)
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../goodcourse/details/details?id=' + id + '&type=1',
    })
  },
  //切换tab
  onChange(event) {
    wx.showLoading({
      title: '正在加载...',
    })
    let index = event.detail.index
    this.setData(({
      active: index,
      list: [], //所有
      scrtop: [], //顶部展示
    }))
    this.getlist()
  },
  getlist() {
    let place = wx.getStorageSync('place')
    http.get('/indexinterface/my_curriculum', {
      status: this.data.active,
      latitude: place.latitude,
      longitude: place.longitude
    }).then(res => {
      wx.hideLoading()
      if (res.data.my_lesson.length != -1 && res.data.recommend.length != -1) {
        this.setData({
          show: false
        })
        res.data.recommend.map(a => {
          let arr = a.addtime.split('-')
          let str = arr[2].split(' ')
          a.addtime = arr[1] + '-' + str[0]
        })
      } else {
        this.setData({
          show: true
        })
      }
      console.log('res.data.my_lesson',res.data.recommend)
      this.setData({
        list: res.data.my_lesson,
        scrtop: res.data.recommend
      })
    })
  },
  // 跳转评价
  estime(e) {
    console.log(e)
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../estimate/estimate?id=' + id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.getlist()
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