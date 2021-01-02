import { v4 as uuidv4 } from 'uuid'

const boards = {
    namespaced: true,
    state: () => ({
        boards: [
            {
                id: '1',
                title: 'Welcome!',
                open: true,
                lists: [
                    { title: "To Do", items: [{id: 0, title: 'Task A'}, {id: 1, title: 'Task D'}, {id: 2, title: 'Task G'}], id: '0' },
                    { title: "Doing", items: [{id: 3, title: 'Task B'}, {id: 4, title: 'Task C'}, {id: 5, title: 'Task F'}], id: '1' },
                    { title: "Testing", items: [{id: 6, title: 'Task K'}, {id: 7, title: 'Task L'}, {id: 8, title: 'Task M'}], id: '2' },
                    { title: "Waiting Deploy", items: [{id: 9, title: 'Task N'}, {id: 10, title: 'Task O'}, {id: 11, title: 'Task P'}], id: '3' },
                    { title: "Done", items: [{id: 12, title: 'Task H'}, {id: 13, title: 'Task I'}, {id: 14, title: 'Task J'}], id: '4' }
                ]
            },
            { id: '2', title: 'Sprint 1', open: true, lists: [] },
            { id: '3', title: 'Sprint 2', open: true, lists: [] },
            { id: '4', title: 'Sprint 3', open: true, lists: [] },
            { id: '5', title: 'Sprint 4', open: true, lists: [] },
            { id: '6', title: 'Sprint 5', open: false, lists: [] }
        ]
    }),
    mutations: {
        ADD_BOARD (state, board) {
            state.boards.push(board)
        },
        CLOSE_BOARD (state, id) {
            state.boards.find(b => b.id === id).open = false
        },
        ADD_LIST(state, { boardId, list }) {
            state.boards.find(b => b.id === boardId).lists.push(list)
        },
        ADD_LIST_ITEM(state, { listId, item }) {
            const list = state.boards.reduce((array, item) => array.concat(item.lists), [])
                .find(list => list.id === listId)
            list.items.push(item)
        },
        UPDATE_LIST_TITLE(state, { listId, newTitle }) {
            const list = state.boards.reduce((array, item) => array.concat(item.lists), [])
                .find(list => list.id === listId)
            list.title = newTitle
        }
    },
    actions: {
        addBoard ({ commit }, title) {
            commit('ADD_BOARD', { id: uuidv4(), title: title, open: true, lists: [] })
            return Promise.resolve()
        },
        closeBoard ({ commit }, id) {
            commit('CLOSE_BOARD', id)
            return Promise.resolve()
        },
        addList ({ commit }, { boardId, listTitle }) {
            commit('ADD_LIST', { boardId: boardId, list: { id: uuidv4(), title: listTitle, items: [] } })
            return Promise.resolve()
        },
        addListItem({ commit }, payload) {
            commit('ADD_LIST_ITEM', { listId: payload.listId, item: { id: uuidv4(), title: payload.itemTitle } })
            return Promise.resolve()
        },
        updateListTitle({ commit }, { listId, newTitle } ) {
            commit('UPDATE_LIST_TITLE', { listId, newTitle } )
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
        boardOfId: (state) => (id) => {
            return state.boards.find(b => b.id === id)
        },
        listOfId: (state) => (id) => {
            return state.boards.reduce((array, item) => array.concat(item.lists), [])
                .find(list => list.id === id)
        }
    }
}

export default boards
