//app.js
var config = require("./config/config.js");
const api = require("./api.js");

App({
  evn: config.dev,
  //封装wx.request
  fetch:function(url, data, method, callback) {
    if (method == "GET") {
      var header = { 'Content-Type': 'application/json' }
    }
    else if (method == "POST") {
      var header = { "Content-Type": "application/x-www-form-urlencoded" }
    }
    wx.request({
      url: this.evn.host + url,
      data: data,
      method: method,
      header: header,
      success(res) {
        callback(null, res.data);
      },
      fail(e) {
        callback(e);
      }
    })
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: login => {
        //获取用户信息
        wx.getUserInfo({
          success: userInfo=>{
            var requestData = {
              code: login.code,
              encryptedData: userInfo.encryptedData,
              iv: userInfo.iv
            }
            this.fetch(api.login, requestData, 'post', (success, data) => {
              console.log(data);
            })

            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            if (this.userInfoReadyCallback) {
              this.userInfoReadyCallback(userInfo)
            }
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null
  }
})