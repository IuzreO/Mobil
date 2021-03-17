<template>
  <div class="market">
    <hm-nav-bar title="市场数据" path="/find"></hm-nav-bar>
    <!-- 城市&岗位 -->
    <div class="cityAndjob">
      <!-- 下拉菜单 -->
      <van-dropdown-menu>
        <!-- 下拉菜单选项 -->
        <van-dropdown-item :title="city" ref="city">
          <van-search
            v-model="searchValue"
            placeholder="请输入搜索关键词"
            shape="round"
          />
          <!-- 索引栏 -->
          <van-index-bar>
            <template v-for="(value, key) in cityList">
              <!-- 标题 -->
              <van-index-anchor :index="key" :key="key" />
              <van-cell
                v-for="(item, index) in value"
                :key="index"
                :title="item[0]"
                @click="changeCity(item)"
              />
            </template>
          </van-index-bar>
        </van-dropdown-item>
        <van-dropdown-item :title="position" ref="position">
          <van-search
            v-model="searchValue"
            placeholder="请输入搜索关键词"
            shape="round"
          />
          <van-cell
            v-for="(item, index) in positionList"
            :key="index"
            :title="item"
            @click="changePosition(item)"
          />
        </van-dropdown-item>
      </van-dropdown-menu>
    </div>
    <!-- F2图表数据 -->
    <div class="Fchart">
      <!-- 工资收入 -->
      <div class="salary">
        <div class="title">
          工资收入
        </div>
        <canvas style="width: 345px; height: 240px;" id="salaryData"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { getCityDataApi, getStatisticsApi } from '@/api/chartHotData'
// 导入F2图表工具
import F2 from '@antv/f2'
export default {
  data () {
    return {
      city: '',
      position: '',
      // 搜索数据
      searchValue: '',
      // 存放城市数据列表
      cityList: {},
      // 岗位列表
      positionList: [],
      // 工资收入列表
      salaryList: [],
      // 工作经验
      workExpList: [],
      // 历年工资变化趋势
      yearSalaryList: [],
      // 就业形势
      employmentNum: []
    }
  },
  methods: {
    // 获取工资数据方法
    getSalaryData () {
      console.log(this.salaryList)
      // 遍历数据源生成 map
      const map = {}
      this.salaryList.forEach(item => {
        // 生成 map 对象
        map[item.assetType] = item.percent
        // 给每条数据添加一个占位
        item.a = '1'
      })
      const chart = new F2.Chart({
        id: 'salaryData',
        pixelRatio: window.devicePixelRatio
      })
      // 数据源
      chart.source(this.salaryList)
      chart.legend({
        position: 'right',
        itemFormatter: function itemFormatter (val) {
          return val + '  ' + map[val] + '%'
        }
      })
      chart.tooltip(false)
      chart.coord('polar', {
        transposed: true,
        // 圆心空白
        innerRadius: 0.4,
        radius: 0.85
      })
      // 可点击的文本
      chart.guide().html({
        position: ['50%', '50%'],
        html:
          '<div style="width: 100px;height: 20px;text-align: center;line-height: 20px; font-size: 12px" id="textContent">平均工资</div>'
      })
      chart.axis(false)
      chart
        .interval()
        .position('a*percent')
        .color('assetType', [
          '#1890FF',
          '#13C2C2',
          '#2FC25B',
          '#FACC14',
          '#F04864',
          '#8543E0'
        ])
        .adjust('stack')
        .style({
          lineWidth: 1,
          stroke: '#fff',
          lineJoin: 'round',
          lineCap: 'round'
        })
        .animate({
          appear: {
            duration: 1200,
            easing: 'bounceOut'
          }
        })
      chart.render()
    },
    // 获取城市数据方法
    async getCityData () {
      const res = await getCityDataApi({})
      this.cityList = res.data.data
      this.city = this.cityList['热门'][0][0]
      this.position = this.cityList['热门'][0][1][0]
      this.positionList = this.cityList['热门'][0][1]
      // 因为是异步请求,所以要等获取到城市数据才能调用统计信息方法
      // 调用统计信息方法 获取数据
      this.getStatistics()
    },
    // 点击改变城市
    changeCity (item) {
      // 改变城市
      this.city = item[0]
      // 改变岗位列表
      this.positionList = item[1]
      // 默认选中第一个岗位
      this.position = this.positionList[0]
      // 关闭下拉选项
      this.$refs.city.toggle()
    },
    // 点击改变岗位
    changePosition (item) {
      // 改变岗位
      this.position = item
      // 关闭下拉选项
      this.$refs.position.toggle()
    },
    // 获取统计信息方法
    async getStatistics () {
      const res = await getStatisticsApi({
        city: this.city,
        position: this.position
      })
      // 给列表赋值
      this.salaryList = res.data.data.percentSalary
      this.workExpList = res.data.data.experienceSalary
      this.yearSalaryList = res.data.data.yearSalary
      this.employmentNum = res.data.data.employmentNum
      // 获取工资收入数据
      this.getSalaryData()
    }
  },
  created () {
    // 调用城市数据方法
    this.getCityData()
  },
  mounted () {}
}
</script>

<style lang="less" scope>
.market {
  .Fchart {
    padding: 0 15px;
    .salary {
      .title {
        font-size: 18px;
        margin: 15px 0;
      }
    }
  }
}
</style>
