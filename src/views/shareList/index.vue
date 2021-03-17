<template>
  <div class="shareList">
    <hm-nav-bar title="我分享的经验" class="title" path="/find"></hm-nav-bar>
    <div class="search">
      <!-- 搜索框 -->
      <van-search
        v-model="searchValue"
        placeholder="请输入搜索关键词"
        shape="round"
        @click="$router.push('/skillSearch')"
      />
    </div>
    <!-- 上拉刷新 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <!-- 分享列表 -->
      <div class="shareItem">
        <share-item
          v-for="(item, index) in shareList"
          :key="index"
          :item="item"
        ></share-item>
      </div>
    </van-list>
  </div>
</template>

<script>
// 导入封装好的数据接口
import { getShareApi } from '@/api/technic'

export default {
  data () {
    return {
      // 搜索内容
      searchValue: '',
      // 面经分享列表
      shareList: [],
      // 起始页
      start: -3,
      // 页容量
      limit: 3,
      // list加载状态
      loading: false,
      // 数据源是否加载完毕
      finished: false
    }
  },
  methods: {
    // 上拉刷新
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
  },
  created () {}
}
</script>

<style lang="less" scoped>
.shareList {
  /deep/.van-nav-bar__title {
    font-size: 18px;
    font-family: PingFangSC, PingFangSC-Semibold;
    font-weight: 600;
    text-align: left;
    color: #222222;
  }
  /deep/ .van-search {
    display: flex;
    justify-content: center;
  }
}
</style>
