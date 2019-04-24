//subject.js
//获取应用实例
const app = getApp()

const api = require("./api.js");

Page({
  data: {
    subjects: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '技术科目'
    })
    //获取类目信息
    api.getSubjects({}).then(data => {
      this.setData({ subjects: data.subjects })
    }).catch(error => {
      console.log(error);
    });
  },

  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {

  },
  /**
   * 切换科目
   */
  toggleSubject:function(e){
    const id = e.currentTarget.dataset.id;
    var that = this;

    wx.showModal({
      title: '提示',
      content: '确定要切换科目吗？',
      success(res) {
        if (res.confirm) {
          api.toggleSubject({ subject_id: id }).then(data => {
            wx.showModal({
              title: '提示',
              content: '切换科目成功！',
              showCancel: false,
              success(res) {
                if (res.confirm) {
                  app.backAndRefresh();
                }
              }
            })
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

    
  }

})
