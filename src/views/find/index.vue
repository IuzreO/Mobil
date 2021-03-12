<template>
  <div class="find">
    <hm-nav-bar title="发现" :fixed="true"></hm-nav-bar>
    <!-- 面试技巧模块组件 -->
    <div class="technicItem">
      <!-- 使用单元格组件 面试技巧 -->
      <findCell title="面试技巧"></findCell>
      <technicItem
        v-for="(item, index) in TechnicList"
        :key="index"
        :item="item"
      ></technicItem>
    </div>
    <div class="marketData">
      <findCell title="市场数据"></findCell>
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
              <div class="money">￥{{ item.salary }}</div>
            </div>
            <div class="markup" v-if="item.percent">
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
    <!-- 面经分享 -->
    <div class="fsharing">
      <findCell title="面经分享" class="share"></findCell>
      <shareItem
        v-for="(item, index) in shareList"
        :key="index"
        :item="item"
      ></shareItem>
    </div>
    <div class="bottom">
      到底了
    </div>
  </div>
</template>

<script>
import findCell from './findCell'
import technicItem from './technicItem'
// 导入封装好的数据接口
import { getTechnicApi, getShareApi } from '@/api/technic'
import { getCharthotDataApi } from '@/api/chartHotData'
export default {
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
      shareList: []
    }
  },
  created () {
    // 调用获取面试技巧数据的方法
    this.getTechnic()
    // 调用获取市场数据数据的方法
    this.getCharthotData()
    // 调用面经分享接口的方法
    this.getShare()
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
      // 将得到的面试技巧数据赋值
      this.city = res.data.data.city
      this.position = res.data.data.position
      // 翻转数组
      this.yearSalaryList = res.data.data.yearSalary.reverse()
      this.newyearSalaryList = this.yearSalaryList.slice(0, 4)
    },
    uploadList () {
      this.newyearSalaryList = this.yearSalaryList
      this.isOpen = true
    },
    packList () {
      this.newyearSalaryList = this.yearSalaryList.slice(0, 4)
      this.isOpen = false
    },
    // 调用面经分享接口
    async getShare () {
      const res = await getShareApi({
        start: 0,
        limit: 3
      })
      this.shareList = res.data.data.list
    }
  }
}
</script>

<style lang="less" scoped>
.find {
  padding-bottom: 560px;
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
  .technicItem {
    background-color: #fff;
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
            width: 66%;
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
}
</style>
