const Promise = require("../plugins/es6-promise.js")
const openUrl = "https://myxqty.com/interfaces" //正式
const app = getApp()
function wxPromisify(fn) {
  return function(obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function(res) {
        //成功
        // if (res.data.code !== 200) {
        //   if (res.data.msg){
        //     wx.showToast({
        //       title: res.data.msg,
        //       icon: 'none',
        //       duration:3500
        //     })
        //   }
        //   if(res.statusCode == 462 || res.statusCode == 461){
        //     wx.clearStorage()
        //     app.globalData.userInfo = {}
        //     app.globalData.token = ''
        //     app.globalData.loginStatus = false
        //     wx.showModal({
        //       title: '提示',
        //       content: '当前用户未登录是否前往登录',
        //       success (res) {
        //         if (res.confirm) {
        //         wx.navigateTo({
        //           url: '/pages/my/login/login',
        //         })
        //         } else if (res.cancel) {
        //           console.log('用户点击取消')
        //         }
        //       }
        //     })
      
        //   }
        //   reject(res.data)
        //   return
        // }
        resolve(res.data)
      }
      obj.fail = function(res) {
        //失败
        console.log(res)
        wx.showToast({
          title: '请检查网络',
          icon:'none',
          duration: 1000
        })
        reject(res)
      }
      fn(obj)
    })
  }
}
//无论promise对象最后状态如何都会执行
Promise.prototype.finally = function(callback) {
  let P = this.constructor;
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => {
      throw reason
    })
  );
};
/**
 * 微信请求get方法
 * url
 * data 以对象的格式传入
 */
function getRequest(url, data) {
  var getRequest = wxPromisify(wx.request)
  let user =  wx.getStorageSync('user')
  // for(var a in data){
  //   if(!(data[a] + '')){
  //     delete data[a]
  //   }
  // }
  return getRequest({
    url: openUrl + url,
    method: 'GET',
    data: {
      ...data,
      member_id:user?user.id:''
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    complete: function (res) {
      // console.log(res)
        if(res.statusCode == 401){
          wx.redirectTo({
            url: '/pages/login/login',
          })
          wx.clearStorage()
      }
    },
    fail:function(res){
      wx.showToast({
        title: '请检查网络',
        icon:'none',
        duration: 1000
      })
      console.log(res)
    
    }
    // success:(res)=>{
    //   console.log(res)
    //   if(res.status == 401){
    //     wx.navigateTo({
    //       url: '../pages/user/login/login',
    //     })
    //   }
    // },
  })
}

/**
 * 微信请求post方法封装
 * url
 * data 以对象的格式传入
 */
function postRequest(url, data) {
  var postRequest = wxPromisify(wx.request)
  let user =  wx.getStorageSync('user')
  // let user =  {id:1};
  for(var a in data){
    if(!(data[a] + '')){
      delete data[a]
    }
  }
  return postRequest({
    url: openUrl + url,
    method: 'POST',
    data: {
      ...data,
      member_id:user?user.id:''
    },
    complete: function (res) {
      if(res.statusCode == 401){
        wx.redirectTo({
          url:  '/pages/login/login',
        })
        wx.clearStorage()
    }
    },
    fail:function(res){
      wx.showToast({
        title: '请检查网络',
        icon:'none',
        duration: 1000
      })
        console.log(res)
        
    },
    // success:(res)=>{
    //   if(res.status == 401){
    //     wx.navigateTo({
    //       url: '../pages/user/login/login',
    //     })
    //   }
    // },
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
  })
}

function uploadRequest(url,filePath,name,data={}){
  let token =  wx.getStorageSync('token')
  // let uid = wx.getStorageSync('userId')
  return new Promise(resolve=>{
    wx.uploadFile({
      filePath: filePath,
      name: name,
      url:openUrl+ url,
      formData:data,
      header: {
       'Authorization':token,
       'content-type': 'application/x-www-form-urlencoded',
      },
      success:function(res){
        resolve(res.data)
      }
    })
  })
}
module.exports = {
  post: postRequest,
  get: getRequest,
  openUrl: openUrl,
  uploadRequest:uploadRequest,
}