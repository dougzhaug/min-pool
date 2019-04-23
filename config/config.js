
const config = {

  //测试模式
  debug: false,

  //开发环境
  dev: {
    host:'http://api.dev.loveliyuan.com',
  },

  //测试环境
  test: {
    host: 'http://api.pool.loveliyuan.com',
  },
  //生产环境
  production: {
    host: 'https://api.pool.loveliyuan.com',
  },

}

module.exports = config;