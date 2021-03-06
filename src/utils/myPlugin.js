// 导入顶部插件
import hmNavBar from '@/components/hmNavBar.vue'
import shareItem from '@/components/shareItem.vue'
// 导入 store
import store from '@/store'
// 导入 toast
import { Toast } from 'vant'
// 导入 router
import router from '@/router'
// 导入day.js插件
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

// 自定义Vue插件
const myPlugin = {}
// 添加一个install方法
myPlugin.install = function (Vue) {
  // Vue就是构造器
  // 在插件中将顶部导航封装为一个全局组件
  // Vue.component('组件名称','组件对象')
  Vue.component(hmNavBar.name, hmNavBar)
  Vue.component(shareItem.name, shareItem)
  // 设置一个全局过滤器
  // 相对时间
  Vue.filter('dayJsTime', function (value) {
    return dayjs().from(value)
  })
  // 格式化时间
  Vue.filter('normalTime', function (value) {
    return dayjs(value).format('YYYY.MM.HH')
  })
  // 全局的登录方法
  Vue.prototype.$login = function () {
    // 判断用户是否登录
    if (!store.state.isLogin) {
      Toast.fail('对不起，您还没有登录')
      router.push(`/login?_redirect=${window.location.hash}`)
      return false
    } else {
      return true
    }
  }
}
// 将方法暴露出去
export default myPlugin
