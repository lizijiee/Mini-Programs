// pages/dehshar/dehshar.js
import http from '../../utils/axios'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],//数据
    user:[],//个人信息
  },
  // 点赞
  dianz(e){
    console.log(e)
    let _this = this
    if(this.data.user == []){
      wx.showToast({
        title: '暂未登录',
        icon:'none'
      })
    }else{
      let _this = this
      let id = e.currentTarget.dataset.sharid
      http.get('/indexinterface/knowledge_sharing_good',{
        share_id:id,
      }).then(res=>{
        if(res.code == 0){
          _this.getlist()
        }
      })
    }
   
  },
  // 获取数据
  getlist(){
    http.get('/indexinterface/knowledge_sharing').then(res=>{
      console.log(res)
      this.setData({
        list:res.data
      })
    })
  },
  // 发布文章
  issue(){
    if(wx.getStorageSync('user')){
        wx.navigateTo({
          url: './issue/issue',
        })
    }else{
      wx.showToast({
        title: '请登录',
        icon:'none'
      })
    }
  
  },
  // 跳转详情
  tonath(e){
    console.log(e)
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: './details/details?id='+id,
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
    if(wx.getStorageSync('user')){
      this.setData({
        show:false,
        user:wx.getStorageSync('user')
      })
    }
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