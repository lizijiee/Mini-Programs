// pages/info/kec/kec.js
import http from '../../../utils/axios'
const util = require('../../../utils/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0, //选中下标
    list: [], //所有
    scrtop: [], //顶部展示
    show: false, //是否显示
  },
  // 立即支付
  submit(e) {
    let _this = this
    let item = e.currentTarget.dataset.item
    let a = item.is_baoming == 0 ? item.order_code : item.code
    let b = item.is_baoming == 0 ? item.order_paid_in_total : item.paid_in_total
    if (item.is_baoming == 0) {
      wx.navigateTo({
        url: '../pay/pay?orderid=' + a + '&pirice=' + b
      })
    } else {
      wx.navigateTo({
        url: '../../huo/pay/pay?orderid=' + a + '&pirice=' + b,
      })
    }
  },
  // 取消订单
  qux(e) {
    wx.showLoading({
      title: '正在取消..',
    })
    let _this = this
    let item = e.currentTarget.dataset.item
    console.log(e)
    if (item.is_baoming == 1) {
      http.post('/indexinterface/cancellation_sign_of_order', {
        my_sign_up_id: item.my_sign_up_id,
        code: item.code
      }).then(res => {
        wx.hideLoading()
        if (res.code == 0) {
          wx.showToast({
            title: '取消成功',
          })
          _this.getlist()
        } else {
          wx.showToast({
            title: res.descrip,
            icon: 'none'
          })
        }
      }).catch(err => {
        wx.hideLoading()
      })
      return
    }
    http.post('/indexinterface/cancellation_of_order', {
      my_lesson_id: item.list_lesson_id,
      code: item.order_code
    }).then(res => {
      wx.hideLoading()
      if (res.code == 0) {
        wx.showToast({
          title: '取消成功',
        })
        _this.getlist()
      } else {
        wx.showToast({
          title: res.descrip,
          icon: 'none'
        })
      }
    }).catch(err => {
      wx.hideLoading()
    })
  },
  // 进入详情
  deta(e) {
    console.log(e)
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../goodcourse/details/details?id=' + id + '&type=1',
    })
  },
  //切换tab
  onChange(event) {
    wx.showLoading({
      title: '正在加载...',
    })
    let index = event.detail.index
    this.setData(({
      active: index,
      list: [], //所有
      scrtop: [], //顶部展示
    }))
    this.getlist()
  },
  getlist() {
    let place = wx.getStorageSync('place')
    http.get('/indexinterface/my_curriculum', {
      status: this.data.active,
      latitude: place.latitude,
      longitude: place.longitude
    }).then(res => {
      wx.hideLoading()
      if (res.data.my_lesson.length != -1 && res.data.recommend.length != -1) {
        this.setData({
          show: false
        })
        res.data.recommend.map(a => {
          let arr = a.addtime.split('-')
          let str = arr[2].split(' ')
          a.addtime = arr[1] + '-' + str[0]
        })
      } else {
        this.setData({
          show: true
        })
      }
      const test = {
        "data": {
          "recommend": [{
            "id": 9,
            "member_id": 3,
            "lesson_id": 4,
            "coach_id": null,
            "age": "11-12岁",
            "classtype": "3-8人精品班",
            "lessontime": "13:00-16:00",
            "lesson_place": "丰台区榴乡路(东铁匠营二小东)",
            "placetype": "小区广场",
            "place_pic": "\/public\/uploads\/20210425\/64dd827daa15a7665d391a95f28997a2.jpg",
            "longitude": "116.42205",
            "latitude": "39.854689",
            "lesson_time": null,
            "lesson_status": 0,
            "address_descrip": null,
            "addtime": "2021-04-25 16:02:39",
            "coursecate_id": 4,
            "course_name": "小学生体测达标课",
            "course_pic": "\/public\/uploads\/20210420\/5a63d74c42111aa05ca80034f42220ed.png",
            "course_age": "6-12岁",
            "course_original_price": "250.00",
            "course_present_price": "59.90",
            "course_attribute": "适合6-12岁儿童\/多种班级选择\/无需基础",
            "course_time": "45分钟 30天内有效",
            "course_prop": "敏捷梯、标志碟、彩虹伞、瑜伽砖",
            "course_people_num": "1-1私教课,3-8人精品班",
            "course_process": "购买课程-联系顾问-预约时间-开始上课",
            "course_descrip": "结合小学体测大纲针对体测项目的要求标准开展针对性训练，改善提高技能，提高体育体测成绩的同时增强体质。",
            "course_pics": "\/public\/uploads\/20210508\/fa6211ee159c4a10bb385ab0052ac9d8.png,",
            "course_people_num_id": 2,
            "course_lesson_num": "12次课",
            "course_status": 1,
            "cour_id": 9,
            "mylessonid": 1,
            "distance": "7.5"
          }, {
            "id": 2,
            "member_id": 3,
            "lesson_id": 2,
            "coach_id": null,
            "age": "3-12岁",
            "classtype": "1-1私教课",
            "lessontime": "2021-05-15 08:30-09:30",
            "lesson_place": "丰台区刘家窑正邦嘉园1号楼(横六条西)",
            "placetype": "操场",
            "place_pic": null,
            "longitude": "116.424908",
            "latitude": "39.854452",
            "lesson_time": null,
            "lesson_status": 0,
            "address_descrip": "76543",
            "addtime": "2021-05-12 19:23:06",
            "coursecate_id": 2,
            "course_name": "跳绳",
            "course_pic": "\/public\/uploads\/20210420\/70093b54e68339383b05ae3f9c6bf3eb.png",
            "course_age": "4-9岁",
            "course_original_price": "12.00",
            "course_present_price": "300.00",
            "course_attribute": "适合4-9岁儿童\/多种班级选择\/无需基础",
            "course_time": "60分钟 120天内有效",
            "course_prop": "敏捷梯、标志碟、彩虹伞、瑜伽砖",
            "course_people_num": "1-1私教课,3-8人精品班",
            "course_process": "购买课程-确认时间-邀请好友-开始上课",
            "course_descrip": "结合中小学体测大纲针对“跳绳”运动的要求标准开展训练，改善提高技能，达到数量和质量上的提高。",
            "course_pics": "\/public\/uploads\/20210508\/08e1fb44183fd7bb7decc1eca639a20c.png,",
            "course_people_num_id": 1,
            "course_lesson_num": "12次课",
            "course_status": 1,
            "cour_id": 2,
            "mylessonid": 26,
            "distance": "7.0"
          }],
          "my_lesson": [{
            "status": 2,
            "list_lesson_id": 38,
            "id": 1,
            "member_id": 16,
            "lesson_id": 1,
            "coach_id": null,
            "age": "3-6岁",
            "classtype": "3-8人精品班",
            "lessontime": "2021-05-22 07:30-08:30",
            "lesson_place": "昌平区沙河北京城建·畅悦居(郑平路西)",
            "placetype": "公园广场",
            "place_pic": null,
            "longitude": "116.360786",
            "latitude": "40.102696",
            "lesson_time": null,
            "lesson_status": 1,
            "address_descrip": "11",
            "addtime": "2021-05-21 23:11:32",
            "coursecate_id": 1,
            "course_name": "体适能",
            "course_pic": "\/public\/uploads\/20210420\/a74dad48a5d82aa0598e35f05ca4194c.png",
            "course_age": "3-4岁",
            "course_original_price": "12.00",
            "course_present_price": "99.90",
            "course_attribute": "适合3-9岁儿童\/多种班级选择\/无需基础",
            "course_time": "45分钟 30天内有效",
            "course_prop": "敏捷梯、标志碟、彩虹伞、瑜伽砖",
            "course_people_num": "1-1私教课,3-8人精品班",
            "course_process": "购买课程-联系顾问-预约时间-开始上课",
            "course_descrip": "通过趣味训练的方式，结合学生差异化的身体素质情况制定高中低三种程度的训练方式，提高学生身体协调性、爆发力、敏捷与反应等能力。",
            "course_pics": "\/public\/uploads\/20210508\/0398c9ca23603e35b3632773838759ed.png,",
            "course_people_num_id": 2,
            "course_lesson_num": "12次课",
            "course_status": 1,
            "cour_id": 1,
            "order_paid_in_total": "99.90",
            "order_code": "2969a7a7c4ec52b7052f837e64ff4e13",
            "order_addtime": "2021-05-21 23:11:32",
            "is_baoming": 0,
            "is_comment": 0
          }]
        },
        "code": 0,
        "descrip": "我的课程信息获取成功"
      }
      console.log('res.data.my_lesson',res.data.recommend)
      this.setData({
        list: res.data.my_lesson,
        scrtop: res.data.recommend
      })
    })
  },
  // 跳转评价
  estime(e) {
    console.log(e)
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../estimate/estimate?id=' + id,
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
    this.getlist()
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