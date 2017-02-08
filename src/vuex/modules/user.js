
export default{
  state: {
    user: JSON.parse(localStorage.getItem('user')) || ''
  },
  mutations: {
    /**
     * 登录成功
     * 
     * @param {Object} state
     * @param {Object} user
     */
    SIGNIN(state, user) {
      localStorage.setItem('user', JSON.stringify(user))
      state.user = user
    },
    /**
     * 退出登录
     * 
     * @param {Object} state
     */
    SIGNOUT(state) {
      localStorage.removeItem('user')
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
