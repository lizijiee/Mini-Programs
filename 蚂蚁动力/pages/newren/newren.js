// pages/newren/newren.js
import http from '../../utils/axios'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    left:[
      {title:'../../image/jies/huwai.png',desc:'通过趣味训练的方式，结合学生差异化的身体素质情况制定高中低三种程度的训练方式，提高学生身体协调性、爆发力、敏捷与反应等能力。',id:'5',content:'户外体适能'},
      {title:'../../image/jies/wudao@2x.png',desc:'结合中小学体测大纲针对“跳绳”运动的要求标准开展训练，改善提高技能，达到数量和质量上的提高。',id:'4',content:'武道三项'},
      {title:'../../image/jies/tiaosheng.png',desc:' 结合小学体测大纲针对体测项目的要求标准开展针对性训练，改善提高技能，提高体育体测成绩的同时增强体质。',id:'8',content:'跳绳专项课'},
    ],
    right:[
      {title:'../../image/jies/xiaoxue.png',desc:' 结合中学体测大纲针对体测项目的要求标准开展针对性训练，改善提高技能，提高体育体测成绩的同时增强体质。',id:'10',content:'小学生体能达标'},
      {title:'../../image/jies/zhongxue.png',desc:'武道三项是提高力量、速度、精神反应能力的中高强度练习，适合有一定体能基础的学员进行能力提升的训练板块。',id:'6',content:'中学生体能达标'},
    ],
    backgroundColor:'#FE893C',
    color:'white',
    data:[]
  },
  // 返回上一级
  fanh(){
    wx.navigateBack({
      delta:1
    })
  },
  // 跳转详情
  navto(e){
    console.log(e)
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../goodcourse/details/details?id=' + id + '&type=2',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    http.get('/indexinterface/zhuanxiang_return').then(res=>{
      console.log(res)
      this.setData({
        data:res.data
      })
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