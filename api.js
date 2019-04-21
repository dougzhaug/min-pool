// const app = getApp();

const api = {
  /**
   * 获取个人中心信息
   */
  getMy: function (data) {
    let url = '/my';
    let header = {};
    return this.fetch(url, {}, 'GET', header);
  }
}

module.exports = api;