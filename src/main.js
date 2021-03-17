import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 页面适配 - flexible      导入rem包
import 'amfe-flexible'
// 页面适配 - normalize.css 清除默认样式
import 'normalize.css'
// 引入Vant
import Vant from 'vant'
// 引入Vant.css
import 'vant/lib/index.css'
// 使用 vant
// 导入字体图标的样式
import '@/style/iconfont/iconfont.css'
// 导入全局的hmnavBar组件
// import myNavBar from '@/components/hmNavBar.vue'
// // 全局注册
// // Vue.component('组件名称','组件对象')
// Vue.component(myNavBar.name, myNavBar)
// 导入自定义封装的myPlugin插件
import myPlugin from '@/utils/myPlugin'
// 使用
Vue.use(myPlugin)
Vue.use(Vant)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
