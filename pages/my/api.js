const app = getApp()

const api = {
  /**
   * 获取个人中心信息
   */
  getMy: function (data,loading) {
    let url = '/my' ;
    let header = {};
    return app.fetch(url, {}, 'GET', header, loading);
  }
}

module.exports = api;