// pages/info/pirce/pirce.js
import http from '..//../../utils/axios'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0,//导航选中下标
    list:['优惠券','积分'],//导航栏内容
    sale:[],//优惠券
    inte:[],//积分
    user:[],//个人信息
  },
  // 切换tab{
    change(e){
      let index = e.currentTarget.dataset.index
      this.setData({
        active:index
      })
      if(index == 0){
        this.getsale()
      }else{
        this.getinte()
      }
    },
    // 获取优惠券
    getsale(){
      http.get('/indexinterface/wallet').then(res=>{
        this.setData({
          sale:res.data
        })
      })
    },
    // 获取积分
    getinte(){
      http.get('/indexinterface/integrals').then(res=>{
        console.log(res)
        this.setData({
          inte:res.data
        })
      })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getsale()
    this.setData({
      user:wx.getStorageSync('user')
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