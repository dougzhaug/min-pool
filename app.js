//app.js
var config = require("./config/config.js");

App({
  evn: config.dev,

  //初始化
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    var token = wx.getStorageSync('token');
    // 登录
    if (!token){
      this.login();
    }
  },
  //登录
  login: function () {
    wx.login({
      success: login => {
        //获取用户信息
        wx.getSetting({
          success: setting => {
            if (setting.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框 
              //获取用户信息
              wx.getUserInfo({
                success: userInfo => {
                  var requestData = {
                    code: login.code,
                    encryptedData: userInfo.encryptedData,
                    iv: userInfo.iv
                  }

                  this.fetch('/mini_program/login', requestData, 'POST', {'Authorization':''}).then(data=>{});

                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(userInfo)
                  }
                }
              })
            }
          }
        })
      }
    })
  },
  //封装wx.request
  fetch: function (url, data, method, header) {

    if (method == "GET") {
      var headers = { 'Content-Type': 'application/json' }
    }
    else if (method == "POST") {
      var headers = { "Content-Type": "application/x-www-form-urlencoded" }
    }

    //添加头部token
    var token = wx.getStorageSync('token');
    if (token) {
      headers.Authorization = token;
    }

    var that = this;
    //使用promise
    return new Promise(function (resolve, reject) {
      wx.request({
        url: that.evn.host + url,
        data: data,
        method: method,
        header: Object.assign({}, headers, header),
        success(res) {

          //处理token
          if (res.header.Authorization) {
            wx.setStorageSync('token', res.header.Authorization);
          }

          if(res.statusCode == 200){
    
            resolve(res.data);

          }else{
            
            var error = res.data
            //处理http公共错误
            if(that.handleHttpError(error)){
              reject(error);
            }
            
          }
        },
        fail(error) {
          reject(error);
        }
      })
    })
  },
  //http异常公共处理
  handleHttpError:function(error){
    return true;
  },
  globalData: {
    userInfo: null,
  }
})