// pages/info/resslist/resslist.js
import http from '../../../utils/axios'
var QQMapWX = require('../../../utils/qqmap-wx-jssdk');
const wxMap = new QQMapWX({
  key: 'GV4BZ-R5VK3-VJH3N-3XB62-NK2D5-PNB2E'
});
import Dialog  from '@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],//数据
    show:false,//弹出层
    ids:'',//选中地址id
    data:[],//选中数据
  },
  // 删除地址
  del(){
    this.setData({show:false})
    let _this = this
    Dialog.confirm({
      title: '删除',
      message: '确认删除改地址？',
    }).then(() => {
        http.get('/indexinterface/my_address_delete',{
          address_id:_this.data.ids
        }).then(res=>{
          if(res.code == 0){
            wx.showToast({
              title: '删除成功',
            })
            _this.getlist()
          }else{
            wx.showToast({
              title: '删除失败',
              icon:'none'
            })
          }
        })
    })
    .catch(() => {
      // on cancel
    });
  },
  //修改
  amend(){
    let e = this.data.data
    wx.navigateTo({
      url: '../address/address?ress=' + e.address+'&id='+e.id+'&latitude='+e.latitude+'&longitude='+e.longitude,
    })
  },
  // 关闭
  onClose(){
    this.setData({show:false})
  },
  // 长按地址
  select(e){
    console.log(e)
    this.setData({show:true,ids:e.currentTarget.dataset.id.id,data:e.currentTarget.dataset.id})
  },
  // 添加地址
  add(){
    wx.navigateTo({
      url: '../address/address',
    })
  },
  // 获取数据
  getlist(){
    let _this = this
    wx.showLoading({
      title: '正在加载...',
    })
    http.get('/indexinterface/my_address').then(res=>{
        res.data.map(a=>{
              var that = this
              wxMap.reverseGeocoder({
                location: {
                  // 你的经纬度
                  latitude: a.latitude,
                  longitude: a.longitude,
                },
                success: function (end) {
                   a.address = end.result.formatted_addresses.recommend
                   setTimeout(()=>{
                    _this.setData({
                      list:res.data
                    })
                  },100)
                },
                fail: function (end) {
                  console.log(end);
                }
              });
        })
        wx.hideLoading()
       
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
    this.setData({show:false})
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