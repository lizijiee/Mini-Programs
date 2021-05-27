// pages/goodcourse/details/details.js
import http, {
  post
} from '../../../utils/axios'
const template = require('./template');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radio: '1',
    data: [], //详情数据
    attr: [], //详情解说
    imagelist: [], //详情
    template: '',
    url: '', //海报
    button: '购买', //
    type: '',
    dislabe: true, //是否可以分享
    ages: [], //年龄段
    active: 0,
    phoneshow: false, //拨打电话
    share: '', //分享按钮
  },

  onImgOK: function (e) {
    this.setData({
      url: e.detail.path
    })
  },
  gohaibao() {
    let user = wx.getStorageSync('user')
    if (user) {
      wx.previewImage({
        current: this.data.url,
        urls: [this.data.url],
        complete(e) {
          console.log(e)
        }
      })
    } else {
      wx.showToast({
        title: '请登录',
        icon: 'none'
      })
    }
  },
  //s切换详情
  cut(e) {
    console.log(e)
    let index = e.currentTarget.dataset.index
    this.setData({
      active: index
    })
    this.getselect(this.data.ages[index].id)
  },
  //获取详情图
  getselect(id) {
    console.log(3)
    http.get('/indexinterface/age_select', {
      id
    }).then(res => {
      let img = res.data[0].course_pics
      let imglist = img.split(',')
      let index = imglist.findIndex(item => {
        return item == ''
      })
      imglist.splice(index, 1)
      console.log(imglist)
      this.setData({
        imagelist: imglist
      })
    })
  },
  getdeta(id) {
    wx.showLoading({
      title: '正在加载...',
    })
    http.get('/indexinterface/add_lesson_detail', {
      lesson_id: id,
      is_one: this.data.type == 2 ? 1 : 2
    }).then(res => {
      console.log(res)
      wx.hideLoading()
      let attr = res.data.course_attribute.split('/')
      console.log(1)

      // let img = res.data.course_pics.split(',')
      // let index =  img.findIndex(item=>{
      //   return item == ''
      // })
      // img.splice(index,1)
      res.data.age.map(a => {
        a.yes = '../../../image/icon/yes.png',
          a.no = '../../../image/icon/no.png'
      })
      console.log(2)

      this.getselect(res.data.age[0].id)
      this.setData({
        data: res.data,
        attr: attr,
        ages: res.data.age
      })
    })
  },
  // 加入拼课与购买
  pays() {
    let user = wx.getStorageSync('user')
    if (user) {


      wx.showLoading({
        title: '加载中',
      })
      let item = this.data
      if (item.type == 1) {
        this.getpay(2, 1)
      } else {
        if (item.radio == 1) {
          wx.navigateTo({
            url: '../../launch/launch',
          })
        } else {
          wx.navigateTo({
            url: '../../info/choice/choice?type=1&id=' + item.data.id,
          })
        }
      }
    } else {
      wx.showToast({
        title: '请登录',
        icon: 'none'
      })
    }
  },
  // 请求购买
  getpay(type, is_pinke) {
    let item = this.data
    let _this = this
    http.post('/indexinterface/confirm_purchase', {
      my_lesson_id: item.data.lesson_id,
      is_one: type,
      is_lesson_id: item.data.my_lesson_id
    }).then(res => {
      wx.hideLoading()
      if (res.code == 0) {
        app.globalData.orderinfo = res.data
        wx.navigateTo({
          url: '../../pink/pink',
        })
        // wx.navigateTo({
        //   url: '../../info/sure/sure?types=' + is_pinke,
        // })
      } else {
        wx.showToast({
          title: res.descrip,
        })
      }
    }).catch(err => {
      wx.hideLoading()
    })
  },
  // 拨打电话
  phone() {
    this.setData({
      phoneshow: true
    })
    // wx.makePhoneCall({
    //   phoneNumber: '01064758922',
    // })
  },
  onClose() {
    this.setData({
      phoneshow: false
    });
  },
  phos(e) {
    console.log(e)
    let phone = e.currentTarget.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone,
    })
    this.setData({
      phoneshow: false
    })
  },
  getcode(id) {
    let _this = this
    http.post('/wxinterface/qr_code', {
      lesson_id: id ? id : ''
    }).then(res => {
      console.log(res)
      this.setData({
        template: template('https://myxqty.com' + res.data)
      })
      setTimeout(() => {
        _this.setData({
          dislabe: false
        })
      }, 2000)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(options)
    if (options.type == 1) {
      this.getcode(options.id)
      this.setData({
        button: '购买',
        type: options.type,
        radio: options.type,
        share: '邀请好友'
      })
    } else {
      this.getcode()
      // this.setData({button:'购买',type:options.type,radio:options.type,share:'分享'})
      this.setData({
        button: '购买',
        type: options.type,
        radio: options.type,
        share: '邀请好友'
      })
    }
    this.getdeta(options.id)

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
    wx.hideLoading({
      success: (res) => {},
    })
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