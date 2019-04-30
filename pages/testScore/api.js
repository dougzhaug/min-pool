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

}

module.exports = api;