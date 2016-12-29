
export default{
  state: {
    user: JSON.parse(sessionStorage.getItem('user')) || ''
  },
  mutations: {
    /**
     * 登录成功
     * 
     * @param {Object} state
     * @param {Object} user
     */
    SIGNIN(state, user) {
      sessionStorage.setItem('user', JSON.stringify(user))
      state.user = user
    },
    /**
     * 退出登录
     * 
     * @param {Object} state
     */
    SIGNOUT(state) {
      sessionStorage.removeItem('user')
      state.user = {}
    }
  },
  actions: {
    SIGNIN({commit}, user) {
      commit('SIGNIN', user)
    },
    SIGNOUT({commit}) {
      commit('SIGNOUT')
    }
  }
}
