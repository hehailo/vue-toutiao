/**
 * 用户相关请求模块
 */
import request from "./request";

export const getSearchSuggestions = (q) => {
  return request({
    method: "GET",
    url: "/v1_0/suggestion",
    params: {
      q,
    },
  });
};

export const getSearchResult = (params) => {
  return request({
    method: "GET",
    url: "/v1_0/search",
    params,
  });
};
