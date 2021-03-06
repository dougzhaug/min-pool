const app = getApp()

const api = {
  /**
   * 获取类目信息
   */
  getSubjects: function (data) {
    let url = '/subjects';
    let header = { "Accept": 'application/x.pool.v1+json'};

    return app.fetch(url, data, 'GET', header);
  }
}

module.exports = api;