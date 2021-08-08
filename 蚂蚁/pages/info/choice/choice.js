// pages/launch/launch.js
import http from '../../../utils/axios'
import cut from '../../../utils/address'
var app = getApp()
var num = 0

const util = require('../../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xianm: '', //课程项目
    course_pic:'', // 课程头像
    ages: '', //年龄范围
    banj: '', //班级类型
    classtype: '2', //购买选项班级类型
    time: '', //上课时间
    chand: '', //场地类型
    address: '', //场所地址
    image: '', //场地环境
    ds: [],
    nameage: '', //姓名
    tel: '', //手机号
    code: '', //验证码
    button: '购买', //发起按钮

    title: '', //标题
    columns: [], //选项
    ximtype: [], //课程类型
    bjtype: [], //班级类型选项
    timelist: [], //上课时间选项
    timeabled: false, // 控制上课时间是否可以填写
    cdtype: [], //场地类型
    show: false, //控制选择显示
    agestype: [], //年龄选项

    name: '', //选择名称

    x1id: '', //课程id
    x2id: '', //年龄id
    x3id: '', //班级id
    x4id: '', //时间id
    x5id: '', //场地id

    funct: 0, //选择类型

    x: '',
    y: '',
    type: false,

    datetime: '', //上课日期
    datetimes: false, //日期选择
    currentDate: new Date().getTime(),
    minDate: new Date(new Date(new Date().getTime()).getTime() + 86400000 * 1).getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      }
      if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
    timecode: '获取验证码', //时间
    timenull: null,
  },

  //获取验证码
  getcode() {
    if (num > 0) {
      return
    }
    let ps = /^(1[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{9}$/
    if (!ps.test(this.data.tel)) {
      wx.showToast({
        title: '请输入正确手机号',
        icon: 'none'
      })
      return
    }

    num = 60
    this.data.timenull = setInterval(() => {
      if (num <= 0) {
        num = 0
        this.setData({
          timecode: '获取验证码',
          timenull: null
        })
        return
      }
      num--
      this.setData(({
        timecode: num + '后重新获取'
      }))
    }, 1000);
    wx.showToast({
      title: '发送成功',
      icon: 'none'
    })
    http.post('/indexinterface/sendSms', {
      parent_phone: this.data.tel
    }).then(res => {
      console.log(res)
    })
  },
  names(e) {
    this.setData({
      nameage: e.detail.value
    })
  },
  tels(e) {
    this.setData({
      tel: e.detail.value
    })
  },
  codes(e) {
    this.setData({
      code: e.detail.value
    })
  },
  //选择日期
  datetime() {
    this.setData({
      datetimes: true,
    })
  },
  // 确认选择
  confirm(e) {
    console.log(this.data.minDate)
    let time = util.format(e.detail, 'yyyy-MM-dd')
    console.log(time)
    this.setData({
      datetimes: false,
      datetime: time
    })
    this.gettimes(time)
  },
  // 取消选择
  cancel() {
    this.setData({
      datetimes: false
    })
  },
  gettimes(time) {
    http.get('/indexinterface/get_dates', {
      dates: time
    }).then(res => {
      this.setData({
        timelist: res.data
      })
    })
  },

  //场地地址
  cut() {
    wx.navigateTo({
      url: '../../map/map',
    })
  },
  // 选择课程
  xianm() {
    this.setData({
      show: true,
      name: '',
      columns: this.data.ximtype,
      funct: 1
    })
  },
  // 选择年龄
  ages() {
    this.setData({
      show: true,
      name: 'course_age',
      columns: this.data.agestype,
      funct: 2
    })
  },
  //场地详细地址
  input(e) {
    let value = e.detail.value
    this.setData({
      image: value
    })
  },
  // 选择班级类型
  onChange(event) {
    this.setData({
      classtype: event.detail,
    });
    if (event.detail == 1) {
      this.setData({
        button: '发起1V1私教课'
      })
    } else {
      this.setData({
        button: '多人拼课'
      })
    }
  },

  // 选择班级
  banj() {
    this.setData({
      show: true,
      name: 'sku_name',
      columns: this.data.bjtype,
      funct: 3
    })
  },
  // 选择时间
  time() {
    if (!this.data.timelist.length) {
      wx.showToast({
        title: '请先选择上课日期',
        icon: 'none'
      })
    } else {
      this.setData({
        show: true,
        name: 'sku_name',
        columns: this.data.timelist,
        funct: 4
      })
    }
  },
  // 选择场地
  site() {
    this.setData(({
      show: true,
      name: 'sku_name',
      columns: this.data.cdtype,
      funct: 5
    }))
  },
  // 上传照片
  img() {
    let _this = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        console.log(res)
        if (res.tempFiles[0].size > 1024 * 1024 * 10) {
          wx.showToast({
            title: '图片过大',
            icon: 'none'
          })
          return
        }
        http.uploadRequest('/indexinterface/picUpload', res.tempFilePaths[0], 'pic').then(end => {
          console.log(end)
          _this.setData({
            image: end
          })
          wx.showToast({
            title: '上传成功',
          })
        })
      }
    })
  },
  // 选择成功
  onConfirm(e) {
    let _this = this
    console.log(e)
    let data = e.detail.value
    this.setData({
      show: false
    })
    if (_this.data.funct == 1) {
      _this.setData({
        xianm: data
      })
    } else if (_this.data.funct == 2) {
      _this.setData({
        ages: data.course_age
      })
    } else if (_this.data.funct == 3) {
      _this.setData({
        banj: data.sku_name
      })
    } else if (_this.data.funct == 4) {
      _this.setData({
        time: data
      })
    } else if (_this.data.funct == 5) {
      _this.setData({
        chand: data.sku_name
      })
    }
  },
  // 取消选择
  onCancel() {
    this.setData({
      show: false
    })
  },
  //获取课程项目
  getkec(id) {
    http.post('/indexinterface/confirm_purchase_front', {
      my_lesson_id: id
    }).then(res => {
      console.log('resresresresres', res)
      let arr = []
      arr.push(res.data.course_name)
      this.setData({
        ximtype: arr,
        ds: res.data,
        xianm: res.data.course_name
      })
      this.getaxe(res.data.coursecate_id) // 原有1v1逻辑
    })
  },
  // 获取nianling
  getaxe(id) {
    let _this = this
    http.get('/indexinterface/get_age', {
      id: id
    }).then(res => {
      _this.setData({
        agestype: res.data
      })
    })
  },
  // 获取选项
  getdata() {
    let _this = this
    http.get('/indexinterface/course_competition_lists').then(res => {
      let arr1 = []
      let arr2 = []
      let arr3 = []
      res.data.map(a => {
        if (a.fid == 2) {
          arr1.push(a)
          _this.setData({
            bjtype: arr1
          })
        } else if (a.fid == 3) {
          // arr2.push(a)
          // _this.setData({
          //   timelist: arr2
          // })
        } else if (a.fid == 4) {
          arr3.push(a)
          _this.setData({
            cdtype: arr3
          })
        }
      })
    })
  },
  // 发起拼课
  sponsor() {
    let item = this.data;
    if (item.image == '' || item.xianm == '' || item.ages == '' || item.time == '' || item.chand == '' || item.address == '' || item.datetime == '' || item.nameage == '' || item.code == '' || item.tel == '' || item.classtype == '') {
      wx.showToast({
        title: '不可为空',
        icon: 'none'
      })
      return
    }
    http.post('/indexinterface/decide_yzm', {
      contact_phone: item.tel,
      code: item.code
    }).then(a => {
      if (a.code != 0) {
        wx.showToast({
          title: '验证码不正确',
          icon: 'none'
        })
      } else {
        wx.showLoading({})
        http.post('/indexinterface/confirm_purchase', {
          age: this.data.ages,
          classtype: this.data.classtype === '1' ? '1v1私教课' : '3-8精品课',
          my_lesson_id:this.data.x1id,
          lessontime: this.data.datetime + ' ' + this.data.time,
          placetype: this.data.chand,
          place_pic: this.data.image,
          lesson_place: this.data.address,
          longitude: this.data.y,
          latitude: this.data.x,
          is_one: this.data.classtype,
          contact_phone: this.data.tel,
          child_name: this.data.nameage,
          code: this.data.code
        }).then(res => {
          wx.hideLoading({})
          if (res.code == 0) {
            console.log('拼课成功', this.data)
            app.globalData.orderinfo = res.data
            wx.navigateTo({
              // url: '.nfo/sure/sure?types=3',
              url: '../sure/sure?types=3&course_pic='+ this.data.course_pic
            })
          } else {
            wx.showToast({
              title: '请填写正确信息',
              icon: 'none'
            })
          }
        })
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      data
    } = JSON.parse(options.classdetail);
    // console.log('datadata', options.classdetail, data,'data.course_age',data.course_name)
    console.log('data.course_name',data)
    this.setData({
      ages: data.course_age,
      agestype: [data.course_age],
      xianm: data.course_name,
      ximtype: [data.course_name],
      x1id:data.coursecate_id,
      course_pic:data.course_pic
    })
    // console.log('options',options)
    this.getkec(options.id);
    this.getaxe(data.coursecate_id);
    this.getdata()
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
    if (this.data.type) {
      cut.cut(this.data.x, this.data.y).then(res => {
        this.setData({
          address: res
        })
      })
    }
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