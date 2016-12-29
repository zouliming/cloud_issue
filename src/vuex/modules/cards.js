
import Api from '../../common/api'

export default {
  state: {
    cards: []
  },
  mutations: {
    //查询流程
    select_card(state, group_id) {
      Api.get('/Card/select/group_id/' + group_id, function (res) {
        state.cards = res;
      });
    },
  },
  actions: {
    select_card({commit}, group_id) {
      commit('select_card', group_id)
    },
  }
}
