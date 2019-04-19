// pages/search/search.js

const api = require("./api.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    subjectId:0,
    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    if (options.id !== undefined) {
      this.setData({
        subjectId: options.id ? options.id : this.subjectId,
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
  cancelTab:function(){
    wx.navigateBack({ changed: true });
  },
  //搜索绑定事件
  search:function(e){
    api.getPools({ subject_id: this.data.subjectId, keyword: e.detail.value }).then(data => {
      this.setData({ list: data.data.length == 0 ? false : data.data})
    });
  }
})