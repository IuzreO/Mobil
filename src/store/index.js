import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: '', // 用户信息
    isLogin: false // 是否登录
  },
  mutations: {
    setUserInfo (state, payload) {
      state.userInfo = payload
    },
    setIsLogin (state, payload) {
      state.isLogin = payload
    }
  },
  actions: {},
  modules: {}
})
