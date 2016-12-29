import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import cards from './modules/cards'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    cards
  }
})
