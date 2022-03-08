# vue-toutiao

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

<!--  -->

## 按需引入 vant

https://vant-contrib.gitee.io/vant/v2/#/zh-CN/quickstart

## amfe-flexible

npm install amfe-flexible
// 移动端适配
import 'amfe-flexible'

## token 的处理

vuex+localStorage

- 登录成功，将 Token 存储到 Vuex 容器中
  - 获取方便
  - 响应式
- 为了持久化，还需要把 Token 放到本地存储
  - 持久化


## token 过期
登录成功之后后端会返回两个 Token：

- `token`：访问令牌，有效期2小时
- `refresh_token`：刷新令牌，有效期14天，用于访问令牌过期之后重新获取新的访问令牌

我们的项目接口中设定的 `Token` 有效期是 `2 小时`，超过有效期服务端会返回 `401` 表示 Token 无效或过期了。


## 测试号码
  17090086870


## 处理请求第三方网站图片 
  有些网站会防盗链 读取请求的refer请求头来做限制
  解决办法：
   <meta name="referrer" content="no-referrer" />


## 处理相对时间
  Day.js Moment.js
  https://dayjs.gitee.io/docs/zh-CN/plugin/relative-time

  npm安装
    npm install dayjs --save

  项目使用
    var dayjs = require('dayjs')
    //import dayjs from 'dayjs' // ES 2015
    dayjs().format()
  
  模板过滤器
  过滤器就相当于一个全局可用的方法
  
## 频道数据持久化
  未登录
    数据存储在客户端
  登录后
    数据读取服务器

##  优化防抖
  https://www.lodashjs.com/docs/lodash.chunk

    该函数会从上一次被调用后，延迟 wait 毫秒后调用 func 方法

    防抖：
      在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时
      个人理解 函数防抖就是法师发技能的时候要读条，技能读条没完再按技能就会重新读条。
    函数节流(throttle)
      规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。
      个人理解 函数节流就是fps游戏的射速，就算一直按着鼠标射击，也只会在规定射速内射出子弹。
   
   
  debounce
      search搜索联想，用户在不断输入值时，用防抖来节约请求资源。
      window触发resize的时候，不断的调整浏览器窗口大小会不断的触发这个事件，用防抖来让其只触发一次

  throttle
      鼠标不断点击触发，mousedown(单位时间内只触发一次)
      监听滚动事件，比如是否滑到底部自动加载更多，用throttle来判断

      作者：薄荷前端
      链接：https://juejin.cn/post/6844903669389885453

## 搜索关键字高亮
  用v-html展示

  方法1 replace + 正则//gi
    g是全局
    i是忽略大小写

    highlight (text) {
      const highlightStr = `<span class="active">${this.searchText}</span>`

      // 正则表达式 // 中间的内容都会当作匹配字符来使用，而不是数据变量
      // 如果需要根据数据变量动态的创建正则表达式，则手动 new RegExp
      // RegExp 正则表达式构造函数
      //    参数1：匹配模式字符串，它会根据这个字符串创建正则对象
      //    参数2：匹配模式，要写到字符串中
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, highlightStr)
    }

  方法2 split + join