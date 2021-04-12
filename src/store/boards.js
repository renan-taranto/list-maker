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
                    {
                        id: '0',
                        title: "To Do",
                        items: [
                            { id: '0', title: 'Task A', description: 'A Description' },
                            { id: '1', title: 'Task D', description: 'D Description' },
                            { id: '2', title: 'Task G', description: 'G Description' }
                        ],
                        archivedItems: []
                    },
                    {
                        id: '1',
                        title: "Doing",
                        items: [
                            { id: '3', title: 'Task B', description: 'B Description' },
                            { id: '4', title: 'Task C', description: 'C Description'},
                            { id: '5', title: 'Task F', description: 'F Description'}
                        ],
                        archivedItems: []
                    },
                    {
                        id: '2',
                        title: "Testing",
                        items: [
                            { id: '6', title: 'Task K', description: 'K Description' },
                            { id: '7', title: 'Task L', description: 'L Description' },
                            { id: '8', title: 'Task M', description: 'M Description' }
                        ],
                        archivedItems: []
                    },
                    {
                        id: '3',
                        title: "Waiting Deploy",
                        items: [
                            { id: '9', title: 'Task N', description: 'N Description' },
                            { id: '10', title: 'Task O', description: 'O Description' },
                            { id: '11', title: 'Task P', description: 'P Description'}
                        ],
                        archivedItems: []
                    },
                    {
                        id: '4',
                        title: "Done",
                        items: [
                            { id: '12', title: 'Task H', description: 'H Description' },
                            { id: '13', title: 'Task I', description: 'I Description' },
                            { id: '14', title: 'Task J', description: 'A Description' }
                        ],
                        archivedItems: []
                    }
                ],
                archivedLists: []
            },
            { id: '2', title: 'Sprint 1', open: true, lists: [], archivedLists: [] },
            { id: '3', title: 'Sprint 2', open: true, lists: [], archivedLists: [] },
            { id: '4', title: 'Sprint 3', open: true, lists: [], archivedLists: [] },
            { id: '5', title: 'Sprint 4', open: true, lists: [], archivedLists: [] },
            { id: '6', title: 'Sprint 5', open: false, lists: [], archivedLists: [] }
        ],
        selectedBoardId: null,
        selectedItemId: null
    }),
    mutations: {
        ADD_BOARD (state, board) {
            state.boards.push(board)
        },
        CLOSE_BOARD (state, id) {
            state.boards.find(b => b.id === id).open = false
        },
        REOPEN_BOARD (state, id) {
            state.boards.find(b => b.id === id).open = true
        },
        SELECT_BOARD (state, boardId) {
            state.selectedBoardId = boardId
        },
        UPDATE_BOARD_TITLE (state, { boardId, newTitle }) {
            state.boards.find(b => b.id === boardId).title = newTitle
        },
        ADD_LIST(state, { boardId, list }) {
            state.boards.find(b => b.id === boardId).lists.push(list)
        },
        ARCHIVE_LIST(state, listId) {
            const board = state.boards.find(b => b.lists.find(l => l.id === listId))
            const listIndex = board.lists.findIndex(list => list.id === listId)
            board.archivedLists.push(board.lists.splice(listIndex, 1)[0])
        },
        RESTORE_LIST(state, listId) {
            const board = state.boards.find(b => b.archivedLists.find(l => l.id === listId))
            const listIndex = board.archivedLists.findIndex(list => list.id === listId)
            board.lists.push(board.archivedLists.splice(listIndex, 1)[0])
        },
        MOVE_LIST(state, { listId, targetBoardId, targetIndex }) {
            const currentListBoard = state.boards.find(b => b.lists.find(l => l.id === listId))
            const currentListIndex = currentListBoard.lists.findIndex(list => list.id === listId)
            const list = currentListBoard.lists.splice(currentListIndex, 1)[0]

            state.boards.find(b => b.id === targetBoardId).lists.splice(targetIndex, 0, list)
        },
        UPDATE_LIST_TITLE(state, { listId, newTitle }) {
            const list = state.boards.reduce((lists, board) => lists.concat(board.lists), [])
                .find(list => list.id === listId)
            list.title = newTitle
        },
        ADD_ITEM(state, { listId, item }) {
            const list = state.boards.reduce((lists, board) => lists.concat(board.lists), [])
                .find(list => list.id === listId)
            list.items.push(item)
        },
        SELECT_ITEM(state, itemId) {
            state.selectedItemId = itemId
        },
        UPDATE_ITEM_TITLE(state, { itemId, newTitle }) {
            const item = state.boards.reduce((lists, board) => lists.concat(board.lists), [])
                .reduce((items, list) => items.concat(list.items), [])
                .find(i => i.id === itemId)
            if (item) {
                item.title = newTitle
            }
        },
        UPDATE_ITEM_DESCRIPTION(state, { itemId, newDescription }) {
            const item = state.boards.reduce((lists, board) => lists.concat(board.lists), [])
                .reduce((items, list) => items.concat(list.items), [])
                .find(item => item.id === itemId)
            if (item) {
                item.description = newDescription
            }
        },
        ARCHIVE_ITEM(state, itemId) {
            const list = state.boards.reduce((lists, board) => lists.concat(board.lists), [])
                .find(l => l.items.find(item => item.id === itemId))
            const itemIndex = list.items.findIndex(item => item.id === itemId)
            list.archivedItems.push(list.items.splice(itemIndex, 1)[0])
        },
        RESTORE_ITEM(state, itemId) {
            const list = state.boards.reduce((lists, board) => lists.concat([...board.lists, ...board.archivedLists]), [])
                .find(l => l.archivedItems.find(item => item.id === itemId))
            const itemIndex = list.archivedItems.findIndex(item => item.id === itemId)
            list.items.push(list.archivedItems.splice(itemIndex, 1)[0])
        },
        MOVE_ITEM(state, { itemId, targetListId, targetIndex }) {
            const currentList = state.boards.reduce((lists, board) => lists.concat(board.lists), [])
                .find(list => list.items.find(item => item.id === itemId))
            const currentItemIndex = currentList.items.findIndex(item => item.id === itemId)
            const targetList = state.boards.reduce((lists, board) => lists.concat(board.lists), [])
                .find(list => list.id === targetListId)

            targetList.items.splice(targetIndex, 0, currentList.items.splice(currentItemIndex, 1)[0])
        }
    },
    actions: {
        addBoard ({ commit }, title) {
            commit('ADD_BOARD', { id: uuidv4(), title: title, open: true, lists: [], archivedLists: [] })
            return Promise.resolve()
        },
        closeBoard ({ commit }, id) {
            commit('CLOSE_BOARD', id)
            return Promise.resolve()
        },
        reopenBoard ({ commit }, id) {
            commit('REOPEN_BOARD', id)
        },
        selectBoard({ commit }, boardId) {
            commit('SELECT_BOARD', boardId)
        },
        updateBoardTitle({ commit }, { boardId, newTitle }) {
            commit('UPDATE_BOARD_TITLE', { boardId, newTitle })
        },
        addList ({ commit }, { boardId, listTitle }) {
            commit('ADD_LIST', { boardId: boardId, list: { id: uuidv4(), title: listTitle, items: [], archivedItems: [] } })
            return Promise.resolve()
        },
        archiveList({ commit }, listId) {
            commit('ARCHIVE_LIST', listId)
        },
        restoreList({ commit }, listId) {
            commit('RESTORE_LIST', listId)
        },
        moveList({ commit }, { listId, targetBoardId, targetIndex }) {
            commit('MOVE_LIST', { listId, targetBoardId, targetIndex })
        },
        updateListTitle({ commit }, { listId, newTitle }) {
            commit('UPDATE_LIST_TITLE', { listId, newTitle })
            return Promise.resolve()
        },
        addItem({ commit }, payload) {
            commit('ADD_ITEM', { listId: payload.listId, item: { id: uuidv4(), title: payload.itemTitle, description: null } })
            return Promise.resolve()
        },
        selectItem({ commit }, itemId) {
            commit('SELECT_ITEM', itemId)
        },
        updateItemTitle({ commit }, { itemId, newTitle }) {
            commit('UPDATE_ITEM_TITLE', { itemId, newTitle })
        },
        updateItemDescription({ commit }, { itemId, newDescription }) {
            commit('UPDATE_ITEM_DESCRIPTION', { itemId, newDescription })
        },
        archiveItem({ commit }, itemId) {
            commit('ARCHIVE_ITEM', itemId)
        },
        restoreItem({ commit }, itemId) {
            commit('RESTORE_ITEM', itemId)
        },
        moveItem({ commit }, { itemId, targetListId, targetIndex }) {
            commit('MOVE_ITEM', { itemId, targetListId, targetIndex })
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
        boardListsCount: (state, getters) => (id) => {
            return getters.boardOfId(id).lists.length
        },
        selectedBoard: (state, getters) => {
            return getters.boardOfId(state.selectedBoardId)
        },
        listOfId: (state) => (id) => {
            return state.boards.reduce((lists, board) => lists.concat(board.lists), [])
                .find(list => list.id === id)
        },
        allListsFromBoard: (state, getters) => (boardId) => {
            const board = getters.boardOfId(boardId)
            return [...board.lists, ...board.archivedLists]
        },
        openListsFromBoard: (state, getters) => (boardId) => {
            return getters.boardOfId(boardId).lists
        },
        archivedBoardLists: (state, getters) => (boardId) => {
            return getters.boardOfId(boardId).archivedLists
        },
        listIndexByListId: (state, getters) => (listId) => {
            const board = state.boards.find(b => b.lists.find(l => l.id === listId))
            return board.lists.indexOf(getters.listOfId(listId))
        },
        selectedItem: (state) => {
            const item = state.boards.reduce((lists, board) => lists.concat(board.lists), [])
                .reduce((items, list) => items.concat(list.items), [])
                .find(item => item.id === state.selectedItemId)
            return item || null
        },
        archivedBoardItems: (state, getters) => (boardId) => {
            return getters.allListsFromBoard(boardId).reduce((archivedItems, list) => archivedItems.concat(list.archivedItems), [])
        },
        listItemsCount: (state, getters) => (listId) => {
            return getters.listOfId(listId).items.length
        },
        selectedItemList: (state, getters) => {
            if (state.selectedItemId === null) {
                return null
            }

            return getters.openBoards.reduce((lists, board) => lists.concat(board.lists), [])
                .find(list => list.items.find(item => item.id === state.selectedItemId))
        },
        selectedItemIndex: (state, getters) => {
            if (state.selectedItemId === null) {
                return null
            }

            return getters.selectedItemList.items.findIndex(item => item.id === state.selectedItemId)
        }
    }
}

export default boards
