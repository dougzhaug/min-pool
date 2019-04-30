// pages/testScore/testScore.js

const app = getApp();

const api = require("./api.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    score:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.setNavigationBarTitle({
      title: '测试成绩'
    })

    if (options.score){
      this.setData({
        score: options.score
      })
    }
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

  },
  /**
   * 再来一次
   */
  startTest:function(){
    api.startTest({}).then(data => {
      wx.setStorageSync('test.currentId', 0);
      wx.navigateTo({
        url: '/pages/testPaper/testPaper',
      })
    }).catch(error => {
      app.toast(error.message);
    });
  },
  /**
   * 完成
   */
  goToTest:function(){
    wx.switchTab({
      url: '/pages/test/test'
    })
  }
})