<template>
  <div class="findCell">
    <van-cell is-link center>
      <template #title>
        <div class="title">{{ title }}</div>
      </template>
      <template #default>
        <div class="value">
          查看更多
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: ['title'],
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.findCell {
  .title {
    font-size: 18px;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 500;
    color: #222222;
  }
}
</style>
