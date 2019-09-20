import { Message } from 'element-ui'
// 负责对axios进行畜栏里
import axios from 'axios'
import router from '../permission' // 导入实例 Vue.prototype.$router = router
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
}, function (error) {
  // 执行失败时执行
  let status = error.response.status // 获取失败状态吗
  let message = '未知错误'
  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 403:
      message = '403 refresh_token未携带或已过期'
      break
    case 507:
      message = '服务器数据库异常'
      break
    case 401:
      message = 'token过期或未出'
      window.localStorage.clear() // 清空缓存
      router.push('/login')
      break
    case 404:
      message = '手机号不正确'
      break
    default:
      break
  }
  // element-ui 中的 单独引入
  Message({ Message })
  // 返回新的promise 终止错误
  // 删除所有请求的catch
  return new Promise(function () {

  })
})
export default axios
// export default {
//   install (Vue) {
//     Vue.prototype.$axios = axios // 将axios共享给所有Vue或者组件实例使用
//   }
// }
