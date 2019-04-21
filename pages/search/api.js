const app = getApp()

const api = {
  /**
   * 获取类目信息
   */
  getPools: function (data) {
    var keyword = data.keyword == undefined ? '' : '/' + data.keyword
    let url = '/pools/list' + keyword;
    let header = {};


    return app.fetch(url, {}, 'GET', header);
  }
}

module.exports = api;