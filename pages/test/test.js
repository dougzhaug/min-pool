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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '技术测试'
    })

    // if (wx.getStorageSync('token')) {
    //   api.getPools({}).then(data => {
    //     this.setData({ list: data.data, meta: data.meta })
    //   });
    // }

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
  startTest:function(){
    var that = this;

    api.startTest({}).then(data => {
      console.log(data);
      
    }).catch(error=>{
      if(error.code==40701){  //有暂停的测试未处理
        that.handleTestExists();
      }
    });
  },
  //处理存在暂停中的测试
  handleTestExists:function(){
    wx.showModal({
      title: '提示',
      content: '存在暂停中的测试！',
      confirmText:'继续上次',
      cancelText:'从头再来',
      success(res) {
        if (res.confirm) {
          api.restartTest({}).then(data => {
            
          })
          console.log('用户点击确定')
        } else if (res.cancel) {
          api.startAllOver().then(data=>{

          })
          console.log('用户点击取消')
        }
      }
    })
  }
})