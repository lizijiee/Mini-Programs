// pages/user/user.js
import http from '../../utils/axios'
const template = require('../goodcourse/details/template');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:[],//个人信息
    show:false,//是否登录
    list:[//信息列表
      {name:'课程订单',icon:'../../image/user/myke.png',to:'../info/kec/kec'},
      // {name:'地址管理',icon:'../../image/user/address.png',to:'../info/resslist/resslist'},
      {name:'体测报告',icon:'../../image/user/bg.png',to:'../info/baog/baog'},
      {name:'服务合同',icon:'../../image/user/hetong.png',to:'../info/heto/heto'},
      // {name:'服务合同',icon:'../../image/user/hetong.png',to:''},
      {name:'咨询客服',icon:'../../image/user/banzhur.png',to:'1'},
      

    ],
    back:false,
    url:'',//海报
  },
  // 列表跳转
  navlist(e){
    console.log(e)
    let path = e.currentTarget.dataset.path
    if(!this.data.show){
      if(path == 1){
        wx.makePhoneCall({
          phoneNumber: '01064758922',
        })
      }else{
        wx.navigateTo({
          url: path,
        })
      }
    }else{
      wx.showToast({
        title: '请登录',
        icon:'none'
      })
    }
  },
  // 跳转钱包
  qianbao(){
    if(!this.data.show){
      wx.navigateTo({
        url: '../info/pirce/pirce',
      })
    }else{
      wx.showToast({
        title: '请登录',
        icon:'none'
      })
    }
  },
  // 跳转课表
  kebiao(){
    if(!this.data.show){
      wx.navigateTo({
        url: '../info/kebiao/kebiao',
      })
    }else{
      wx.showToast({
        title: '请登录',
        icon:'none'
      })
    }
  },
  // 跳转信息
  info(){
    if(!this.data.show){
      wx.navigateTo({
        url: '../info/info/info',
      })
    }else{
      wx.showToast({
        title: '请登录',
        icon:'none'
      })
    }
  },
  // 跳转排行
  paih(){
    if(!this.data.show){
      wx.navigateTo({
        url: '../info/paih/paih',
      })
    }else{
      wx.showToast({
        title: '请登录',
        icon:'none'
      })
    }
  },
  // 请求个人信息
  getmyuser(name,url){
    let _this = this
    let shareid = wx.getStorageSync('shareid')
    wx.login({
      success: res => {
        http.get('/wxinterface/authorizes2',{
          code:res.code,
          nickname:name,
          avatarurl:url,
          share_id:shareid?shareid:''
        }).then(res=>{
          console.log(res.data)
          _this.setData({
            show:false,
            user:res.data
          })
          wx.setStorageSync('user', res.data)
          _this.getcode()

        })
      }
    })
   
    
  },
  // 授权登录
  getmyinfo(){
    let _this = this
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success(resend) {
        console.log(resend)
        _this.getmyuser(resend.userInfo.nickName,resend.userInfo.avatarUrl)
       },
       fail(err){
        console.log(err)
       }
    })
  },
  onImgOK: function(e) {
    console.log('e图片信息查看', e);
    http.get('/indexinterface/erweima_return').then(res => {
      console.log(res)
      this.setData({
        url: 'https://myxqty.com' + res.data.erweima_pic
      })
    })
    /* 
     this.setData({
       url: e.detail.path  xx/details/template.js 文件中url引入本地图片
       // url: 'https://myxqty.com/public/uploads/20210627/0b9f6d9d154c55b71a78be9d40b9e426.png'
     })
      */
  },
  gohaibao() {
    if(!this.data.show){
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
      // setTimeout(()=>{
      //   _this.setData({dislabe:false})
      // },2000)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    this.getcode()
    // this.getmyuser()
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
    this.setData({back:false})
    setTimeout(()=>{
      this.setData({back:true})
    },2000)
    http.post('/indexinterface/member_information').then(res=>{
      if(res.code == 0){
        wx.setStorageSync('user',res.data)
      }
    })
    if(wx.getStorageSync('user')){
      this.setData({
        show:false,
        user:wx.getStorageSync('user')
      })
    }else{
      this.setData({
        show:true
      })
    }
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