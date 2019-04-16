//index.js
//获取应用实例
const app = getApp()

const api = require("./api.js");

Page({
  data: {
    itemBody_1:true,
    itemBody_2: true,
    itemBody_3: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //初始化
  onLaunch: function () {

  },

  //切换item显示
  toggleItem:function(e){
    var id = e.target.dataset.id;

    var that = this;

    this.allItemClose();

    if(id == 1){
      if (that.data.itemBody_1 == true) {
        that.setData({ itemBody_1: false })
      } else {
        that.setData({ itemBody_1: true })
      }
    }else if(id == 2){
      if (that.data.itemBody_2 == true) {
        that.setData({ itemBody_2: false })
      } else {
        that.setData({ itemBody_2: true })
      }
    }else if (id == 3) {
      if (that.data.itemBody_3 == true) {
        that.setData({ itemBody_3: false })
      } else {
        that.setData({ itemBody_3: true })
      }
    }
  
  },
  //重置所有item
  allItemClose:function(){
    this.setData({
      itemBody_1: true,
      itemBody_2: true,
      itemBody_3: true,
    })
  },
  //跳转列表页
  goList:function(e){

    const id = e.target.dataset.id;

    const url = "/pages/list/list?id=" + id;//得到页面url 

    wx.navigateTo({

      url: url

    })

  }


})
