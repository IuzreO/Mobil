// 专门存放处理网络请求的代码

// 导入axios
import axios from 'axios'
// 导入totas
import { Toast } from 'vant'
// 导入 lcaol 的操作方法
import { removeLocal } from '@/utils/local'
// 导入 store
import store from '@/store/index.js'
// 导入 router
import router from '@/router/index.js'
const _http = axios.create({
  baseURL: process.env.VUE_APP_URL
})
// 请求拦截器
_http.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 响应拦截器
_http.interceptors.response.use(
  res => {
    if (res.data.code === 200) {
      return res
    } else if (
      res.data.code === 400 ||
      res.data.code === 401 ||
      res.data.code === 403
    ) {
      // 返回错误信息
      Toast.fail(res.data.message)
      // 删除token
      removeLocal('token')
      // 将登陆状态修改为false
      store.commit('setIsLogin', false)
      // 返回登录页
      router.push('/login')
      return Promise.reject(new Error(res.data.message))
    } else {
      // 返回异常信息
      return Promise.reject(new Error(res.data.message))
    }
  },
  error => {
    return Promise.reject(error)
  }
)
// 暴露出去
export default _http
