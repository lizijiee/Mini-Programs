// pages/addcourse/addcourse.js
import http from '../../utils/axios'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index1: 0,
    index2: 0,
    option1: [{
        text: '全部',
        value: 0
      },
      {
        text: '按距离排序',
        value: 1
      },
      {
        text: '按时间排序',
        value: 2
      },
    ],

    option2: [{
      text: '默认排序',
      value: 0
    }, ],
    list: [], //数据
    input: '', //搜索
    sameUser: false, // 发起课程和参加课程user判断结果
  },
  // 搜索绑定
  change(e) {
    this.setData({
      input: e.detail.value
    })
  },
  seach() {
    wx.showLoading({
      title: '搜索中...',
    })
    this.getlist(this.data.input)
  },
  // 默认排序
  morpx() {
    this.getlist()
  },
  // 筛选
  screen(event) {
    let index = event.detail
    let place = wx.getStorageSync('place')
    let item = this.data
    this.setData({
      index1: index
    })
    if (index == 0) {
      this.setData({
        input: ''
      })
      this.getlist()
    } else if (index == 1) {
      http.get('/indexinterface/add_lesson_lists', {
        distance_sort: 1,
        latitude: place.latitude,
        longitude: place.longitude,
        search: item.input ? item.input : ''
      }).then(res => {
        this.setData({
          list: res.data
        })
      })
    } else {
      http.get('/indexinterface/add_lesson_lists', {
        addtime: 1,
        latitude: place.latitude,
        longitude: place.longitude,
        search: item.input ? item.input : ''
      }).then(res => {
        this.setData({
          list: res.data
        })
      })
    }
  },
  getlist(a) {
    let place = wx.getStorageSync('place')
    http.get('/indexinterface/add_lesson_lists', {
      latitude: place.latitude,
      longitude: place.longitude,
      search: a ? a : ''
    }).then(res => {
      this.setData({
        list: res.data
      })
    })
    wx.hideLoading({
      success: (res) => {},
    })
  },
  // 跳转详情
  todeta(e) {
    console.log(e)
    let item = e.currentTarget.dataset.id
    console.log(item.people_num, item.max_people_num)
    let id = e.currentTarget.dataset.id.my_lesson_id
    let myid = e.currentTarget.dataset.id.member_id
    let user = wx.getStorageSync('user')
    if (item.people_num == item.max_people_num) {
      wx.showToast({
        title: '该班级已满员',
        icon: 'none'
      })
    } else {
      wx.navigateTo({
        url: '../goodcourse/details/details?id=' + id + '&type=1'
      })
      // else if(myid != user.id){
      //   wx.navigateTo({
      //     url: '../goodcourse/details/details?id=' + id + '&type=1',
      //   })
      // }else {
      // wx.showToast({
      //   title: '该拼课由你发起,不可继续拼课',
      //   icon:'none'
      // })
    }
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
    this.setData({
      index1: 0
    })
    this.getlist()
    wx.hideTabBar()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

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