const app = getApp()

const api = {
  /**
   * 获取题目详细信息
   */
  getPoolDetail: function (data) {
    let url = '/pools/show/' + data.pool_id;
    let header = {};

    return app.fetch(url, {}, 'GET', header);
  },
  toggleStatus: function (data) {
    let url = '/pools/status';
    let header = {};

    return app.fetch(url, data, 'PUT', header);
  },
  /**
   * 获取试卷
   * 
   * id 当前题目id用于更新分数
   * score 用户选中的分数
   * type (next/last) 下一题/上一题
   * current_id 缓存中的保持的用户最后一次答题的id，用于下次进来直接跳到当前题目
   */
  getTestQuestion: function (data) {
    let url = '/tests/get_test_question';
    let header = {};

    return app.fetch(url, data, 'POST', header);
  }
}

module.exports = api;