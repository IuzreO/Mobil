import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 页面适配 - flexible
import 'amfe-flexible'
// 页面适配 - normalize.css
import 'normalize.css'
// 引入Vant
import Vant from 'vant'
// 引入Vant.css
import 'vant/lib/index.css'
// 使用 vant
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
