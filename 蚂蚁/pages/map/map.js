// pages/map/map.js
// 引入SDK核心类，js文件根据自己业务，位置可自行放置
var QQMapWX = require('../../utils/qqmap-wx-jssdk');
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude:'39.915599',
    longitude:'116.403406',
    searchValue:'',
    searchList:[],
    show:false,
    x:'',
    y:'',
  },
  
  //定位方法
getUserLocation: function () {
  var _this = this;
  wx.getSetting({
    success: (res) => {
      if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
        //未授权
        wx.showModal({
          title: '请求授权当前位置',
          content: '需要获取您的地理位置，请确认授权',
          success: function (res) {
            if (res.cancel) {
              //取消授权
              wx.showToast({
                title: '拒绝授权',
                icon: 'none',
                duration: 1000
              })
            } else if (res.confirm) {
              //确定授权，通过wx.openSetting发起授权请求
              wx.openSetting({
                success: function (res) {
                  if (res.authSetting["scope.userLocation"] == true) {
                    wx.showToast({
                      title: '授权成功',
                      icon: 'success',
                      duration: 1000
                    })
                    //再次授权，调用wx.getLocation的API
                    _this.geo();
                  } else {
                    wx.showToast({
                      title: '授权失败',
                      icon: 'none',
                      duration: 1000
                    })
                  }
                }
              })
            }
          }
        })
      } else if (res.authSetting['scope.userLocation'] == undefined) {
       //用户首次进入页面,调用wx.getLocation的API
        _this.geo();
      }
      else {
        console.log('授权成功')
        //调用wx.getLocation的API
        _this.geo();
      }
    }
  })
},        

// 获取定位城市
geo: function () {
  var _this = this;
  wx.getLocation({
    type: 'wgs84',
    success: function (res) {
      console.log(res)
      _this.setData({
        latitude:res.latitude,
        longitude:res.longitude
      })
    }
  })
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    console.log(options)
    if(options&&options.x){
      this.setData({
        latitude: options.x,
        longitude: options.y,
        x: options.x,
        y: options.y,
      })
    }else{
       _this.getUserLocation();
    }
      // 实例化API核心类
      qqmapsdk = new QQMapWX({
        key: 'GV4BZ-R5VK3-VJH3N-3XB62-NK2D5-PNB2E'
      });
  },
  vmodel(e){
    console.log(e)
    this.setData({
      searchValue:e.detail.value
    })
  },
  searchAddress:function(){
    wx.showLoading({
      title: '加载中...',
    })
    if(!this.data.searchValue){
        this.setData({
          searchList:[]
        })
        wx.hideLoading({
          success: (res) => {},
        })
        return
    }
    this.setData({show:true})
    let self = this
    qqmapsdk.search({
          keyword: this.data.searchValue,
          success: function (res) {
              console.log(res);
              self.setData({
                searchList:res.data
              })
              wx.hideLoading({
                success: (res) => {},
              })
          },
          fail: function (res) {
              console.log(res);
          },
        complete: function (res) {
            console.log(res);
        }
    });
    wx.hideLoading({
      success: (res) => {},
    })
  },
  selectAddress(e){
    this.setData({show:false})
    console.log(e)
    let data = e.currentTarget.dataset.data
    this.setData({
      latitude: data.location.lat,
      longitude: data.location.lng,
      x: data.location.lat,
      y: data.location.lng,
    })
  },
  markertap(e){
    console.log(e)
  },
  regionChange(e){
    console.log(e)
    if(e.detail.centerLocation){
      this.setData({
        x: e.detail.centerLocation.latitude,
        y: e.detail.centerLocation.longitude,
      })
    }
  },
  save(){
    var that = this;
    var pages = getCurrentPages(); // 获取页面栈
    var prevPage = pages[pages.length - 2]; // 上一个页面
    prevPage.setData({
      type:true,
      x:that.data.x,
      y:that.data.y
    })
    setTimeout(()=>{
      wx.navigateBack()
    },100)
   console.log(this.data.x,this.data.y)
  },
  maptap(e){
    console.log(e)
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
    var _this = this;
    //调用定位方法
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