
const config = {

  //测试模式
  debug: false,

  //开发环境
  dev: {
    host:'http://api.pool.test',
  },

  //测试环境
  test: {
    api: {	//配置正式的api路径
      agency: "https://xxxxxxxxx.com.cn/xxxxx",
    }
  },
  //生产环境
  production: {
    api: {	//配置正式的api路径
      agency: "https://xxxxxxxxx.com.cn/xxxxx",
    }
  },

}

module.exports = config;