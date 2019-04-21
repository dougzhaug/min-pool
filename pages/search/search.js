// pages/search/search.js

const api = require("./api.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    subjectId:0,
    list: [],
    end:false,
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
    if (!this.data.end) {
      api.getPools({
        subject_id: options.id,
        keyword: this.tab,
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

  },
  cancelTab:function(){
    wx.navigateBack({ changed: true });
  },
  //搜索绑定事件
  search:function(e){
    api.getPools({ keyword: e.detail.value }).then(data => {
      this.setData({ 
        list: data.data.length == 0 ? false : data.data, 
        meta: data.meta,
        end:false,
      })
    });
  }
})