// pages/index/index.js
Component({

  /**
   * 页面的初始数据
   */

  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    active: {
      type: Number,
      value: 0,
    }
  },
  data: {
      "list": [
        {
          "pagePath": "/pages/home/home",
          "text": "首页",
          "iconPath": "/image/tab/home.png",
          "selectedIconPath": "/image/tab/home_s.png"
        },
        {
          "pagePath": "/pages/addcourse/addcourse",
          "text": "附近班级",
          "iconPath": "/image/tab/addcourse.png",
          "selectedIconPath": "/image/tab/addcourse_s.png"
        },
        {
          "pagePath": "/pages/goodcourse/goodcourse",
          "text": "蚂蚁专享",
          "iconPath": "/image/tab/goodcourse.png",
          "selectedIconPath": "/image/tab/goodcourse_s.png"
        },
        {
          "pagePath": "/pages/dehshar/dehshar",
          "text": "运动打卡",
          "iconPath": "/image/tab/dehshar.png",
          "selectedIconPath": "/image/tab/dehshar_s.png"
        },
        {
          "pagePath": "/pages/user/user",
          "text": "个人中心",
          "iconPath": "/image/tab/user.png",
          "selectedIconPath": "/image/tab/user_s.png"
        }
      ]
  },
 
  methods:{
    onChange(event) {
      wx.switchTab({
        url:this.data.list[event.detail].pagePath
      })
    },
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideTabBar()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideTabBar()
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