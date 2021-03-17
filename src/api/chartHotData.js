// 导入封装好的axios
import _http from '@/utils/request'
// 封装获取热门职位薪资数据接口
export function getCharthotDataApi (params) {
  return _http({
    url: '/chart-data/hot',
    params
  })
}
// 封装获取城市数据接口
export function getCityDataApi () {
  return _http({
    url: '/chart-data/indexes'
  })
}
// 封装统计信息数据接口
export function getStatisticsApi (params) {
  return _http({
    url: '/chart-data/statistics',
    params
  })
}
