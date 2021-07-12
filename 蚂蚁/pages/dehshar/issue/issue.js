// pages/dehshar/issue/issue.js
import http from '../../../utils/axios'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:'',//文本域内容
    image:'',//封面图
    title:'',//标题
    show:null,//是否发布成功
  },
  // 重新发布
  again(){
    this.setData({
      show:null
    })
  },
  // 返回运动打卡
  bark(){
    wx.switchTab({
      url: '../dehshar',
    })
  },
  // 文本域发生变化
  onchange(e){
    let value = e.detail.value
    this.setData({
      value
    })
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
         })
      }
      })
  },
  //标题
  cage(e){
    let value = e.detail.value
    this.setData({
      title:value
    })
  },
  // 发布文章
  isue(){
    let _this = this
    if(this.data.value == '' || this.data.image == '' ||this.title == ''){
      wx.showToast({
        title: '请输入完整内容',
        icon:'none'
      })
    }else{
      console.log('发布成功')
      http.post('/indexinterface/add_knowledge',{
        share_title:this.data.title,
        share_pic:this.data.image,
        share_descrip:this.data.value,
      }).then(res=>{
        if(res.code == 0){
          _this.setData({
            show:0
          })
        }else{
          _this.setData({
            show:1
          })
        }
      })
    }
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