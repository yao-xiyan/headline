
// 负责对axios进行畜栏里
import axios from 'axios'

// 设置常态值 将main.js的常态值移过来 净化main.js
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// axios 请求拦截
axios.interceptors.request.use(function (config) {
  // 发起请求做一些业务处理
  // config是要发送请求的配置信息
  let token = window.localStorage.getItem('user-token')
  config.headers['Authorization'] = `Bearer ${token}` // 统一注入token
  return config
}, function (error) {
  // 对请求失败做处理
  return Promise.reject(error)
})
// 响应拦截
axios.interceptors.response.use(function (response) {
  // 对响应数据做处理，执行成功时进入
  return response.data ? response.data : {}
}, function () {
  // 执行失败时执行
})
export default axios
// export default {
//   install (Vue) {
//     Vue.prototype.$axios = axios // 将axios共享给所有Vue或者组件实例使用
//   }
// }
