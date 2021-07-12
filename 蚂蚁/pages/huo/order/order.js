// pages/info/sure/sure.js
import http from '../../../utils/axios'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:[],//确认购买信息
    show:false,
    value:'',//input
    coupshow:false,//优惠券是否显示
    pirce:'',//金钱价格
    disabled:false,
    check:false,//是否选择优惠券
    jin:'',//金额
    confim:false,
    types:'',//购买类型
    checked:false,
    protocolChecked:false,
    user:[],
  },
 
  // 选择优惠券
  xzyouh(){
    if(this.data.checked){
      wx.showToast({
        title: '您已选择新人优惠',
      })
    }else{
      this.setData({coupshow:true})
    }
  },
  // 关闭选择优惠券
  onClose() {
    this.setData({ coupshow: false });
  },
  // 确认选择优惠券
  cut(e){
    console.log(e)
    let item = this.data
    let index = e.currentTarget.dataset.index
    let _this = this
    let data = item.info.coupon[index]
    var playStatus = "info.coupon[" + index + "].checked";

    if(data.checked){
      let a = (Number(item.jin) + Number(data.coupon_money)).toFixed(2)
      _this.setData({pirce:a,jin:a})
    }else{
      let a = (item.jin - data.coupon_money).toFixed(2)
     _this.setData({pirce:a,jin:a})
    }
    console.log(item.jin,1)
    _this.setData({
      [playStatus]:!data.checked,
      value:''
    })
  },
  onChange(e){
    this.setData({
      protocolChecked: e.detail,
    });
  },
  // 发起拼课
  seve(){
    let item = this.data;
    if(!item.protocolChecked){
      wx.showToast({
        title: '请仔细阅读合同，并进行勾选',
        icon:'none'
      })
      return 
    }
    if(item.value > item.info.integral){
      wx.showToast({
        title: '当前积分余额不足',
        icon:'none'
      })
    }else{  
      wx.showLoading()
      let hb = app.globalData.huod
      let index = item.info.coupon.findIndex(a=>{
        return a.checked == true
      })
      var id = ''
      if(index != -1){
         id = item.info.coupon[index].id
      }
      console.log(index)
      http.post('/indexinterface/sign_order',{
        total:item.sign_price,
        paid_in_total:item.pirce,
        integral:item.value?item.value:0,
        coupon_id:id?id:0,
        my_sign_up_id:hb.id,
        child_name:hb.name,
        child_age:hb.age,
        child_ID:hb.code,
        contact_phone:hb.tel,
        code:hb.numcode
      }).then(res=>{
        if(res.code == 0){
            this.setData({
              confim:true
            })
            wx.navigateTo({
              url: '../pay/pay?orderid='+res.data.code+'&pirice='+res.data.paid_in_total,
            })
          wx.hideLoading({
            success: (a) => {},
          })
        }else{
          wx.hideLoading({
            success: (res) => {},
          })
          wx.showToast({
            title: res.descrip,
            icon:'none'
          })
        }
      }).catch(err=>{
        wx.hideLoading({
          success: (res) => {},
        })
      })
    }
  },
  // 积分转换
  input(e){
    let value = this.validateNumber(e.detail.value)
    let item = this.data
    let _this = this
    let num = 0.1
    if(Number(value) >= Number(item.info.max_integral)){
      if(Math.floor(item.info.integral) >= Number(item.info.max_integral)){
        console.log(1)
          value = item.info.max_integral
          _this.setData({pirce:item.jin})
      }else{
        console.log(2)
           value = Math.floor(item.info.integral)
           _this.setData({pirce:item.jin})
      }
    }else{
      if(Math.floor(item.info.integral) >= Number(item.info.max_integral)){
        console.log(3) 
          _this.setData({pirce:item.jin})
      }else{
          //  value = Math.floor(item.info.integral)
          _this.setData({pirce:item.jin})
      }
    }
    let a = item.jin - (value*num)
    a = a.toFixed(2)
    value = parseInt(value)
    console.log(item.jin,2)
    this.setData({pirce:a,value:value})
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
  
    let info = app.globalData.orderinfo
    console.log(info)
    if(info.coupon.length != -1){
      info.coupon.map(a=>{
        a.checked = false
      })
    }
    this.setData({
      user,
      info,
      pirce:info.sign_price,
      jin:info.sign_price,
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