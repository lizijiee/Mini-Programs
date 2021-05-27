// app.js
App({
  onShow(){
    this.networkManage()
  },
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
   // ---------------------------------------------网络状态 
   networkManage() {
    var that = this;
    //监听网络状态
    wx.onNetworkStatusChange(function (res) {
      if (!res.isConnected) {
        wx.showToast({
          title: '网络似乎不太顺畅',
          icon:'none'
        })
      }
    })
  },//--------end
  globalData: {
    userInfo: null,
    orderinfo:[],//订单信息
    huod:[],//活动信息
    pink:[],//拼课信息
  }
})
