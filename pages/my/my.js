// pages/my/my.js
const app = getApp();

const api = require("./api.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的'
    })
    wx.setBackgroundColor({
      backgroundColor: '#108EE9', // 窗口的背景色为白色
      backgroundColorBottom: '#EAEAEA', // 底部窗口的背景色为白色
    })
    api.getMy({}).then(data => {
      this.setData({ user: data.user })
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
    
    wx.showNavigationBarLoading() //在标题栏中显示加载

    api.getMy({},'close').then(data => {
      this.setData({ user: data.user })
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }).catch(error=>{
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    });    
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
  abuilding:function(){
    app.toast('施工中...');
  },
  //跳转到列表页的已背题
  toReadList:function(){
    app.globalData.listTab = {
      tab: 'read',       //列表页的tab参数
      refresh: true     //进入列表页时是否需要刷新 false不需要 true需要
    };
    wx.switchTab({
      url: '/pages/list/list'
    })
  },
  //跳转到列表页的未背题
  toUnreadList: function () {
    app.globalData.listTab = {
      tab: 'unread',       //列表页的tab参数
      refresh: true     //进入列表页时是否需要刷新 false不需要 true需要
    };
    wx.switchTab({
      url: '/pages/list/list'
    })
  },
  /**
   * 客服
   */
  customerService:function(){
    wx.makePhoneCall({
      phoneNumber: '18830102005' // 仅为示例，并非真实的电话号码
    })
  }
})