const app = getApp()

const api = {
  /**
   * 获取用户信息
   */
  getUserInfo: function (data) {
    let url = '/get_user_info';
    let header = { "Accept": 'application/x.pool.v1+json'};

    return app.fetch(url, data, 'GET', header);
  }
}

module.exports = api;