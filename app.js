//app.js
var config = require("./config/config.js");

const api = require("./api.js");

App({
  evn: config.production,

  //初始化
  onLaunch: function () {
    
    // 登录
    if (!wx.getStorageSync('token')){
      console.log('无token');
      wx.navigateTo({
        url: '/pages/login/login'
      })
    }else{
      console.log('有token');
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

                  this.fetch('/mini_program/login', requestData, 'POST', {'Authorization':''}).then(data=>{
                    this.backAndRefresh();
                  });

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
  fetch: function (url, data, method, header, loading) {

    var headers = { 
          "Page": this.globalData.page,       //页码
          "PerPage": this.globalData.perPage  //每页数量
        };

    if (method == "GET") {
      headers.ContentType = "application/json";
    }
    else if (method == "POST" || method == "PUT") {
      headers.ContentType = "application/x-www-form-urlencoded";
    }

    //添加头部token
    var token = wx.getStorageSync('token');
    if (token) {
      headers.Authorization = token;
    }else{
      if (url !='/mini_program/login'){//其他不需要token的接口都需要写在这里
        wx.navigateTo({
          url: '/pages/login/login'
        })
      }
    }

    var that = this;
    //使用promise
    return new Promise(function (resolve, reject) {
      //开启加载提示框
      that.showLoadingStyle(loading);

      wx.request({
        url: that.evn.host + url,
        data: data,
        method: method,
        header: Object.assign({}, headers, header),
        success(res) {
          that.hideLoadingStyle(loading); //关闭加载提示框
          //处理token
          if (res.header.Authorization) {
            wx.setStorageSync('token', res.header.Authorization);
          }

          if (res.statusCode >= 200 && res.statusCode < 300){
    
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
          that.hideLoadingStyle(loading); //关闭加载提示框
          reject(error);
        }
      })
    })
  },
  //http异常公共处理
  handleHttpError:function(error){
    if (error.message == 'Unauthenticated.'){
      wx.navigateTo({
        url: '/pages/login/login'
      })
    }
    return true;
  },
  //toast异常提示信息
  toast: function (msg, duration){
    wx.showToast({
      title: msg,
      image: '/assets/images/prompt.png',
      duration: duration ? duration : 1500,
    })
  },
  //返回上一页并刷新
  backAndRefresh:function(){
    var pages = getCurrentPages(); // 当前页面
    var beforePage = pages[pages.length - 2]; // 前一个页面
    wx.navigateBack({
      success: function () {
        beforePage.onLoad(); // 执行前一个页面的onLoad方法
      }
    });
  },
  //显示加载样式
  showLoadingStyle:function(style){
    switch(style){
      case 'close':
        break;
      case 'default':
        wx.showLoading({
          title: '加载中...',
          mask: true,
        })
        break;
      case 'other':
        '未开发'
        break
      default:
        wx.showLoading({
          title: '加载中...',
          mask: true,
        })
    }
  },
  //隐藏加载样式
  hideLoadingStyle: function (style) {
    switch (style) {
      case 'close':
        break;
      case 'default':
        wx.hideLoading()
        break;
      case 'other':
        '未开发'
        break
      default:
        wx.hideLoading()
    }
  },
  globalData: {
    userInfo: null,
    page:1,
    perPage:20,
    listTab:{
      tab: 'all',       //列表页的tab参数
      refresh:false     //进入列表页时是否需要刷新 false不需要 true需要
    },
    test:{
      sataus:-1,        //测试的状态  1测试中 2已完成 -2暂停中
      currentId:0,      //用户当前测试的题号 
    },
  }
})