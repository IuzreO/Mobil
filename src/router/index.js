import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入路由组件
import login from '@/views/login/login.vue'
import home from '@/views/home/index.vue'
import my from '@/views/my/index.vue'
import find from '@/views/find/index.vue'
import question from '@/views/question/index.vue'
// 导入local
import { getLocal } from '@/utils/local'
// 导入toast
import { Toast } from 'vant'
// 导入store
import store from '@/store/index'
// 导入封装好的获取用户信息api
import { getUserInfoApi } from '@/api/userInfo'
// 使用Vuerouter
Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    redirect: '/my'
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/home',
    component: home,
    children: [
      {
        path: '/my',
        component: my,
        meta: {
          // 判断用户是否需要登录
          needLogin: true
        }
      },
      {
        path: '/find',
        component: find
      },
      {
        path: '/question',
        component: question,
        meta: {
          // 判断用户是否需要登录
          needLogin: true
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
// 注册路由前置导航守卫
router.beforeEach(async (to, from, next) => {
  // to 对象 到哪去
  // from 对象 从哪来
  // 参数(路由信息,地址,名字,url)
  // next()函数,继续跳转,反之则不会跳转
  // 判断页面是否需要登录
  if (to.meta.needLogin) {
    // 页面需要登录判断是否存在token
    var token = getLocal()
    if (token) {
      // 判断:userInfo是否存在数据,通过isLogin判断,如果登录成功则为true,刷新后Vuex数据丢失,则变为false
      if (store.state.isLogin) {
        // 如果存在 则继续向下执行
        next()
      } else {
        try {
          // 进入else则表示刷新后用户信息已被清除,需要重新发送获取用户信息请求到服务器
          const res = await getUserInfoApi()
          // 将用户信息保存到Vuex中
          store.commit('setUserInfo', res.data.data)
          store.commit('setIsLogin', true)
          // 向下执行
          next()
        } catch (error) {
          Toast.fail(error.message)
        }
      }
    } else {
      // 如果不存在,则提示未登录 跳转到登录页面
      Toast.fail('请先登录')
      next(`/login?_redirect=${to.fullPath}`)
    }
  } else {
    // 当前页面不需要登录 则直接跳转
    next()
  }
})

export default router
