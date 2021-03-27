import Vue from 'vue'
import Vuex from 'vuex'
// 导入获取用户信息api
import { getUserInfoApi } from '@/api/userInfo'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: '', // 用户信息
    isLogin: false, // 是否登录
    genderObj: {
      0: '未知',
      1: '女',
      2: '男'
    } // 性别对象
  },
  mutations: {
    setUserInfo (state, payload) {
      state.userInfo = payload
    },
    setIsLogin (state, payload) {
      state.isLogin = payload
    }
  },
  actions: {
    // 定义一个方法:用来得到新获取的用户信息,并将信息提交到mutations
    async getUserInfo (context) {
      // 发送获取用户信息请求
      const res = await getUserInfoApi()
      // 将获取的数据保存到mutations中
      context.commit('setUserInfo', res.data.data)
    }
  },
  getters: {
    getMyProp: function (state) {
      return function (props, id) {
        return state.userInfo[props] && state.userInfo[props].includes(+id)
      }
    }
  },
  modules: {}
})
