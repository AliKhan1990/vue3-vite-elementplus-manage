import axios from 'axios'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
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

export default service
