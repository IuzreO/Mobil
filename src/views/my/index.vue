<template>
  <div class="myInfo">
    <!-- 头部区域 -->
    <div class="header">
      <div class="info">
        <div class="left">
          <div class="name">{{ userInfo.nickname }}</div>
          <div class="remark">{{ userInfo.intro }}</div>
        </div>
        <div class="right">
          <img :src="baseURL + userInfo.avatar" alt="" @click="toInfo" />
        </div>
      </div>
      <div class="items">
        <div class="item">
          <div class="num">{{ userInfo.submitNum }}</div>
          <div class="word">累计答题</div>
        </div>
        <div class="item">
          <div class="num">{{ userInfo.collectQuestions.length }}</div>
          <div class="word">收藏题目</div>
        </div>
        <div class="item">
          <div class="num">{{ userInfo.errorQuestions.length }}</div>
          <div class="word">我的错题</div>
        </div>
        <div class="item">
          <div class="num">
            <span>
              {{
                Math.round(
                  ((userInfo.submitNum - userInfo.errorNum) /
                    userInfo.submitNum) *
                    100
                )
              }}</span
            ><span class="percentage">%</span>
          </div>
          <div class="word">正确率</div>
        </div>
      </div>
    </div>
    <!-- 内容区域 -->
    <div class="content">
      <!-- 工作岗位 -->
      <div class="job">
        <van-cell
          title="我的岗位"
          is-link
          :value="userInfo.position"
          class="jobCell"
          @click="$router.push('/editInfo?property=position')"
        >
          <template #icon>
            <span
              class="iconfont iconicon_mine_gangwei"
              style="margin-right:10px"
            ></span>
          </template>
        </van-cell>
      </div>
      <!-- 面经数据 -->
      <div class="feData">
        <div class="title">面经数据</div>
        <div class="items">
          <div class="item">
            <div class="data">
              昨日阅读<span>+{{ userInfo.shareData.read.yesterday }}</span>
            </div>
            <div class="num">{{ userInfo.shareData.read.total }}</div>
            <div class="word">阅读总数</div>
          </div>
          <div class="items">
            <div class="item">
              <div class="data">
                昨日获赞<span>+{{ userInfo.shareData.star.yesterday }}</span>
              </div>
              <div class="num">{{ userInfo.shareData.star.total }}</div>
              <div class="word">获赞总数</div>
            </div>
          </div>
          <div class="items">
            <div class="item">
              <div class="data">
                昨日新增<span>+{{ userInfo.shareData.comment.yesterday }}</span>
              </div>
              <div class="num">{{ userInfo.shareData.comment.total }}</div>
              <div class="word">评论总数</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 其他数据 -->
      <div class="otherData">
        <van-cell-group>
          <van-cell title="我的面经分享" value="99+" is-link></van-cell>
          <van-cell title="我的消息" value="99+" is-link></van-cell>
          <van-cell title="收藏的题库" value="99+" is-link></van-cell>
          <van-cell title="收藏的企业" value="99+" is-link></van-cell>
          <van-cell title="我的错题" value="99+" is-link></van-cell>
          <van-cell title="收藏的面试经验" value="99+" is-link></van-cell>
        </van-cell-group>
      </div>
    </div>
  </div>
</template>

<script>
// 导入mapState
import { mapState } from 'vuex'
export default {
  data () {
    return {
      baseURL: process.env.VUE_APP_URL
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    toInfo () {
      this.$router.push('/info')
    }
  },
  created () {
    console.log(this.userInfo)
  }
}
</script>

<style lang="less" scoped>
.myInfo {
  height: 100%;
  background-color: #f7f4f5;

  .header {
    height: 215px;
    background: linear-gradient(45deg, #ce0031, #b8002c);
    color: #ffffff;
    .info {
      display: flex;
      justify-content: space-between;
      padding: 30px 15px;
      .left {
        .name {
          font-family: PingFangSC, PingFangSC-Semibold;
          font-weight: 600;
          font-size: 21px;
        }
        .remark {
          font-size: 12px;
          margin-top: 10px;
          opacity: 0.7;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
        }
      }
      .right {
        img {
          height: 50px;
          width: 50px;
          border-radius: 50%;
        }
      }
    }
    .items {
      display: flex;
      .item {
        flex: 1;
        text-align: center;
        .num {
          font-family: PingFangSC, PingFangSC-Semibold;
          font-weight: 600;
          font-size: 21px;
          .percentage {
            font-size: 4px;
          }
        }
        .word {
          font-size: 12px;
          margin-top: 10px;
          opacity: 0.7;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
        }
      }
    }
  }
  .content {
    padding: 0 15px;
    padding-bottom: 66px;
    border-top: 1px solid transparent;
    .job {
      position: relative;
      .jobCell {
        position: absolute;
        top: -30px;
        border-radius: 6px;
      }
    }
    .feData {
      background-color: #fff;
      margin-top: 25px;
      .title {
        font-size: 14px;
        font-family: PingFangSC, PingFangSC-Semibold;
        font-weight: 600;
        color: #181a39;
        padding: 15px 20px;
      }
      .items {
        display: flex;
        justify-content: space-around;
        margin-bottom: 10px;

        .item {
          text-align: center;
          .data {
            font-size: 12px;
            span {
              color: #87ddea;
            }
          }
          .num {
            font-size: 20px;
            padding: 10px 0;
          }
          .word {
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
