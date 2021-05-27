// pages/goodcourse/goodcourse.js
import http from '../../utils/axios'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,//tab下标
    on_line:[],//线上数据
    offline:[],//线下课程
  },
  // 线下课程跳转
  todeta(e){
    console.log(e)
    let id = e.currentTarget.dataset.id
    // wx.navigateTo({
    //   url: './details/details?id=' + id + '&type=2',
    // })
    wx.navigateTo({
      url: '../huo/huo?id=' + id,
    })
  },
  //切换tab
  onChange(event) {
    wx.showLoading({
      title: '正在加载...',
    })
    let index = event.detail.index
    if(index == 1){
      this.getline()
    }else{
      this.getoff()
    }
  },
  // 获取线上数据
  getline(){
      this.setData({
        on_line:[]
      })
      wx.hideLoading()
    // http.get('/indexinterface/online_courses').then(res=>{
    //   this.setData({
    //     on_line:res.data
    //   })
    //   wx.hideLoading()
    // }).catch(err=>{
    //   wx.hideLoading()
    // })
  },
  // 获取线下数据
  getoff(){
    http.get('/indexinterface/sign_list').then(res=>{
      this.setData({
        offline:res.data
      })
      wx.hideLoading()
    }).catch(err=>{
      wx.hideLoading()
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载...',
    })
    this.getoff()
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