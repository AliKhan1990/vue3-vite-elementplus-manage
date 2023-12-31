import { login, getUserInfo } from '@/api/sys'
import md5 from 'md5'
import { setItem, getItem, removeAllItem } from '@/utils/storage.js'
import { TOKEN } from '@/constant'
import { setTimeStamp } from '@/utils/auth'
import router from '@/router'

export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || '',
    userInfo: {}
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem(TOKEN, token)
    },
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    login(context, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({
          username,
          password: md5(password)
        })
          .then(data => {
            this.commit('user/setToken', data.token)
            setTimeStamp()
            router.push('/')
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    async getUserInfo () {
      const res = await getUserInfo()
      this.commit('user/setUserInfo', res)
      return res
    },
    logout() {
      this.commit('user/setToken', '')
      this.commit('user/setUserInfo', {})
      removeAllItem()
      router.push('/login')
    }
  }
}
