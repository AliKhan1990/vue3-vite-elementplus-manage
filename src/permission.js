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
      // console.log(store.getters.hasUserInfo)
      if (!store.getters.hasUserInfo) {
        await store.dispatch('user/getUserInfo')
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
