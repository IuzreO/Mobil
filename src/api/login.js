// 导入封装好的request.js文件
import _http from '@/utils/request'
// 封装接受验证码接口
export function getCodeApi (data) {
  // 将方法中的内容返回出去
  return _http({
    url: '/au/code',
    method: 'post',
    data
  })
}
// 封装用户登录接口
export function submitApi (data) {
  return _http({
    url: '/au/login',
    method: 'post',
    data
  })
}
