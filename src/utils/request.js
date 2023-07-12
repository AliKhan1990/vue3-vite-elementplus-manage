import store from '@/store'
import axios from 'axios'
import baseURL from './baseUrl'
import { ElMessage } from 'element-plus'
import { isCheckTimeout } from '@/utils/auth'

const service = axios.create({
  baseURL: baseURL,
  timeout: 5000
})

service.defaults.headers['Conntent-Type'] = 'application/json;charset=utf-8'

// 拦截器Code设置
service.interceptors.request.use(
  config => {
    // 添加 icode
    config.headers.icode = '40C9D047C730848F'
    // 必须返回 config
    return config
  }
)
// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在这个位置需要统一的去注入token
    if (store.getters.token) {
      // checkout token timeout
      if (isCheckTimeout()) {
        store.dispatch('user/logout')
        return Promise.reject(new Error('Token 已经失效！'))
      }
      // 如果token存在 注入token
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    return config // 必须返回配置
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const { success, message, data } = response.data
    //   要根据success的成功与否决定下面的操作
    if (success) {
      return data
    } else {
      // 业务错误
      ElMessage.error(message) // 提示错误消息
      return Promise.reject(new Error(message))
    }
  },
  error => {
    // 处理 token 超时问题
    // 响应拦截器
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      // token超时
      store.dispatch('user/logout')
    }
    ElMessage.error(error.message) // 提示错误信息
    return Promise.reject(error)
  }
)

export default service
