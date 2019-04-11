// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        sn: 2,
        title: '《广深港高速铁路跨境旅客运输组织规则》第二十三条',
        id: 11
      },
      {
        sn: 30,
        title: '公开考试的分卡喀什地方卡死了的房间拉萨的法拉利是的裂势力的',
        id: 12
      },
      {
        sn: 4,
        title: '公开考试的分裂势力的',
        id: 13
      },
      {
        sn: 155,
        title: '公开考试的分裂势力的',
        id: 12
      },
      {
        sn: 264,
        title: '公开考试的分裂势力的',
        id: 13
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  }
})