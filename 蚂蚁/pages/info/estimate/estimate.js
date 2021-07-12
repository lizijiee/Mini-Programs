// pages/info/estimate/estimate.js
import http from '../../../utils/axios'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:[],//数据
    value: 5,//评分
    input:'',//内容
    image:'',//图片
    show:null,//评价完成
  },
  // 文本域发生变化
  onchange(e){
    let value = e.detail.value
    this.setData({
      input:value
    })
  },
  // 评分
  onChange(event) {
    this.setData({
      value: event.detail,
    });
  },
   // 选择图片
   choseimg(){
    let _this = this
    wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'], 
        sourceType: ['album', 'camera'], 
        success: function (res) {
          console.log(res)
          if(res.tempFiles[0].size > 1024*1024*10){
            wx.showToast({
              title: '图片过大',
              icon:'none'
            })
            return
          }
         http.uploadRequest('/indexinterface/picUpload',res.tempFilePaths[0],'pic').then(end=>{
           console.log(end)
           _this.setData({
              image:end
           })
           wx.showToast({
             title: '上传成功',
             icon:'none',
           })
         })
      }
      })
  },
  getdata(id){
    http.post('/indexinterface/add_lesson_comment_form',{
      lesson_id:id
    }).then(res=>{
      this.setData({
        item:res.data
      })
    })
  },
  // 发布评论
  seve(){
    console.log(1)
    let item = this.data
    if(item.input == ''){
      wx.showToast({
        title: '不可为空',
        icon:'none',
      })
    }else{
      console.log('item:',item)
      http.post('/indexinterface/add_lesson_comment',{
        course_id:item.item.coach_id,
        lesson_id:item.item.id,
        star_num:item.value,
        comment_pic:item.image,
        comment_descrip:item.input
      }).then(res=>{
        if(res.code == 0){
          this.setData({
            show:0
          })
        }else{
          this.setData({
            show:1
          })
        }
      })
    }
  },
  // 返回
  bark(){
    wx.navigateBack({
      delta: 1,
    })
  },
  //重新评价
  again(){
    this.setData({show:null})
  },
  // 返回首页
  home(){
    wx.switchTab({
      url: '../../home/home',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getdata(options.id)
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