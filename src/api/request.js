/**
 * 封装 axios 请求模块
 */
import axios from "axios";
import store from "@/store";
import JSONBig from "json-bigint";

const request = axios.create({
  baseURL: "http://toutiao.itheima.net/",
  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [
    function (data) {
      // 对 data 进行任意转换处理
      try {
        return JSONBig.parse(data);
      } catch (error) {
        return data;
      }
    },
  ],
});

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    let { loginToken } = store.state.user;
    if (loginToken && loginToken.token) {
      config.headers.Authorization = `Bearer ${loginToken.token}`;
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response.data;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default request;
