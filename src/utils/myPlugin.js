// 导入顶部插件
import hmNavBar from '@/components/hmNavBar.vue'
// 自定义Vue插件
const myPlugin = {}
// 添加一个install方法
myPlugin.install = function (Vue) {
  // Vue就是构造器
  // 在插件中将顶部导航封装为一个全局组件
  // Vue.component('组件名称','组件对象')
  Vue.component(hmNavBar.name, hmNavBar)
}
// 将方法暴露出去
export default myPlugin
