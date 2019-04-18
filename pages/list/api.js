const app = getApp()

const api = {
  /**
   * 获取类目信息
   */
  getPools: function (data) {
    let url = '/pools/' + data.subject_id;
    let header = {};

    return app.fetch(url, data, 'GET', header);
  }
}

module.exports = api;