// 导入封装好的axios
import _http from '@/utils/request'
// 封装获取热门职位薪资数据接口
export function getCharthotDataApi (params) {
  return _http({
    url: '/chart-data/hot',
    params
  })
}
