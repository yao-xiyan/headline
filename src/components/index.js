import layoutAside from './home/layout-aside'
import layoutHeader from './home/layout-header'
import breadCrumb from './common/bread-crumb' // 引入组件
// 富文本编辑器的引入 https://www.jianshu.com/p/8e6eeefcc588
// 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import coverImg from './publish/cover-image'
// 实现整理组件的统一注册
export default {
  install (Vue) {
    // 调用install方法 传入Vue对象
    // 实例化对象之前注册组件
    Vue.component('layout-aside', layoutAside) // 全局注册左侧导航组件
    Vue.component('layout-header', layoutHeader) // 全局注册头部组件
    Vue.component('bread-crumb', breadCrumb) // 全局面包屑组件
    Vue.component('quill-editor', quillEditor) // 全局注册富文本组件
    Vue.component('cover-image', coverImg) // 全局注册封面组件
  }
}
