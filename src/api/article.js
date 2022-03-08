/**
 * 文章请求模块
 */
 import request from './request'

 /**
  * 获取文章列表
  */
 export const getArticles = params => {
   return request({
     method: 'GET',
     url: '/v1_0/articles',
     // params 选项用来配置 Query 参数
     params
   })
 }
 
 /**
  * 获取文章
  */
 export const getArticleById = articleId => {
   return request({
     method: 'GET',
     url: `/v1_0/articles/${articleId}`
   })
 }
 
 /**
  * 收藏文章
  */
 export const addCollect = target => {
   return request({
     method: 'POST',
     url: '/v1_0/article/collections',
     data: {
       target
     }
   })
 }
 
 /**
  * 取消收藏文章
  */
 export const deleteCollect = target => {
   return request({
     method: 'DELETE',
     url: `/v1_0/article/collections/${target}`
   })
 }
 
 /**
  * 点赞文章
  */
 export const addLike = target => {
   return request({
     method: 'POST',
     url: '/v1_0/article/likings',
     data: {
       target
     }
   })
 }
 
 /**
  * 取消点赞文章
  */
 export const deleteLike = target => {
   return request({
     method: 'DELETE',
     url: `/v1_0/article/likings/${target}`
   })
 }
 