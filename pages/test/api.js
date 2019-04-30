const app = getApp()

const api = {
  /**
   * 开始测试
   */
  startTest: function (data) {
    let url = '/tests/start';
    let header = {};

    return app.fetch(url, {}, 'POST', header);
  },

  /**
   * 提交测试
   */
  submitTest: function (data) {
    let url = '/tests/submit';
    let header = {};

    return app.fetch(url, {}, 'POST', header);
  },
  /**
   * 暂停测试
   */
  pauseTest: function (data) {
    let url = '/tests/pause';
    let header = {};

    return app.fetch(url, {}, 'POST', header);
  },
  /**
   * 重启测试
   */
  restartTest: function (data) {
    let url = '/tests/restart';
    let header = {};

    return app.fetch(url, {}, 'POST', header);
  },
  /**
   * 从头再来
   */
  startAllOver: function (){
    let url = '/tests/start_all_over';
    let header = {};

    return app.fetch(url, {}, 'POST', header);
  },
  /**
   * 获取当前的测试状态
   */
  getTestStatus:function(){
    let url = '/tests/get_status';
    let header = {};

    return app.fetch(url, {}, 'GET', header);
  }
}

module.exports = api;