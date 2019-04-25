const app = getApp()

const api = {
  /**
   * 开始测试
   */
  startTest: function (data) {
    let url = '/test/start';
    let header = {};

    return app.fetch(url, {}, 'POST', header);
  },

  /**
   * 提交测试
   */
  submitTest: function (data) {
    let url = '/test/submit';
    let header = {};

    return app.fetch(url, {}, 'POST', header);
  },
  /**
   * 暂停测试
   */
  pauseTest: function (data) {
    let url = '/test/pause';
    let header = {};

    return app.fetch(url, {}, 'POST', header);
  },
  /**
   * 重启测试
   */
  restartTest: function (data) {
    let url = '/test/restart';
    let header = {};

    return app.fetch(url, {}, 'POST', header);
  },
  /**
   * 从头再来
   */
  startAllOver: function (){
    let url = '/test/start_all_over';
    let header = {};

    return app.fetch(url, {}, 'POST', header);
  }
}

module.exports = api;