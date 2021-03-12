<template>
  <div class="hmNavBar">
    <van-nav-bar
      @click-left="$router.push(path)"
      @click-right="save"
      :fixed="fixed"
    >
      <template #left>
        <van-icon name="down" />
      </template>
      <template #title>
        {{ title }}
      </template>
      <template #right>
        <span v-if="hasSave">保存</span>
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
    path: String,
    // 是否需要保存按钮
    hasSave: Boolean,
    // 是否固定导航
    fixed: Boolean
  },
  data () {
    return {}
  },
  methods: {
    save () {
      // 调用父组件中的方法
      this.$emit('save')
    }
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
