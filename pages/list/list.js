const api = require("./api.js");

const app = getApp();

Page({
  data:{
    subjectId:0,  //题库类目id
    tab: app.globalData.listTab.tab,    //顶部tab
    list:[],
    meta:[],
    end:false,    //页面数据是否到底
  },
  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    if (wx.getStorageSync('token')){
      api.getPools({}).then(data => {
        this.setData({ list: data.data, meta: data.meta })
      });
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({ end: false })

    if (app.globalData.listTab.refresh) { //跳转来的，需要刷新数据
    
      app.globalData.listTab.refresh = false;   //外部跳转进来后关闭显示刷新

      var tab = app.globalData.listTab.tab;  //外部跳转携带的参数
      console.log(tab);
      this.setData({
        tab: tab
      });

      this.setData({ list: [] })
      api.getPools({ keyword: tab }).then(data => {
        this.setData({ list: data.data, meta: data.meta })
      });
    }
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
  onReachBottom: function (options) {

    if(!this.data.end){
      api.getPools({
        subject_id: options.id,
        keyword: this.tab,
        page: this.data.meta.pagination.current_page + 1
      }).then(data => {
        if (data.data.length !== 0){
          this.setData({ list: this.data.list.concat(data.data), meta: data.meta })
        }else{
          app.toast('到底了');
          this.setData({ end: true })
        }
        
      });
    }else{
      app.toast('到底了');
    }

  },

  // 切换tab
  toggleTabs:function(e){

    this.setData({ end: false })

    const tab = e.currentTarget.dataset.tab;

    this.setData({
      tab:tab
    });
    
    api.getPools({keyword:tab}).then(data => {
      this.setData({ list: data.data, meta: data.meta})
    });
  }
})