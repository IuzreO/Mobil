import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入路由组件
import login from '@/views/login/login.vue'
import home from '@/views/home/index.vue'
import my from '@/views/my/index.vue'
import find from '@/views/find/index.vue'
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
        component: my
      },
      {
        path: '/find',
        component: find
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
