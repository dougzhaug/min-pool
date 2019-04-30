// pages/scoresList/scoresList.js

const app = getApp();

const api = require("./api.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    meta: [],
    end: false,    //页面数据是否到底
    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.setNavigationBarTitle({
      title: '测试成绩'
    })

    api.getScoreList({}).then(data => {
      this.setData({ 
          list: data.data.length == 0 ? false : data.data, 
          meta: data.meta 
        })
    });
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
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!this.data.end) {
      api.getScoreList({
        page: this.data.meta.pagination.current_page + 1
      }).then(data => {
        if (data.data.length !== 0) {
          this.setData({ list: this.data.list.concat(data.data), meta: data.meta })
        } else {
          app.toast('到底了');
          this.setData({ end: true })
        }

      });
    } else {
      app.toast('到底了');
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})