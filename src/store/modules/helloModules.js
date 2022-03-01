export default {
  namespaced: true,
  state: {
    msg: 'helloModules',
  },
  mutations: {
    msgUpdate(state, data) {
      this.state.msg = data;
    }
  },
  actions: {
    msgEmit(content, data) {
      content.commit('msgUpdate', data);
    },
  },
}
