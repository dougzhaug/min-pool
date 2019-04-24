// pages/feedback/feedback.js

const app = getApp();

const api = require("./api.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '意见反馈'
    })
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
  // 手机号部分
  inputPhoneNum: function (e) {
    let phoneNumber = e.detail.value
    if (phoneNumber.length === 11) {
      let checkedNum = this.checkPhoneNum(phoneNumber)
    }
  },
  checkPhoneNum: function (phoneNumber) {
    let str = /^1\d{10}$/
    if (str.test(phoneNumber)) {
      return true
    } else {
      app.toast("手机格式错误");
      return false
    }
  },
  //提交表单
  formSubmit:function(e){
    console.log(e.detail.value)
    var value = e.detail.value;
    if(!value.feedback){
      app.toast("请输入反馈内容");
      return false
    }
    if (value.phone){
      if(!this.checkPhoneNum(value.phone)) return false;
    }
    api.postFeedback(value).then(data => {
      wx.showModal({
        title: '提示',
        content: '提交成功！',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            app.backAndRefresh();
          }
        }
      })
    }).catch(error=>{
      if (error.status_code == 422) {
        Object.keys(error.errors).forEach(function (key,index) {
          if(index==0){
            app.toast(error.errors[key][0]);
          }
          console.log(index, key, error.errors[key][0]);
        });
      
      }
    });
  }
})