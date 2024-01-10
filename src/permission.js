/* 路由前置守卫 */
import router from '@/router'
import store from '@/store'

import { ElMessage } from 'element-plus'

// 白名单
const whiteList = ['Login']

router.beforeEach(async (to, from, next) => {
  // 用户已登录,不允许进入login
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      // 判断用户资料是否获取
      // 若不存在用户信息，则需要获取用户信息
      if (!store.getters.hasUserInfo) {
        // 触发获取用户信息的 action，并获取用户当前权限
        const { permission } = await store.dispatch('user/getUserInfo')
        // 处理用户权限，筛选出需要添加的权限
        const filterRoutes = await store.dispatch(
          'permission/filterRoutes',
          permission.menus
        )
        // 利用 addRoute 循环添加
        filterRoutes.forEach(item => {
          router.addRoute(item)
        })
        // 添加完动态路由之后，需要在进行一次主动跳转
        return next(to.path)
      }
      next()
    }
  } else {
    // 用户token到期或未登录
    if (whiteList.indexOf(to.name) > -1) {
      next()
    } else {
      ElMessage({
        showClose: true,
        message: '噢，您未登录或者令牌过期了哦!',
        type: 'warning',
        duration: 1500
      })
      next({ name: 'Login' })
    }
  }
})
