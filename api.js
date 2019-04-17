const app = getApp()

const api = {
  /**
   * 登录
   */

  getUserInfo:function(data={}){
    url:'/get_user_info';

    app.fetch(url, data, 'GET', {}, (success, data) => {
      return data;
    })
  }
}

module.exports = api;