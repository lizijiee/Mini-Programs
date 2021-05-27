// pages/huo/huo.js
import http from '../../utils/axios'
const template = require('../goodcourse/details/template');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:[],
    button:'参与活动',
    dislabe:true,//是否可以分享
    url:'',//海报
    id:'',
    phoneshow:false,
    imagelist:[],//图片
  },
  onImgOK: function(e) {
    this.setData({
      url: e.detail.path
    })
  },
  //pay参与购买
  pays(){
    let user = wx.getStorageSync('user')
    if(user){
      let item = this.data
      wx.navigateTo({
        url: './info/info?id=' + item.id,
      })
    }else{
      wx.showToast({
        title: '请登录后重试',
        icon:'none'
      })
    }
    
  },
  //查看海报
  gohaibao() {
    let user = wx.getStorageSync('user')
    if(user){
      wx.previewImage({
        current: this.data.url,
        urls: [this.data.url],
        complete(e) {
            console.log(e)
        }
      })
    }else{
      wx.showToast({
        title: '请登录',
        icon:'none'
      })
    }
  },
  getcode(){
    let _this = this
    http.post('/wxinterface/qr_code').then(res=>{
      console.log(res)
      this.setData({
        template:template('https://myxqty.com' + res.data)
      })
      setTimeout(()=>{
        _this.setData({dislabe:false})
      },2000)
    })
  },
   // 拨打电话
   phone(){
    this.setData({
      phoneshow:true
    })
    // wx.makePhoneCall({
    //   phoneNumber: '01064758922',
    // })
  },
  onClose() {
    this.setData({ phoneshow: false });
  },
  phos(e){
    console.log(e)
    let phone = e.currentTarget.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone,
    })
    this.setData({
      phoneshow:false
    })
  },
  //请求数据
  getdata(id){
    http.get('/indexinterface/carousel_detail',{
      id
    }).then(res=>{
      console.log(res)
      this.setData({
        data:res.data
      })
      let img = res.data.sign_pics
      let imglist = img.split(',')
      let index =  imglist.findIndex(item=>{
         return item == ''
      })
      imglist.splice(index,1)
      console.log(imglist)
      this.setData({
        imagelist:imglist
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getcode()
    this.getdata(options.id)
    this.setData({id:options.id})
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