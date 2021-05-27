// pages/dedail/dedail.js
import http from '../../utils/axios'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:'',
    link:''
  },
  getdata(id){
    console.log('id',id)
    http.get('/indexinterface/index_carousel_detail',{
      id
    }).then(res=>{
      let str = res.data.carousel_content_img.replace(/\<p>/g,'<p style="text-indent：2em;line-height: 50rpx;font-size: 28rpx;">')
      // console.log(str)
      this.setData({
        list:res.data.carousel_content_img,
        link:res.data.carousel_link
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getdata(options.id)
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