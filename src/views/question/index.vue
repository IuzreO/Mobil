<template>
  <div class="questions">
    <div class="head">
      <span class="title">面试宝典</span>
      <!-- 下拉菜单 -->
      <van-dropdown-menu>
        <!-- 下拉选项 -->
        <van-dropdown-item :title="city" ref="city">
          <!-- 索引栏 -->
          <van-index-bar :index-list="indexList">
            <template v-for="(value, key) in cityArr">
              <!-- 标题 -->
              <van-index-anchor :index="key" :key="key" />
              <van-cell
                v-for="(item, index) in value"
                :key="index"
                :title="item"
                @click="changeCity(item)"
              />
            </template>
          </van-index-bar>
        </van-dropdown-item>
      </van-dropdown-menu>
    </div>
    <div class="position">
      <div class="tags">
        <!-- 职业标签 -->
        <van-tag
          size="large"
          round
          type="primary"
          :class="{ active: currentIndex === index }"
          v-for="(item, index) in jobArr"
          :key="index"
          @click="changePosition(index)"
          >{{ item.name }}</van-tag
        >
      </div>
    </div>
    <!-- 刷题区域 -->
    <div class="questionbox">
      <div class="item err">
        <i class="iconfont iconicon_mine_cuoti"></i>
        <span>常错题库</span>
      </div>
      <div class="item collect">
        <i class="iconfont iconicon_mine_tikushoucang"></i>
        <span>收藏题库</span>
      </div>
      <div class="item company">
        <i class="iconfont iconicon_mine_qiyeshoucang"></i>
        <span>企业题库</span>
      </div>
      <div class="item answer">
        <i class="iconfont iconicon_mine_mianjing"></i>
        <span>已答题库</span>
      </div>
      <!-- 中间区域 -->
      <div class="center">
        <van-circle
          class="mycircle"
          v-model="currentRate"
          :rate="rate"
          layer-color="none"
          speed="5"
          :color="gradientColor"
        >
          <div class="q-content">
            <div class="q-title">
              顺序刷题
            </div>
            <div class="num">{{ correctNum }}/{{ totalNum }}</div>
          </div>
        </van-circle>
      </div>
    </div>
    <!-- 累计收录 -->
    <div class="totalQuestion">
      <div class="total">累计收录</div>
      <div class="totalNum">{{ totalNum }}</div>
    </div>
    <div class="btn">
      <van-button color="#00b8d4" size="large" @click="enter"
        >模拟面试</van-button
      >
    </div>
  </div>
</template>

<script>
// 导入封装好的数据接口
import { interviewFiltersApi } from '@/api/interview'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      // 环形进度条的实时数据
      currentRate: 0,
      // 环形进度条的目标数据
      rate: 25,
      // 颜色
      gradientColor: {
        '0%': 'rgba(228,1,55,0.80)',
        '100%': 'rgba(228,1,55,0.20)'
      },
      // 默认城市
      city: '',
      // 城市列表
      cityArr: [],
      // 城市对应的职位
      cityPositions: [],
      // 岗位数据
      jobArr: [],
      // 总题数
      totalCount: '',
      // 答对题目
      correctQuestions: '',
      // 默认岗位下标
      currentIndex: 0,
      // 总题数过渡值
      totalNum: 0,
      // 正确题目过渡值
      correctNum: 0,
      indexList: [
        '#',
        '热',
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z'
      ]
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    // 进入模拟面试
    enter () {
      // 得到岗位ID
      const positionId = this.jobArr[this.currentIndex].id
      this.$router.push(`/interview/${positionId}/${this.city}`)
    },
    // 创建一个获取模拟面试筛选条件数据的方法
    async getinterviewFilters () {
      const res = await interviewFiltersApi()
      // 将获取的数据赋值
      this.cityArr = res.data.data.citys
      this.city = res.data.data.citys['热门'][0]
      this.cityPositions = res.data.data.cityPositions
      this.jobArr = this.cityPositions[this.city]
      this.totalCount = res.data.data.totalCount
      // 设置定时器 实现动画效果
      const timerOne = setInterval(() => {
        this.totalNum++
        if (this.totalNum >= this.totalCount) {
          clearInterval(timerOne)
        }
      }, 2000 / this.totalCount)
      // 设置定时器 实现动画效果
      const timerTwo = setInterval(() => {
        this.correctNum++
        if (this.correctNum >= this.correctQuestions) {
          clearInterval(timerTwo)
        }
      }, 2000 / this.correctQuestions)
    },
    // 点击切换城市
    changeCity (item) {
      // 切换城市
      this.city = item
      // 关闭下拉选项
      this.$refs.city.toggle()
      // 重置岗位下标
      this.currentIndex = 0
    },
    // 切换岗位
    changePosition (index) {
      this.currentIndex = index
    }
  },
  created () {
    // 调用模拟面试筛选条件数据的方法
    this.$toast.loading('正在加载数据')
    this.getinterviewFilters()
    // 给答对的题目赋值
    this.correctQuestions = this.userInfo.correctQuestions.length
  },
  watch: {
    // 监听事件 当城市发生改变时 对应的职位也要发送改变
    city () {
      this.jobArr = this.cityPositions[this.city]
    }
  }
}
</script>

<style lang="less" scoped>
.questions {
  height: 100vh;
  background: #f7f4f5;
  .head {
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 40px;
    background-color: #fff;

    .title {
      font-size: 18px;
      font-family: PingFangSC, PingFangSC-Semibold;
      font-weight: 600;
      color: #222222;
    }
    /deep/.van-dropdown-menu__bar {
      box-shadow: none;
    }
    /deep/.van-index-anchor {
      background-color: #eee;
      font-size: 12px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      color: #939393;
    }
    /deep/.van-cell__title {
      font-size: 16px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      color: #181a39;
    }
  }
  .position {
    margin-top: 10px;
    background-color: #fff;
    width: 100%;
    // 超过一行显示滚动条
    overflow-x: auto;
    // 清除滚动条
    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
    .tags {
      display: flex;
      padding: 15px 0;

      &::after {
        content: '';
        display: block;
        padding-right: 20px;
      }
      /deep/.van-tag {
        background: #f7f4f5;
        color: #545671;
        margin-left: 20px;
        //flex-shrink 属性指定了 flex 元素的收缩规则。flex 元素仅在默认宽度之和大于容器的时候才会发生收缩，其收缩的大小是依据 flex-shrink 的值。
        // 注意：如果元素不是弹性盒对象的元素，则 flex-shrink 属性不起作用。
        flex-shrink: 0;
      }
      .active {
        background-color: #00b8d4;
        color: #fff;
      }
    }
  }

  .questionbox {
    margin-top: 15px;
    height: 200px;
    background-color: #fff;
    position: relative;
    .item {
      position: absolute;
      .iconfont {
        width: 44px;
        height: 44px;
        color: #fff;
        font-size: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        margin-bottom: 5px;
      }
      span {
        font-size: 12px;
        color: #999;
        display: block;
      }
    }
    .err {
      top: 20px;
      left: 40px;
      .iconfont {
        background-color: #ff5d5d;
      }
    }
    .collect {
      top: 20px;
      right: 40px;
      .iconfont {
        background-color: #ffba02;
      }
    }
    .company {
      bottom: 20px;
      left: 40px;
      .iconfont {
        background-color: #00cee2;
      }
    }
    .answer {
      bottom: 20px;
      right: 40px;
      .iconfont {
        background-color: #2cd593;
      }
    }
    .center {
      width: 120px;
      height: 120px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-image: url('../../assets/编组@2x.png');
      background-size: 100%;
      .mycircle {
        width: 100%;
        height: 100%;
        padding: 10px;
        box-sizing: border-box;
        .q-content {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          color: #fff;
          background: linear-gradient(180deg, #ff6f92, #e40137);
          padding-top: 30px;
          box-sizing: border-box;
          .q-title {
            font-size: 14px;
            margin-bottom: 5px;
          }
          .num {
            font-size: 16px;
          }
        }
      }
    }
  }
  .totalQuestion {
    background-color: #fff;
    margin-top: 15px;
    height: 130px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  .btn {
    margin-top: 15px;
    text-align: center;
    padding: 0 15px;
    /deep/ .van-button__text {
      border-radius: 20px;
    }
  }
}
</style>
