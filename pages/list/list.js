const api = require("./api.js");

Page({
  data:{
    subjectId:0,  //题库类目id
    tab:'all',    //顶部tab
    list:[],
  },
  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {

    if (options.id !== undefined){
      this.setData({
        subjectId: options.id ? options.id : this.subjectId,
      })
    }

    api.getPools({ subject_id: options.id}).then(data => {
      this.setData({ list: data.data })
    });
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  // 切换tab
  toggleTabs:function(e){
    const type = e.currentTarget.dataset.type;

    this.setData({
      tab:type
    });
    
    api.getPools({ subject_id: this.data.subjectId ,keyword:type}).then(data => {
      this.setData({ list: data.data })
    });
  }
})