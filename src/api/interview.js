// 导入封装好的request.js文件
import _http from '@/utils/request'
// 封装模拟面试筛选条件数据接口
export function interviewFiltersApi () {
  // 将方法中的内容返回出去
  return _http({
    url: '/interview/filters'
  })
}
// 封装面试题数据接口
export function interviewQuestionsApi (params) {
  // 将方法中的内容返回出去
  return _http({
    url: '/interview/questions',
    needToken: true,
    params
  })
}
// 封装提交答案的接口
export function submitAnswerApi (data) {
  // 将方法中的内容返回出去
  return _http({
    url: '/questions/submit',
    method: 'post',
    needToken: true,
    data
  })
}
// 封装好获取下一题数据接口
export function getNextOneApi (id) {
  // 将方法中的内容返回出去
  return _http({
    url: `/questions/${id}`,
    method: 'GET',
    needToken: true
  })
}
