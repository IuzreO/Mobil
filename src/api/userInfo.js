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
// 封装修改用户信息api
export function editUserInfoApi (data) {
  return _http({
    url: '/au/edit',
    // 添加一个标识
    method: 'post',
    needToken: true,
    data
  })
}
// 封装修改用户图片api
export function editUserImgApi (files) {
  const fd = new FormData()
  fd.append('files', files)
  return _http({
    url: '/upload',
    // 添加一个标识
    method: 'post',
    needToken: true,
    data: fd
  })
}
