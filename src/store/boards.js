const boards = {
    namespaced: true,
    state: () => ({
        boards: [
            { id: 1, title: 'Welcome!' },
            { id: 2, title: 'Sprint 1' },
            { id: 3, title: 'Sprint 2' },
            { id: 4, title: 'Sprint 3' },
            { id: 5, title: 'Sprint 4' },
            { id: 6, title: 'Sprint 5' },
            { id: 7, title: 'Sprint 6' }
        ],
    }),
    mutations: {
        ADD: (state, board) => {
            state.boards.push(board)
        }
    },
    actions: {
        add ({ commit }, board) {
            commit('ADD', board)
            return Promise.resolve()
        }
    },
    getters: {
        all (state) {
            return state.boards
        },
        nextBoardId (state) {
            return state.boards.length + 1
        }
    }
}

export default boards
