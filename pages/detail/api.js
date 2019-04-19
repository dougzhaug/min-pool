const app = getApp()

const api = {
  /**
   * 获取题目详细信息
   */
  getPoolDetail: function (data) {
    let url = '/pools/show/'+ data.pool_id;
    let header = {};

    return app.fetch(url, {}, 'GET', header);
  },
  toggleStatus: function (data) {
    let url = '/pools/status';
    let header = {};

    return app.fetch(url, data, 'PUT', header);
  },
  getNextOrLast: function (data) {
    let url = '/pools/get_next_or_last/'+data.type+'/'+data.sn+'/'+data.tabType;
    let header = {};

    return app.fetch(url, {}, 'GET', header);
  }
}

module.exports = api;