<template>
  <div class="login">
    <!-- 导航区域 -->
    <hmNavBar path="/find"></hmNavBar>
    <div class="content">
      <h3>您好,请登录</h3>
      <van-form ref="form" :rules="rules">
        <van-field
          v-model="form.mobile"
          name="mobile"
          :rules="rules.mobile"
          placeholder="请输入手机号"
        >
          <template #left-icon> <van-icon name="phone-o" /> </template>
        </van-field>
        <van-field
          v-model="form.code"
          name="code"
          :rules="rules.code"
          placeholder="请输入验证码"
        >
          <template #left-icon> <van-icon name="records"/></template>
          <template #button>
            <span class="code" @click="getCode" v-if="totalTime === 60">
              获取验证码
            </span>
            <span v-else> {{ totalTime }}秒可重新发送 </span>
          </template>
        </van-field>
      </van-form>
      <div class="tip">
        登录即同意<a href="javascript:">《用户使用协议》</a>和<a
          href="javascript:"
          >《隐私协议》</a
        >
      </div>
      <van-button
        class="comfirmButton"
        color="#e40137"
        round
        type="primary"
        size="large"
        @click="submit"
        >确定</van-button
      >
    </div>
  </div>
</template>

<script>
// 导入封装好的请求接口
import { getCodeApi, submitApi } from '@/api/login'
// 导入封装好的保存localStorage.js
import { setLocal } from '@/utils/local'
// 导入mapMutations,mapState
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    // // 定义mapState方法
    ...mapState(['userInfo', 'isLogin'])
  },
  data () {
    return {
      form: {
        mobile: '18888881111',
        code: ''
      },
      rules: {
        mobile: [
          { required: true },
          {
            pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
            message: '输入的手机号不符合要求'
          }
        ],
        code: [{ required: true }]
      },
      // 定义一个倒计时参数
      totalTime: 60
    }
  },
  methods: {
    // 定义mapMutations方法
    ...mapMutations(['setUserInfo', 'setIsLogin']),
    // 获取验证码
    async getCode () {
      try {
        await this.$refs.form.validate('mobile')
        // 验证通过后发送请求,点击后提示加载中
        this.$toast.loading('加载中')
        try {
          // 调用封装好的接收验证码接口
          const res = await getCodeApi({ mobile: this.form.mobile })
          this.$toast.success(res.data.data)
          this.form.code = res.data.data
          const timer = setInterval(() => {
            this.totalTime--
            if (this.totalTime <= 0) {
              // 清空定时器
              clearInterval(timer)
              // 将时间还原为60
              this.totalTime = 60
            }
          }, 100)
        } catch (error) {
          this.$toast.fail(error.message)
        }
      } catch (error) {
        this.$toast.fail(error.message)
      }
    },
    // 登录验证
    async submit () {
      try {
        await this.$refs.form.validate()
        try {
          const res = await submitApi({
            mobile: this.form.mobile,
            code: this.form.code
          })
          // 将token保存到localStorage
          setLocal(res.data.data.jwt)
          this.setUserInfo(res.data.data.user) // 保存用户信息
          this.setIsLogin(true) // 修改登录状态为ture
          this.$toast.loading('登录成功,跳转中')
          // console.log(this.$route)
          // 判断当前页面的路由中是否存在_redirect
          const _redirect = this.$route.query._redirect
          if (_redirect) {
            // 如果存在,则跳转到上一个页面
            this.$router.push(_redirect)
          } else {
            // 不存在则跳转到/my
            this.$router.push('/my')
          }
        } catch (error) {
          this.$toast.fail(error.message)
        }
      } catch (error) {
        this.$toast.fail('请输入验证码')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  .content {
    margin: 0 15px;
    h3 {
      font-size: 26px;
    }
    .code {
      color: #00b8d4;
    }
    .tip {
      font-size: 16px;
      margin-top: 30px;
      a {
        color: #00b8d4;
      }
    }
    .comfirmButton {
      margin-top: 50px;
    }
  }
}
</style>
