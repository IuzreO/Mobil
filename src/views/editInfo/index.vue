<template>
  <div class="editInfo">
    <hmNavBar
      :title="titel"
      path="/info"
      :hasSave="value !== userInfo[prop]"
      @save="saveData"
    >
    </hmNavBar>
    <div class="myNickname" v-if="prop !== 'avatar'">
      <van-field
        class="fieldNickname"
        v-model="value"
        placeholder="请输入昵称"
      ></van-field>
    </div>
    <div class="upload" v-else>
      <van-uploader v-model="fileList" :max-count="1" :after-read="afterRead" />
    </div>
  </div>
</template>
<script>
// 导入修改数据的api
import { editUserInfoApi, editUserImgApi } from '@/api/userInfo'
// 导入vuex的辅助函数
import { mapState } from 'vuex'
export default {
  data () {
    return {
      // 默认值
      value: '',
      //  需要修改的属性
      prop: this.$route.query.property,
      // 标题
      titel: '',
      // 图片
      fileList: []
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },

  created () {
    // 修改默认值
    this.value = this.userInfo[this.prop]
    if (this.prop === 'nickname') {
      // 修改标题
      this.titel = '修改用户昵称'
    } else if (this.prop === 'intro') {
      // 修改标题
      this.titel = '修改用户简介'
    } else if (this.prop === 'avatar') {
      // 修改标题
      this.titel = '修改用户头像'
      this.fileList.push({
        url: `${process.env.VUE_APP_URL}${this.value}`
      })
    } else if (this.prop === 'position') {
      this.titel = '修改工作岗位'
    }
  },
  methods: {
    async saveData () {
      // 点击按钮后触发
      this.$toast.loading('加载中')
      await editUserInfoApi({
        [this.prop]: this.value
      })
      // if (this.prop === 'nickname') {
      //   await editUserInfoApi({
      //     nickname: this.value
      //   })
      // } else if (this.prop === 'intro') {
      //   await editUserInfoApi({
      //     intro: this.value
      //   })
      // }
      // 跳转到info页面
      this.$router.push(this.prop === 'position' ? '/my' : '/info')
      // 刷新数据
      this.$toast.success('修改成功')
      this.$store.dispatch('setUserInfo')
    },
    // 文件上传完毕后会触发 after-read 回调函数，获取到对应的 file 对象。
    async afterRead (file) {
      const res = await editUserImgApi(file.file)
      this.value = res.data.data[0].id
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
.editInfo {
  .myNickname {
    margin: 15px;
    .fieldNickname {
      background-color: #f7f7f7;
    }
  }
  .upload {
    text-align: center;
    /deep/ .van-uploader__upload {
      width: 200px;
      height: 200px;
    }
    /deep/.van-uploader__preview-image {
      width: 200px;
      height: 200px;
    }
  }
}
</style>
