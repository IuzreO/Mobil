// 导入封装好的axios
import _http from '@/utils/request'
// 封装获取面试技巧列表的接口
export function getTechnicApi (params) {
  return _http({
    url: '/articles/technic',
    params
  })
}
// 调用面经分享接口
export function getShareApi (params) {
  return _http({
    url: '/articles/share',
    params
  })
}
