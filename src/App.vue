<template>
  <div>
    <van-cell label="下方">
      <template #title>
        <van-icon name="fire-o" />
        <span>左侧</span>
        <van-icon name="fire-o" />
      </template>
      <template #default>
        <van-icon name="fire-o" />
        <span>右侧</span>
        <van-icon name="fire-o" />
      </template>
    </van-cell>
    <!-- 路由出口 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
