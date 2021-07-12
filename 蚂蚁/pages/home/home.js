// pages/home/home.js
import http from '../../utils/axios'
var QQMapWX = require('../../utils/qqmap-wx-jssdk');
// 实例化API核心类
const wxMap = new QQMapWX({
  key: 'GV4BZ-R5VK3-VJH3N-3XB62-NK2D5-PNB2E'
});

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [], //主体信息
    swiper: [], //轮播图信息
    place: '', //位置信息
    show: true, //登录状态
    user: [], //个人信息
    current: 0, //当前所在页面的 index
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔
    duration: 800, //滑动动画时长
    circular: true, //是否采用衔接滑动
    display: [
      '../../image/icon/g1.png',
      '../../image/icon/g2.png',
      '../../image/icon/g3.png'
    ], //选项卡
    input: '',
    seachlist: [], //搜索结果
    shows: false,
    latitude: '',
    longitude: '',
    ressshow: false, //地址选择
    resslist: [], //地址选择
    joinList: [], // 附近拼课班级列表,
    msgList: [{
      title: '蚂蚁动力教育活动火爆进行中...'
    }, {
      title: '蚂蚁动力教育活动火爆进行中...'
    }],
    lessonList: [{
        id: 2,
        name: '跳绳',
        src: '../../image/icon/icon_skip.png'
      },
      {
        id: 5,
        name: '体适能',
        src: '../../image/icon/icon_tishineng.png'
      },
      {
        id: 8,
        name: '小体达标',
        src: '../../image/icon/icon_xiaotidabiao.png'
      },
      {
        id: 10,
        name: '中体达标',
        src: '../../image/icon/icon_zhongtidabiao.png'
      },
      {
        id: 6,
        name: '武道专项',
        src: '../../image/icon/icon_wudaosanxiang.png'
      },
      {
        id: null,
        name: '活动赛事',
        src: '../../image/icon/icon_huodongsaishi.png'
      },
      {
        id: 101,
        name: '蚂蚁专享',
        src: '../../image/icon/icon_mayizhuanxiang.png'
      },
      {
        id: null,
        name: '更多',
        src: '../../image/icon/icon_gengduo.png'
      }
    ],
    imgInfoArrLength: 0, // 轮播图列表的长度
    centerItem: 0, // 居中项的位置
    assess: [], // 评价列表
    imgInfoArr: [{
        src: '../../image/icon/commit.png',
        text: '测试数据',
        id: 0
      },
      {
        src: '../../image/icon/commit.png',
        text: '测试数据',
        id: 1
      },
      {
        src: '../../image/icon/commit.png',
        text: '测试数据',
        id: 2
      },
      {
        src: '../../image/icon/commit.png',
        text: '测试数据',
        id: 3
      }
    ],
    
  },
  // 授权登录
  login() {
    let _this = this
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success(resend) {
        console.log(resend)
        _this.getmyuser(resend.userInfo.nickName, resend.userInfo.avatarUrl)
      },
      fail(err) {
        console.log(err)
      }
    })
  },
  bindload(msg) {
    console.log('公众账号显示成功', msg)
  },
  binderror(error) {
    console.log('公众账号显示失败', error)
  },
  // 请求个人信息
  getmyuser(name, url) {
    let _this = this
    let shareid = wx.getStorageSync('shareid')
    wx.login({
      success: res => {
        console.log('resresresresres', res)
        http.get('/wxinterface/authorizes2', {
          code: res.code,
          nickname: name,
          avatarurl: url,
          share_id: shareid ? shareid : ''
        }).then(res => {
          console.log(res.data)
          _this.setData({
            show: false,
            user: res.data
          })
          wx.setStorageSync('user', res.data)
        })
      }
    })
  },
  // 新人好礼
  xinren() {
    wx.navigateTo({
      url: '../newren/newren',
    })
  },
  // 打开地址选择
  showPopup() {
    this.setData({
      ressshow: true
    });
    this.getaddress()
  },
  // 关闭地址选择
  onClose() {
    this.setData({
      ressshow: false
    });
  },
  // 搜索绑定
  change(e) {
    if (e.detail.value == '') {
      this.setData({
        seachlist: [],
        shows: false
      })
    }
    this.setData({
      input: e.detail.value
    })
  },
  // 
  // 跳转拼课
  navpk() {
    if (wx.getStorageSync('user')) {
      wx.navigateTo({
        url: '../launch/launch',
      })
    } else {
      wx.showToast({
        title: '暂未登录',
        icon: 'none'
      })
    }
  },
  pinketodeta(e) {
    console.log(e)
    let item = e.currentTarget.dataset.id
    let id = e.currentTarget.dataset.id.my_lesson_id
    if (item.people_num === item.max_people_num) {
      wx.showToast({
        title: '该班级已满员，您可发起拼班。',
        icon: 'none'
      })
    } else {
      wx.navigateTo({
        url: '../goodcourse/details/details?id=' + id + '&type=1'
      })
    }
  },
  // 跳转详情
  todeta(e) {
    console.log(e)
    let id = e.currentTarget.dataset.id;
    if (id === null) {
      wx.showToast({
        title: '功能开发中...',
        icon: 'none'
      })
      return
    }
    if (id.people_num && id.people_num === id.max_people_num) {
      wx.showToast({
        title: '该班级已满员，您可发起拼班。',
        icon: 'none'
      })
      return
    }
    if (id < 100) {
      wx.navigateTo({
        url: '../goodcourse/details/details?id=' + id + '&type=2',
      })
    }
    if (id === 101) {
      wx.switchTab({
        url: '../goodcourse/goodcourse',
      })
    }

  },
  // 跳转轮播图
  swiper(e) {
    console.log(e)
    let id = e.currentTarget.dataset.id
    let type = e.currentTarget.dataset.type
    if (type == 0) {
      wx.navigateTo({
        url: '../dedail/dedail?id=' + id,
      })
    } else if (type == 1) {
      wx.navigateTo({
        url: '../huo/huo?id=' + id,
      })
    }
  },
  // 获取首页信息
  getinfo() {
    http.get('/indexinterface/index').then(res => {
      console.log(res)
      this.setData({
        msgList:res.data.gundong,
        list: res.data.list,
        swiper: res.data.carousel,
        assess: res.data.pingjia
      })
    })
  },

  // 搜索课程
  seach() {
    http.get('/indexinterface/search_course', {
      search: this.data.input
    }).then(res => {
      if (res.data != []) {
        console.log(2)
        this.setData({
          seachlist: res.data,
          shows: true
        })
      } else {
        console.log(1)
        wx.showToast({
          title: '暂无拼课',
          icon: 'none'
        })
      }
    })
  },
  // 课程
  kec(e) {
    console.log(e)
    this.setData({
      shows: false,
      input: ''
    })
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../goodcourse/details/details?id=' + id,
    })
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
                _this.reverseGeocoder(39.918187, 116.391012)
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                })
                // _this.getaddress()
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
        } else {
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
          latitude: res.latitude,
          longitude: res.longitude
        })
        wx.setStorageSync('place', res)
        _this.reverseGeocoder(res.latitude, res.longitude)
      }
    })
  },
  // 获取所有地址
  getaddress() {
    let _this = this
    http.get('/indexinterface/my_address').then(res => {
      res.data.map(a => {
        var that = this
        wxMap.reverseGeocoder({
          location: {
            // 你的经纬度
            latitude: a.latitude,
            longitude: a.longitude,
          },
          success: function (end) {
            a.address = end.result.address
            setTimeout(() => {
              _this.setData({
                resslist: res.data
              })
            }, 100)
          },
          fail: function (end) {
            console.log(end);
          }
        });
      })
    })
  },

  /**经纬度逆解析 */
  reverseGeocoder(x, y) {
    var that = this
    wxMap.reverseGeocoder({
      location: {
        // 你的经纬度
        latitude: x,
        longitude: y,
      },
      success: function (res) {
        console.log(res);
        that.setData({
          place: res.result.formatted_addresses.recommend
        })
      },
      fail: function (res) {
        console.log(res);
      }
    });
  },
  // 切换位置
  cut(e) {
    console.log(e)
    let item = e.currentTarget.dataset.item
    this.setData({
      place: item.address,
      ressshow: false,
    })
    let data = {
      latitude: item.latitude,
      longitude: item.longitude
    }
    wx.setStorageSync('place', data)
  },
  //切换当前位置
  dqcut() {
    this.reverseGeocoder(this.data.latitude, this.data.longitude)
    this.setData({
      ressshow: false
    })
    let data = {
      latitude: this.data.latitude,
      longitude: this.data.longitude
    }
    wx.setStorageSync('place', data)
  },
  // 获取轮播图
  getimg() {
    http.get('/indexinterface/index_carousel').then(res => {
      this.setData({
        swiper: res.data
      })
    })
  },

  getlist(a) {
    let place = wx.getStorageSync('place')
    http.get('/indexinterface/add_lesson_lists', {
      latitude: place.latitude,
      longitude: place.longitude,
      search: a ? a : ''
    }).then(res => {
      console.log(res.data)
      this.setData({
        joinList: res.data
      })
    })
    wx.hideLoading({
      success: (res) => {},
    })
  },
  // 轮播图切换
  changeFun(e) {
    this.setData({
      centerItem: e.detail.current,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.login()

    // this.getsetting()
    if (options && options.member_id) {
      wx.setStorageSync('shareid', options.member_id)
    }
    // this.getimg()
    this.getUserLocation()
    // 轮播图切换
    var len = this.data.imgInfoArr.length;
    var center = parseInt(len / 2);
    this.setData({
      imgInfoArrLength: len,
      centerItem: center
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
    http.post('/indexinterface/member_information').then(res => {
      if (res.code == 0) {
        wx.setStorageSync('user', res.data)
      }
    })
    this.getlist()
    if (wx.getStorageSync('user')) {
      this.setData({
        show: false,
        user: wx.getStorageSync('user')
      })
    } else {
      this.setData({
        show: true
      })
    }
    this.getinfo()
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
});