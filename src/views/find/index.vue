<template>
  <div class="find">
    <hm-nav-bar title="发现" :fixed="true"></hm-nav-bar>
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
      <!-- 面试技巧模块组件 -->
      <div class="technicItemBox">
        <!-- 使用单元格组件 面试技巧 -->
        <findCell title="面试技巧"></findCell>
        <technicItem
          v-for="(item, index) in TechnicList"
          :key="index"
          :item="item"
        ></technicItem>
      </div>
      <!-- 热门职位数据 -->
      <div class="marketData">
        <findCell title="市场数据" @goto="$router.push('/market')"></findCell>
        <div class="content">
          <div class="areaWork">
            <span>{{ city }}</span
            ><span>{{ position }}</span>
          </div>
          <div class="steps">
            <div
              class="step"
              v-for="(item, index) in newyearSalaryList"
              :key="index"
            >
              <div class="year">{{ item.year }}</div>
              <div class="moneyData">
                <div
                  class="money"
                  :style="{
                    width: Math.round((item.salary / topSalary) * 100) + '%'
                  }"
                >
                  ￥{{ item.salary }}
                </div>
              </div>
              <div class="markup">
                <div class="iconUpandDown" v-if="item.percent">
                  <i
                    class="iconfont iconicon_xiajiang"
                    style="color:green"
                    v-if="item.percent < 0"
                  ></i>
                  <i
                    class="iconfont iconicon_shangsheng"
                    style="color:red"
                    v-else
                  ></i>
                  <span>{{ item.percent }}％</span>
                </div>
              </div>
            </div>
            <div class="marketDataMore">
              <div class="upload" v-if="isOpen === false">
                <span @click="uploadList">展开更多</span
                ><i class="iconfont iconicon_zhankai"></i>
              </div>
              <div class="pack" v-else>
                <span @click="packList">收起列表</span>
                <van-icon name="arrow-up" size="16" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 上拉刷新 -->

      <!-- 面经分享 -->
      <div class="fsharing">
        <findCell
          title="面经分享"
          class="share"
          @goto="$router.push('/shareList')"
        >
        </findCell>
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <shareItem
            v-for="(item, index) in shareList"
            :key="index"
            :item="item"
          ></shareItem>
        </van-list>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import findCell from './findCell'
import technicItem from './technicItem'
// 导入封装好的数据接口
import { getTechnicApi, getShareApi } from '@/api/technic'
import { getCharthotDataApi } from '@/api/chartHotData'
export default {
  name: 'find',
  components: {
    // 注册组件
    findCell,
    technicItem
  },
  data () {
    return {
      // 面试技巧列表
      TechnicList: [],
      // 城市
      city: '',
      // 职位
      position: '',
      // 历年薪资
      yearSalaryList: [],
      // 显示到页面的数据
      newyearSalaryList: [],
      // 判断展开或收起
      isOpen: false,
      // 面经分享列表
      shareList: [],
      // 是否处于加载状态，加载过程中不触发load事件
      isRefresh: false,
      // 起始页
      start: -3,
      // 页容量
      limit: 3,
      // list加载状态
      loading: false,
      // 数据源是否加载完毕
      finished: false,
      // 最高薪资
      topSalary: 0
    }
  },
  created () {
    // 调用获取面试技巧数据的方法
    this.getTechnic()
    // 调用获取市场数据数据的方法
    this.getCharthotData()
    // // 调用面经分享接口的方法
    // this.getShare()
  },
  methods: {
    // 调用获取面试技巧数据列表
    async getTechnic () {
      const res = await getTechnicApi({
        start: 0,
        limit: 3
      })
      // 将得到的面试技巧数据赋值给TechnicList
      this.TechnicList = res.data.data.list
    },
    // 调用获取热门数据接口
    async getCharthotData () {
      const res = await getCharthotDataApi({})
      // 将得到的热门数据赋值
      this.city = res.data.data.city
      this.position = res.data.data.position
      this.topSalary = res.data.data.topSalary
      // 翻转数组
      this.yearSalaryList = res.data.data.yearSalary.reverse()
      this.newyearSalaryList = this.yearSalaryList.slice(0, 4)
    },
    // 展开更多
    uploadList () {
      this.newyearSalaryList = this.yearSalaryList
      this.isOpen = true
    },
    // 收起列表
    packList () {
      this.newyearSalaryList = this.yearSalaryList.slice(0, 4)
      this.isOpen = false
    },
    // 调用面经分享接口
    // async getShare () {
    //   const res = await getShareApi({
    //     start: 0,
    //     limit: 3
    //   })
    //   this.shareList = res.data.data.list
    // },
    // 下拉刷新
    onRefresh () {
      // 刷新数据
      // 调用获取面试技巧数据的方法
      this.getTechnic()
      // 调用获取市场数据数据的方法
      this.getCharthotData()
      // 调用面经分享接口的方法
      this.getShare()
      setTimeout(() => {
        this.isRefresh = false
      }, 1000)
    },
    // 上拉刷新面经分享数据
    async onLoad () {
      this.start += this.limit
      const res = await getShareApi({
        start: this.start,
        limit: this.limit
      })
      this.shareList.push(...res.data.data.list)
      if (res.data.data.list.length === 0) {
        this.finished = true
      }
      // 将加载状态设置为false
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.find {
  padding-bottom: 500px;
  height: 100%;
  background-color: #f7f4f5;
  /deep/.van-nav-bar__title {
    font-size: 18px;
    font-family: PingFangSC, PingFangSC-Semibold;
    font-weight: 600;
  }
  /deep/ .van-nav-bar .van-icon-down {
    display: none;
  }
  .technicItemBox {
    background-color: #fff;
    /deep/.van-cell--center {
      padding: 55px 15px 0 15px;
    }
  }
  .marketData {
    margin-top: 10px;
    .content {
      background-color: #fff;
      padding: 0 15px;
      .areaWork {
        span {
          font-size: 14px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: center;
          color: #545671;
          margin-right: 15px;
          padding: 5px;
          background-color: #eceaea;
        }
      }
      .steps {
        .step {
          display: flex;
          font-size: 12px;
          margin: 20px 0;
        }
        .year {
          width: 80px;
        }
        .moneyData {
          flex: 5;
          margin: 0 5px;
          background-color: #ebdfdf;
          border-radius: 5px;
          .money {
            background-color: #fe6d67;
            color: #fff;
            text-align: right;
            border-radius: 5px;
            padding-right: 5px;
          }
        }
        .markup {
          flex: 1;
          width: 40px;
        }
        .marketDataMore {
          font-size: 12px;
          text-align: center;
          padding-bottom: 20px;
          span {
            margin-right: 5px;
          }
          .iconicon_zhankai {
            font-size: 12px;
          }
          .pack {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }
  }
  .fsharing {
    margin-top: 10px;
  }
  .bottom {
    height: 66px;
    line-height: 66px;
    text-align: center;
    font-size: 14px;
    color: #b4b4bd;
  }
  /deep/ .van-list {
    padding-bottom: 50px;
  }
}
</style>
