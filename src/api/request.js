/**
 * 封装 axios 请求模块
 */
import axios from "axios";

const request = axios.create({
  baseURL: "http://toutiao.itheima.net/",
});



// http://totiao.itheima.net/api.html

//  请求拦截器

//  相应拦截器

export default request;
