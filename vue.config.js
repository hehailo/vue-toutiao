// vue.config.js
module.exports = {
    // 关闭eslint提示语法
    lintOnSave: false,
    // 解决跨域问题
    devServer: {
    //   请求的路径中含有 /api就会到转发到配置的代理路径
      proxy: {
        "/api": {
          target: "http://toutiao-app.itheima.net",
        },
      },
    },
  };
  