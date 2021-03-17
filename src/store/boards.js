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
                    { id: '0', title: "To Do", items: [{id: '0', title: 'Task A'}, {id: 1, title: 'Task D'}, {id: 2, title: 'Task G'}] },
                    { id: '1', title: "Doing", items: [{id: '3', title: 'Task B'}, {id: 4, title: 'Task C'}, {id: 5, title: 'Task F'}] },
                    { id: '2', title: "Testing", items: [{id: '6', title: 'Task K'}, {id: 7, title: 'Task L'}, {id: 8, title: 'Task M'}] },
                    { id: '3', title: "Waiting Deploy", items: [{id: '9', title: 'Task N'}, {id: 10, title: 'Task O'}, {id: 11, title: 'Task P'}] },
                    { id: '4', title: "Done", items: [{id: '12', title: 'Task H'}, {id: 13, title: 'Task I'}, {id: 14, title: 'Task J'}] }
                ],
                archivedLists: []
            },
            { id: '2', title: 'Sprint 1', open: true, lists: [], archivedLists: [] },
            { id: '3', title: 'Sprint 2', open: true, lists: [], archivedLists: [] },
            { id: '4', title: 'Sprint 3', open: true, lists: [], archivedLists: [] },
            { id: '5', title: 'Sprint 4', open: true, lists: [], archivedLists: [] },
            { id: '6', title: 'Sprint 5', open: false, lists: [], archivedLists: [] }
        ],
        selectedBoardId: null
    }),
    mutations: {
        ADD_BOARD (state, board) {
            state.boards.push(board)
        },
        CLOSE_BOARD (state, id) {
            state.boards.find(b => b.id === id).open = false
        },
        SELECT_BOARD (state, boardId) {
            state.selectedBoardId = boardId
        },
        ADD_LIST(state, { boardId, list }) {
            state.boards.find(b => b.id === boardId).lists.push(list)
        },
        ARCHIVE_LIST(state, listId) {
            const board = state.boards.find(b => b.lists.find(l => l.id === listId))
            const listIndex = board.lists.findIndex(list => list.id === listId)
            const list = board.lists[listIndex]
            board.lists.splice(listIndex, 1)
            board.archivedLists.push(list)
        },
        RESTORE_LIST(state, listId) {
            const board = state.boards.find(b => b.archivedLists.find(l => l.id === listId))
            const listIndex = board.archivedLists.findIndex(l => l.id === listId)
            const list = board.archivedLists.splice(listIndex, 1)[0]
            board.lists.push(list)
        },
        MOVE_LIST(state, { listId, targetBoardId, targetIndex }) {
            const currentListBoard = state.boards.find(b => b.lists.find(l => l.id === listId))
            const currentListIndex = currentListBoard.lists.findIndex(list => list.id === listId)
            const list = currentListBoard.lists.splice(currentListIndex, 1)[0]

            state.boards.find(b => b.id === targetBoardId).lists.splice(targetIndex, 0, list)
        },
        UPDATE_LIST_TITLE(state, { listId, newTitle }) {
            const list = state.boards.reduce((array, item) => array.concat(item.lists), [])
                .find(list => list.id === listId)
            list.title = newTitle
        },
        ADD_LIST_ITEM(state, { listId, item }) {
            const list = state.boards.reduce((array, item) => array.concat(item.lists), [])
                .find(list => list.id === listId)
            list.items.push(item)
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
        selectBoard({ commit }, boardId) {
            commit('SELECT_BOARD', boardId)
        },
        addList ({ commit }, { boardId, listTitle }) {
            commit('ADD_LIST', { boardId: boardId, list: { id: uuidv4(), title: listTitle, items: [] } })
            return Promise.resolve()
        },
        archiveList({ commit }, listId) {
            commit('ARCHIVE_LIST', listId)
        },
        restoreList({ commit }, listId) {
            commit('RESTORE_LIST', listId)
        },
        moveList({ commit }, { listId, targetBoardId, targetIndex } ) {
            commit('MOVE_LIST', { listId, targetBoardId, targetIndex })
        },
        updateListTitle({ commit }, { listId, newTitle } ) {
            commit('UPDATE_LIST_TITLE', { listId, newTitle } )
            return Promise.resolve()
        },
        addListItem({ commit }, payload) {
            commit('ADD_LIST_ITEM', { listId: payload.listId, item: { id: uuidv4(), title: payload.itemTitle } })
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
        },
        boardListsCount: (state, getters) => (id) => {
            return getters.boardOfId(id).lists.length
        },
        archivedBoardLists: (state, getters) => (boardId) => {
            return getters.boardOfId(boardId).archivedLists
        },
        selectedBoard: (state, getters) => {
            return getters.boardOfId(state.selectedBoardId)
        },
        boardHavingListOfId: (state) => (listId) => {
            return state.boards.find(b => b.lists.find(l => l.id === listId))
        },
        listIndexByListId: (state, getters) => (listId) => {
            return getters.boardHavingListOfId(listId).lists.indexOf(getters.listOfId(listId))
        }
    }
}

export default boards
