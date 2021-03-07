<template>
  <div class="home">
    <!-- 路由出口 -->
    <router-view />
    <div class="nav">
      <van-tabbar route active-color="#e40137" inactive-color="#b4b4bd">
        <van-tabbar-item to=""
          >公司
          <template #icon>
            <span class="iconfont iconicon_footbar_gs_nor"></span>
          </template>
        </van-tabbar-item>
        <van-tabbar-item to=""
          >刷题
          <template #icon>
            <span class="iconfont iconicon_footbar_st_sel"></span>
          </template>
        </van-tabbar-item>
        <van-tabbar-item to="/find"
          >发现
          <template #icon>
            <span class="iconfont iconicon_footbar_fx_nor"></span> </template
        ></van-tabbar-item>
        <van-tabbar-item to="/my"
          >我的
          <template #icon>
            <span class="iconfont iconicon_footbar_wode_sel"></span> </template
        ></van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="less">
.home {
  .nav {
    .iconfont {
      font-size: 24px;
    }
  }
}
</style>
