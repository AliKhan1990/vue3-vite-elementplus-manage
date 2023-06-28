const getters = {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  hasUserInfo: state => {
    // True 有用户信息
    return Object.keys(state.user.userInfo).length > 0
  }
}

export default getters
