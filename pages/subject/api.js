const app = getApp()

const api = {
  /**
   * 获取类目信息
   */
  getSubjects: function (data) {
    let url = '/subjects';
    let header = {};

    return app.fetch(url, data, 'GET', header);
  },
  toggleSubject: function (data) {
    let url = '/toggle_subjects';
    let header = {};

    return app.fetch(url, data, 'PUT', header);
  }
}

module.exports = api;