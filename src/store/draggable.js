const draggable = {
  namespaced: true,
  state: () => ({
    dragging: false,
    targetListId: null,
    movingItemId: null
  }),
  mutations: {
    DRAG_STARTED (state) {
      state.dragging = true
    },
    DRAG_STOPPED (state) {
      state.dragging = false
    },
    SET_TARGET_LIST_ID (state, listId) {
      state.targetListId = listId
    },
    SET_MOVING_ITEM_ID (state, itemId) {
      state.movingItemId = itemId
    }
  },
  actions: {
    dragStarted (context) {
      context.commit('DRAG_STARTED')
    },
    dragStopped (context) {
      context.commit('DRAG_STOPPED')
    },
    setTargetListId ({ commit }, listId) {
      commit('SET_TARGET_LIST_ID', listId)
    },
    setMovingItemId ({ commit }, itemId) {
      commit('SET_MOVING_ITEM_ID', itemId)
    }
  },
  getters: {
    dragging (state) {
      return state.dragging
    },
    targetListId (state) {
      return state.targetListId
    },
    movingItemId (state) {
      return state.movingItemId
    }
  }
}

export default draggable
