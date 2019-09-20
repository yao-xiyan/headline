import Vue from 'vue'
import App from './App.vue'
import router from './permission'
import Element from 'element-ui'
import Component from './components' // 引入插件对象
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css' // 引入element-ui 样式表
import './styles/index.less' //  进行初始化设置
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.prototype.$axios = axios // axios赋值给全局属性

Vue.config.productionTip = false
Vue.use(Element) // 引入element-ui 全局注册
Vue.use(Component) // 注册插件
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
