const app = {
  namespaced: true,
  state: () => ({
    loading: false,
    errorMessage: null
  }),
  mutations: {
    LOADING_STARTED (state) {
      state.loading = true
    },
    LOADING_ENDED (state) {
      state.loading = false
    },
    SHOW_ERROR (state, message) {
      state.errorMessage = message
    },
    CLEAR_ERROR (state) {
      state.errorMessage = null
    }
  },
  actions: {
    loadingStarted (context) {
      context.commit('LOADING_STARTED')
    },
    loadingEnded (context) {
      context.commit('LOADING_ENDED')
    },
    showError ({ commit }, message) {
      commit('SHOW_ERROR', message)
    },
    clearError (context) {
      context.commit('CLEAR_ERROR')
    }
  },
  getters: {
    loading (state) {
      return state.loading
    },
    errorMessage (state) {
      return state.errorMessage
    }
  }
}

export default app
