<template>
  <div class="technicItem">
    <div class="left">
      <div class="top">
        {{ item.title }}
      </div>
      <div class="buttom">
        <span class="time">{{ item.created_at | dayJsTime }}</span>
        <span style="margin-right:15px"
          ><i class="iconfont iconicon_liulanliang"></i>{{ item.read }}</span
        >
        <span
          ><i class="iconfont iconbtn_dianzan_big_nor"></i>{{ item.star }}</span
        >
      </div>
    </div>
    <div class="right">
      <img :src="baseUrl + item.cover" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],
  data () {
    return {
      baseUrl: process.env.VUE_APP_URL
    }
  }
}
</script>

<style lang="less" scoped>
.technicItem {
  display: flex;
  // align-items默认值stretch是高度适应(高度会拉伸以适合高度)
  padding: 0 15px;
  margin-top: 20px;
  justify-content: space-between;
  vertical-align: middle;
  .left {
    display: flex;
    margin-right: 15px;
    //更换主次轴方向
    flex-direction: column;
    //两端对齐
    justify-content: space-between;
    .top {
      font-size: 16px;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      color: #181a39;
    }
    .buttom {
      display: flex;
      align-items: center;
      .time {
        flex: 1;
      }
      span {
        font-size: 12px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        color: #b4b4bd;
      }
    }
  }
  .right {
    img {
      width: 113px;
      height: 75px;
    }
  }
}
</style>
