<template>
  <div class="myInfo">
    <hm-nav-bar title="我的资料" path="/my"> </hm-nav-bar>
    <div class="content">
      <van-cell title="头像" is-link @click="openPanle('avatar')">
        <template #default>
          <img :src="baseUrl + userInfo.avatar" alt="" />
        </template>
      </van-cell>
      <van-cell-group class="cellGroup">
        <van-cell
          title="昵称"
          :value="userInfo.nickname"
          is-link
          @click="openPanle('nickname')"
        ></van-cell>
        <van-cell
          title="性别"
          :value="genderObj[userInfo.gender]"
          is-link
          @click="genderShow = true"
        ></van-cell>
        <van-cell
          title="地区"
          :value="area.city_list[userInfo.area]"
          is-link
          @click="areaShow = true"
        ></van-cell>
        <van-cell
          title="个人简介"
          :value="userInfo.intro"
          is-link
          @click="openPanle('intro')"
        ></van-cell>
      </van-cell-group>
      <van-cell class="signOut" title="退出登录" @click="signOut"> </van-cell>
    </div>
    <!-- 修改性别面板 -->
    <van-popup v-model="genderShow" position="bottom">
      <van-picker
        title="性别"
        show-toolbar
        :columns="columns"
        :default-index="userInfo.gender"
        @confirm="onGenderConfirm"
        @cancel="onGenderCancel"
      />
    </van-popup>
    <!-- 修改地区面板 -->
    <van-popup v-model="areaShow" position="bottom">
      <van-area
        title="请选择地区"
        :area-list="area"
        :value="userInfo.area"
        :columns-num="2"
        @confirm="onAreaConfirm"
        @cancel="onAreaCancel"
      />
    </van-popup>
  </div>
</template>

<script>
// 导入Vuex中的辅助函数
import { mapState, mapMutations, mapActions } from 'vuex'
// 导入area
import area from '@/utils/area'
// 导入删除token组件
import { removeLocal } from '@/utils/local'
// 导入修改和请求用户信息的api
import { editUserInfoApi } from '@/api/userInfo'
export default {
  data () {
    return {
      baseUrl: process.env.VUE_APP_URL,
      area,
      genderShow: false,
      areaShow: false,
      columns: ['未知', '女', '男']
    }
  },
  methods: {
    // 定义mapMutations方法
    ...mapMutations(['setIsLogin', 'setUserInfo']),
    ...mapActions(['getUserInfo']),
    // 实现退出功能
    signOut () {
      this.$dialog
        .confirm({
          title: '提示',
          message: '确定退出'
        })
        .then(() => {
          removeLocal('token')
          this.setIsLogin(false)
          this.$toast.success('退出成功')
          this.$router.push('/login')
        })
    },
    // 实现修改性别功能
    // value代表选中的值,index代表选中的下标
    async onGenderConfirm (value, index) {
      this.genderShow = false
      this.$toast.loading('加载中')
      await editUserInfoApi({
        gender: index
      })
      // 发送请求获取用户信息数据
      // const res = await getUserInfoApi()
      // // 将修改成功后的数据保存到vuex中
      // this.setUserInfo(res.data.data)
      this.$toast.success('修改成功')
      // this.$store.dispatch('getUserInfo')
      this.getUserInfo()
    },
    onGenderCancel () {
      this.genderShow = false
    },
    // 实现修改地区功能
    async onAreaConfirm (arr) {
      // 关闭弹出层
      this.areaShow = false
      this.$toast.loading('加载中')
      await editUserInfoApi({
        area: arr[1].code
      })
      // 刷新数据
      this.$toast.success('修改成功')
      // this.$store.dispatch('getUserInfo')
      this.getUserInfo()
    },
    onAreaCancel () {
      this.areaShow = false
    },
    // 修改昵称
    // toChangeNickname () {
    //   this.$router.push('/editInfo?property=nickname')
    // },
    // 封装修改昵称 简介 头像方法
    openPanle (prop) {
      this.$router.push(`/editInfo?property=${prop}`)
    }
  },
  computed: {
    // 数据源
    ...mapState(['userInfo', 'genderObj', 'inLogin'])
  }
}
</script>

<style lang="less" scoped>
.myInfo {
  height: 100%;
  background-color: #f7f4f5;
  /deep/.van-nav-bar__title {
    font-size: 18px;
    font-family: PingFangSC, PingFangSC-Semibold;
    font-weight: 600;
    color: #222222;
  }
  .content {
    padding: 15px;

    /deep/.van-cell {
      align-items: center;
    }
    img {
      height: 40px;
      width: 40px;
      border-radius: 50%;
    }
    .cellGroup {
      margin: 10px 0 15px 0;
    }
    .signOut {
      text-align: center;
      color: red;
    }
  }
}
</style>
