// 导入封装好的request.js文件
// 引入local.js文件
import _http from '@/utils/request'
// 封装获取用户信息的api
export function getUserInfoApi () {
  return _http({
    url: '/au/info',
    // 添加一个标识
    needToken: true
  })
}
