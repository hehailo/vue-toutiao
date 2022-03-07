/**
 * 文章接口模块
 */
import request from "./request";

/**
 * 获取频道的文章列表
 */
export const getArticles = (params) => {
  return request({
    method: "GET",
    url: "/v1_0/articles",
    params,
  });
};

/**
 * 获取文章详情
 */

export const getArticleById = (articleId) => {
  return request({
    method: "GET",
    url: `/v1_0/articles/${articleId}`,
  });
};
