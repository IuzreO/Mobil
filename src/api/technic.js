// 导入封装好的axios
import _http from '@/utils/request'
// 封装获取面试技巧列表的接口
export function getTechnicApi (params) {
  return _http({
    url: '/articles/technic',
    params
  })
}
// 调用面经分享列表接口
export function getShareApi (params) {
  return _http({
    url: '/articles/share',
    params
  })
}
// 封装接口：得到面经热搜
export function getShareTopApi () {
  return _http({
    url: '/articles/shareTopSearch'
  })
}
// 封装面经详情数据接口
export function getarticleDataApi (id) {
  return _http({
    url: '/articles/share/' + id
  })
}
// 封装面经评论数据接口
export function getCommentApi ({ id, start, limit }) {
  return _http({
    url: '/articles/comments/' + id,
    params: {
      start,
      limit
    }
  })
}
// 封装发送评论接口
export function sendCommentApi (data) {
  return _http({
    url: '/articles/comments',
    method: 'post',
    needToken: true,
    data
  })
}
// 封装收藏面经接口
export function collectArticlesApi (id) {
  return _http({
    url: '/articles/collect',
    method: 'post',
    needToken: true,
    data: {
      id
    }
  })
}
// 封装点赞面经接口
export function starArticlesApi (article) {
  return _http({
    url: '/articles/star',
    method: 'post',
    needToken: true,
    data: {
      article
    }
  })
}
// 封装评论点赞接口
export function starCommentsApi (id) {
  return _http({
    url: '/article-comments/star',
    method: 'post',
    needToken: true,
    data: {
      id
    }
  })
}
