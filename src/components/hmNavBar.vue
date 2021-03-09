<template>
  <div class="hmNavBar">
    <van-nav-bar @click-left="$router.push(path)"
      >/
      <template #left>
        <van-icon name="down" />
      </template>
      <template>
        {{ title }}
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: 'hmNavBar',
  props: {
    // nav标题
    title: String,
    // path要跳转的路由
    path: String
  },
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.hmNavBar {
  .van-nav-bar {
    .van-icon-down {
      font-size: 20px;
      color: #181a39;
      transform: rotate(90deg);
    }
  }
}
</style>
