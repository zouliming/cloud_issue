
import Api from '../../common/api'

export default {
  state: {
    cards: [],
    current_group_id:'',
    current_task_id:''
  },
  mutations: {
    //查询流程
    select_card(state, group_id) {
      state.current_group_id = group_id;
      Api.get('/Card/select/group_id/' + group_id, function (res) {
        state.cards = res;
      });
    },
    set_current_task_id(state, task_id) {
      state.current_task_id = task_id;
    }
  },
  actions: {
    select_card({commit}, group_id) {
      commit('select_card', group_id)
    },
    set_current_task_id({commit}, task_id) {
      commit('set_current_task_id', task_id)
    }
  }
}
