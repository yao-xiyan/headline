import Vue from 'vue'
import App from './App.vue'
import router from './permission'
import Element from 'element-ui'
import Component from './components' // 引入插件对象
import axios from './utils/axios.config'
import 'element-ui/lib/theme-chalk/index.css' // 引入element-ui 样式表
import './styles/index.less' //  进行初始化设置

Vue.prototype.$axios = axios // axios赋值给全局属性

Vue.config.productionTip = false
Vue.use(Element) // 引入element-ui 全局注册
Vue.use(Component) // 注册插件
// Vue.use(axios) // 使用注册第二种方式
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
