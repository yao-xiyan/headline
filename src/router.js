import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home/' // 加载index.vue
import Login from './views/login'
import Main from './views/home/main.vue' // 引入main.vue

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '', // 什么都不写默认二级路由
          component: Main
        },
        {
          path: 'comment', // 评论列表路径
          component: () => import('./views/comment')

        },
        {
          path: 'material', // 素材管理路径
          component: () => import('./views/material')
        },
        {
          path: 'articles', // 内容列表路径
          component: () => import('./views/articles')
        },
        {
          path: 'publish/:articleId', // 发布文章路径 定义一个参数
          component: () => import('./views/publish')
        },
        {
          // 新建组件匹配路径
          path: 'publish', // 发布文章路径
          component: () => import('./views/publish')
        }
      ]
    },
    {
      path: '/login',
      component: Login
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
