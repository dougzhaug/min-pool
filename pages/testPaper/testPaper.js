// pages/testPaper/testPaper.js

const app = getApp();

const api = require("./api.js");

const WxParse = require('../../plugins/wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    answersHidden: false,
    detail: null,
    totalScore:10,
    score:0,
    tabType:'all',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //获取类目信息
    api.getPoolDetail({ pool_id: 1 }).then(data => {
      this.setData({
        detail: data.data[0],
      })
      //富文本框
      var answers = that.data.detail.answers;
      WxParse.wxParse('detail_answers', 'html', answers, that, 5);
    }).catch(error => {
      console.log(error);
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 打分
   */
  grade:function(e){
    var score = e.currentTarget.dataset.score;
    this.setData({
      score: score,
    })

  },
    //切换答案显示状态
  toggleAnswers: function () {
    if (this.data.answersHidden) {
      this.setData({
        answersHidden: false
      })
    } else {
      this.setData({
        answersHidden: true
      })
    }
  },
  //切换已背 未背状态
  toggleRead: function () {
    var that = this
    var detail_status = 'detail.status';
    api.toggleStatus({ pool_id: this.data.detail.id, status: this.data.detail.status }).then(data => {
      wx.showToast({
        title: that.data.detail.status == 1 ? '标记为未背' : '标记为已背',
        icon: 'success',
        duration: 3000
      });

      that.setData({
        [detail_status]: that.data.detail.status == 1 ? -1 : 1,
      })
    }).catch(error => {
      console.log(error);
    });
  },
  //下一个上一个
  nextLastQuestion: function (e) {
    var that = this;
    api.getNextOrLast({
      type: e.currentTarget.dataset.type,
      sn: this.data.detail.sn,
      tabType: this.data.tabType
    }).then(data => {
      if (data.data.length == 0) {
        app.toast('已经到头了');
      } else {
        that.setData({
          detail: data.data[0],
          // answersHidden:true,
        })
        //富文本框
        var answers = that.data.detail.answers;
        WxParse.wxParse('detail_answers', 'html', answers, that, 5);
      }
    })
  }
})