import layoutAside from './home/layout-aside'
import layoutHeader from './home/layout-header'
import breakCrumb from './common/break-crumb' // 引入组件
// 实现整理组件的统一注册
export default {
  install (Vue) {
    // 调用install方法 传入Vue对象
    // 实例化对象之前注册组件
    Vue.component('layout-aside', layoutAside) // 全局注册左侧导航组件
    Vue.component('layout-header', layoutHeader) // 全局注册头部组件
    Vue.component('break-crumb', breakCrumb) // 全局面包屑组件
  }
}
