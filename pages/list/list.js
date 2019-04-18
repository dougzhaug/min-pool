const api = require("./api.js");

Page({
  data:{
    subjectId:0,
    tab:'all',
    list:[],
  },
  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    this.setData({
      subjectId: options.id ? options.id : this.subjectId,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //获取类目信息
    api.getPools({ subject_id: this.subjectId}).then(data => {
      this.setData({ list: data.data })
    });
  },

  // 切换tab
  toggleTabs:function(e){
    const type = e.currentTarget.dataset.type;
    console.log(type);
    this.setData({
      tab:type
    });
  }
})