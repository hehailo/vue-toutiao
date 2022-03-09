module.exports = {
  // 配置需要使用的PostCss插件
  plugins: {
    //     autoprefixer: {
    //         //配置使用autoprefixer 插件
    // //作用:生成浏览器CSS样式规则前缀
    //       browsers: ['Android >= 4.0', 'iOS >= 8']
    //     },
    // 作用:把px转为rem
    'postcss-pxtorem': {
      // lib-
      rootValue ({ file }) {
        console.log('处理的css文件:', file)
        // 查询有没有vant的css样式按照37.5 自己的按照75来处理（indexOf查询到了返回下标，否则-1）
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      // rootValue: 37.5,
      //* 表示所有
      propList: ['*'],
      exclude:'github-markdown'
    }
  }
}