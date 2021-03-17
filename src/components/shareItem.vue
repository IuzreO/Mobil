<template>
  <div class="shareItem">
    <div class="title" @click="$router.push('/shareDetail/' + item.id)">
      {{ item.title }}
    </div>
    <!-- van-multi-ellipsis--l2   van内置class,最多显示2行 -->
    <div class="content van-multi-ellipsis--l2">
      {{ item.content }}
    </div>
    <div class="others">
      <div class="image">
        <img :src="baseUrl + item.author.avatar" alt="" />
        <span>{{ item.author.nickname }}</span>
      </div>
      <div class="time">
        <span>{{ item.created_at | dayJsTime }}</span>
      </div>
      <div class="read">
        <i class="iconfont iconicon_pinglunliang"></i
        ><span>{{ item.read }}</span>
      </div>
      <div class="star">
        <i class="iconfont iconbtn_dianzan_big_nor"></i>
        <span>{{ item.star }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'shareItem',
  props: ['item'],
  data () {
    return {
      baseUrl: process.env.VUE_APP_URL
    }
  }
}
</script>
<style lang="less" scoped>
.shareItem {
  padding: 15px 15px;
  background-color: #fff;
  border-bottom: 1px solid #f7f4f5;
  .title {
    font-size: 16px;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 500;
    text-align: left;
    color: #181a39;
  }
  .content {
    font-size: 13px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    color: #545671;
    text-align: left;
    margin: 15px 0;
  }
  .others {
    display: flex;
    align-items: center;
    .image {
      flex: 1;
      display: flex;
      align-items: center;
      img {
        width: 22px;
        height: 22px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
    span {
      font-size: 12px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      color: #545671;
    }
    .read {
      margin: 0 15px;
    }
    .iconfont {
      margin-right: 8px;
    }
  }
}
</style>
