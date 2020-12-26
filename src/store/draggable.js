const draggable = {
    namespaced: true,
    state: () => ({
        dragging: false
    }),
    mutations: {
        DRAG_STARTED (state) {
            state.dragging = true
        },
        DRAG_STOPPED (state) {
            state.dragging = false
        }
    },
    actions: {
        dragStarted(context) {
            context.commit('DRAG_STARTED');
        },
        dragStopped(context) {
            context.commit('DRAG_STOPPED')
        }
    },
    getters: {
        dragging(state) {
            return state.dragging
        }
    }
}

export default draggable
