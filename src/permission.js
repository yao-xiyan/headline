// 权限
import router from './router'
// 全局前置首位
router.beforeEach(function (to, from, next) {
  // 判断 拦截的范围
  if (to.path.startsWith('/home')) {
    // 进入到了拦截范围
    // 判断是否登陆 有token 就登陆 没token就没登录
    let token = window.localStorage.getItem('user-token') // 获取token
    // token ? next() : next('/login')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next() // 放行
  }
})
export default router
