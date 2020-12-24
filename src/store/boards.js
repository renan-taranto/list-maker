const boards = {
    namespaced: true,
    state: () => ({
        boards: [
            { id: 1, title: 'Welcome!', open: true },
            { id: 2, title: 'Sprint 1', open: true },
            { id: 3, title: 'Sprint 2', open: true },
            { id: 4, title: 'Sprint 3', open: true },
            { id: 5, title: 'Sprint 4', open: true },
            { id: 6, title: 'Sprint 5', open: false }
        ]
    }),
    mutations: {
        ADD: (state, board) => {
            state.boards.push(board)
        },
        CLOSE: (state, id) => {
            state.boards.find(b => b.id === id).open = false
        }
    },
    actions: {
        add ({ commit, getters }, title) {
            commit('ADD', { id: getters.nextBoardId, title: title, open: true })
            return Promise.resolve()
        },
        close ({ commit }, id) {
            commit('CLOSE', id)
            return Promise.resolve()
        }
    },
    getters: {
        openBoards (state) {
            return state.boards.filter(b => b.open)
        },
        closedBoards (state) {
            return state.boards.filter(b => b.open === false)
        },
        nextBoardId (state) {
            return state.boards.length + 1
        }
    }
}

export default boards
