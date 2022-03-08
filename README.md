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





