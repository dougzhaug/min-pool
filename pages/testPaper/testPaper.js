// pages/testPaper/testPaper.js

const app = getApp();

const api = require("./api.js");

const WxParse = require('../../plugins/wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    answersHidden: true,  //是否隐藏答案
    detail: null,   //题信息
    totalScore:0,   //题目满分
    score:0,        //选中的分数
    second:120,
    clock:'',
    timer:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var time = this.formatDuring(5214);
    this.countDown(); //开启计时器
    // this.setData({
    //   timer:timer,
    // })
    var that = this;
    var testCurrentId = wx.getStorageSync('test.currentId');
    //获取类目信息
    api.getTestQuestion({ current_id: testCurrentId}).then(data => {
      this.setData({
        detail: data.data[0],
        score: data.data[0].score,
        totalScore: data.data[0].full_marks,
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
    // wx.showModal({
    //   title: '警告',
    //   content: '您正在答题，确认要离开吗?',
    //   confirmText: '离开',
    //   cancelText: '留下',
    //   success(res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定')
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.showModal({
      title: '警告',
      content: '您正在答题，确认要离开吗?',
      confirmText: '留下',
      cancelText: '去意已决',
      success(res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/testPaper/testPaper',
          })
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
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
  // toggleRead: function () {
  //   var that = this
  //   var detail_status = 'detail.status';
  //   api.toggleStatus({ pool_id: this.data.detail.pool_id, status: this.data.detail.status }).then(data => {
  //     wx.showToast({
  //       title: that.data.detail.status == 1 ? '标记为未背' : '标记为已背',
  //       icon: 'success',
  //       duration: 3000
  //     });

  //     that.setData({
  //       [detail_status]: that.data.detail.status == 1 ? -1 : 1,
  //     })
  //   }).catch(error => {
  //     console.log(error);
  //   });
  // },

  //下一个上一个
  nextLastQuestion: function (e) {
    var that = this;
    api.getTestQuestion({
      type: e.currentTarget.dataset.type,
      id: this.data.detail.id,
      score: this.data.score
    }).then(data => {
      if (data.data.length == 0) {
        app.toast('已经到头了');
      } else {
        wx.setStorageSync('test.currentId', data.data[0].id);

        that.setData({
          detail: data.data[0],
          score: data.data[0].score,
          totalScore: data.data[0].full_marks,
        })

        //富文本框
        var answers = that.data.detail.answers;
        WxParse.wxParse('detail_answers', 'html', answers, that, 5);
      }
    })
  },

  //生成时间格式
  formatDuring:function(value){
    var theTime = parseInt(value);// 秒
    var middle = 0;// 分
    var hour = 0;// 小时

    if (theTime > 60) {
      middle = parseInt(theTime / 60);
      theTime = parseInt(theTime % 60);
      if (middle > 60) {
        hour = parseInt(middle / 60);
        middle = parseInt(middle % 60);
      }
    }
    var result = parseInt(theTime);
    if (middle > 0) {
      result = "" + parseInt(middle) + ":" + result;
    }
    if (hour > 0) {
      result = "" + parseInt(hour) + ":" + result;
    }
    return result;

  },

//计时器
  countDown: function () {
    let that = this;
    let second = that.data.second;//获取倒计时初始值
    //如果将定时器设置在外面，那么用户就看不到countDownNum的数值动态变化，所以要把定时器存进data里面
    that.setData({
      timer: setInterval(function () {//这里把setInterval赋值给变量名为timer的变量
        //每隔一秒countDownNum就减一，实现同步
        second--;
        //然后把countDownNum存进data，好让用户知道时间在倒计着
        var time = that.formatDuring(second);
        that.setData({
          second: second,
          clock: time,
        })
        //在倒计时还未到0时，这中间可以做其他的事情，按项目需求来
        if (second == 0) {
          //这里特别要注意，计时器是始终一直在走的，如果你的时间为0，那么就要关掉定时器！不然相当耗性能
          //因为timer是存在data里面的，所以在关掉时，也要在data里取出后再关闭
          clearInterval(that.data.timer);
          //关闭定时器之后，可作其他处理codes go here
        }
      }, 1000)
    })
  }
})