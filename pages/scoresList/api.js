const app = getApp()

const api = {
  /**
   * 获取测试成绩记录
   */
  getScoreList: function (data) {
    let url = '/tests/list'
    let header = {};

    return app.fetch(url, { "page": data.page, "per_page": 20 }, 'GET', header);
  }
}

module.exports = api;