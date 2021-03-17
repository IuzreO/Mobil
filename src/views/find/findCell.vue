<template>
  <div class="findCell">
    <van-cell is-link center @click="goto">
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
  },
  methods: {
    // 点击这个单元格之后要进行跳转，跳转的路径由使用者来决定
    goto () {
      this.$emit('goto')
    }
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
