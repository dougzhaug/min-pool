// pages/test/test.js

const app = getApp();

const api = require("./api.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    alarm:false,  //闹铃状态
    vibrate:null, //记录循环事件
    status: wx.getStorageSync('test.status'),  //测试的状态
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    wx.setNavigationBarTitle({
      title: '技术测试'
    })

    //获取测试的状态
    this.getTestStatus();
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
    this.getTestStatus();
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
    wx.stopPullDownRefresh();
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

  },
  //震动开关
  vibrate:function(e){
    var that = this;
    if(this.data.alarm == false){
      var i = 0;
      var timer = setInterval(function () {
        that.setData({ alarm: true })
        i++;
        if (i >= 30) {
          that.setData({ alarm: false })
          clearInterval(timer);
        }
        //循环执行代码
        wx.vibrateLong();
      }, 1000)
      this.setData({ vibrate:timer})
    }else{
      that.setData({ alarm: false })
      clearInterval(this.data.vibrate);
    }
  },
  //开启测试
  startTest:function(){
    var that = this;

    api.startTest({}).then(data => {
      wx.setStorageSync('test.currentId',0);
      wx.navigateTo({
        url: '/pages/testPaper/testPaper',
      })
    }).catch(error=>{
      if(error.code==40701){  //有暂停的测试未处理
        that.handleTestExists();
      }
      if (error.code == 40702) {  //测试进行中..
        that.handleTestUnderway();
      }
    });
  },
  //处理存在暂停中的测试
  handleTestExists:function(){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '存在暂停中的测试！',
      confirmText:'继续上次',
      cancelText:'从头再来',
      success(res) {
        if (res.confirm) {
          that.restartTest();
          console.log('用户点击确定')
        } else if (res.cancel) {
          api.startAllOver().then(data=>{
            wx.setStorageSync('test.currentId', 0);
            wx.navigateTo({
              url: '/pages/testPaper/testPaper',
            })
          })
          console.log('用户点击取消')
        }
      }
    })
  },
  //处理进行中的测试
  handleTestUnderway: function () {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '您有正在进行的测试！',
      confirmText: '继续答题',
      cancelText: '暂停',
      success(res) {
        if (res.confirm) {
          that.goToTestPaper();
          console.log('用户点击确定')
        } else if (res.cancel) {
          that.pauseTest();
          console.log('用户点击取消')
        }
      }
    })
  },
  //暂停测试
  pauseTest:function(){
    api.pauseTest().then(data => {
      wx.showModal({
        title: '提示',
        content: '测试已经暂停',
        confirmText: '确定',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            //刷新当前页面的数据
            getCurrentPages()[getCurrentPages().length - 1].onLoad()
          }
        }
      })
    }).catch(error => {
      if (error.code == 40705) {  //测试时间已经结束
        wx.showModal({
          title: '提示',
          content: '测试已经结束',
          confirmText: '交卷',
          cancelText: '再测一次',
          // showCancel:false,
          success(res) {
            if (res.confirm) {
              api.submitTest({}).then(data => {
                wx.navigateTo({
                  url: '/pages/testScore/testScore?score=' + data.score,
                })
              })
            } else if (res.cancel) {
              api.startAllOver().then(data => {
                wx.setStorageSync('test.currentId', 0);
                wx.navigateTo({
                  url: '/pages/testPaper/testPaper',
                })
              })
              console.log('用户点击取消')
            }
          }
        })
      }
    });
  },
  //进入试卷页面
  goToTestPaper:function(){
    wx.navigateTo({
      url: '/pages/testPaper/testPaper',
    })
  },
  /**
   * 获取测试当前状态
   */
  getTestStatus:function(){
    var that = this;
    api.getTestStatus({}).then(data => {
      console.log(data);
      that.setData({
        status: data.status,
      })
    })
  },
  /**
   * 开始暂停中的测试
   */
  restartTest:function(){
    api.restartTest({}).then(data => {
      wx.navigateTo({
        url: '/pages/testPaper/testPaper',
      })
    })
  }
})