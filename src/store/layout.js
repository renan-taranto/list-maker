const layout = {
  namespaced: true,
  state: () => ({
    loading: false
  }),
  mutations: {
    LOADING_STARTED (state) {
      state.loading = true
    },
    LOADING_ENDED (state) {
      state.loading = false
    }
  },
  actions: {
    loadingStarted (context) {
      context.commit('LOADING_STARTED')
    },
    loadingEnded (context) {
      context.commit('LOADING_ENDED')
    }
  },
  getters: {
    loading (state) {
      return state.loading
    }
  }
}

export default layout
