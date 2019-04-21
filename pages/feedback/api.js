const app = getApp()

const api = {
  /**
   * 提交反馈信息
   */
  postFeedback: function (data) {
    let url = '/feedback';
    let header = {};

    return app.fetch(url, data, 'POST', header);
  }
}

module.exports = api;