import { v4 as uuidv4 } from 'uuid'
import BoardService from '@/services/api/BoardService'
import ListService from '@/services/api/ListService'
import ItemService from '@/services/api/ItemService'

const boards = {
  namespaced: true,
  state: () => ({
    boards: [],
    selectedBoardId: null,
    selectedItemId: null
  }),
  mutations: {
    SET_BOARDS (state, boards) {
      state.boards = boards
    },
    SET_BOARD (state, board) {
      const boardIndex = state.boards.findIndex(b => b.id === board.id)
      state.boards.splice(boardIndex, 1, board)
    },
    ADD_BOARD (state, board) {
      state.boards.push(board)
    },
    FINISH_LOADING_BOARD (state, boardId) {
      state.boards.find(b => b.id === boardId).loading = false
    },
    CLOSE_BOARD (state, boardId) {
      state.boards.find(b => b.id === boardId).open = false
    },
    REOPEN_BOARD (state, boardId) {
      state.boards.find(b => b.id === boardId).open = true
    },
    SELECT_BOARD (state, boardId) {
      state.selectedBoardId = boardId
    },
    CHANGE_BOARD_TITLE (state, { boardId, newTitle }) {
      state.boards.find(b => b.id === boardId).title = newTitle
    },
    ADD_LIST (state, { id, title, boardId, index }) {
      const board = state.boards.find(b => b.id === boardId)
      if (
        board.lists &&
        board.lists.find(l => l.id === id) === undefined
      ) {
        board.lists.splice(
          index ?? board.lists.length,
          0,
          { id: id, title: title, items: [], archivedItems: [] }
        )
      }
    },
    ARCHIVE_LIST (state, listId) {
      const board = state.boards.find(b => b.lists && b.lists.find(l => l.id === listId))
      if (board) {
        const listIndex = board.lists.findIndex(list => list.id === listId)
        board.archivedLists.push(board.lists.splice(listIndex, 1)[0])
      }
    },
    RESTORE_LIST (state, listId) {
      const board = state.boards.find(b => b.archivedLists && b.archivedLists.find(l => l.id === listId))
      if (board) {
        const listIndex = board.archivedLists.findIndex(list => list.id === listId)
        board.lists.push(board.archivedLists.splice(listIndex, 1)[0])
      }
    },
    MOVE_LIST (state, { listId, targetBoardId, targetIndex }) {
      const currentListBoard = state.boards.find(b => b.lists && b.lists.find(l => l.id === listId))
      if (!currentListBoard) {
        return
      }

      const currentListIndex = currentListBoard.lists.findIndex(list => list.id === listId)
      if (currentListIndex < 0) {
        return
      }

      const list = currentListBoard.lists.splice(currentListIndex, 1)[0]
      const targetBoard = state.boards.find(b => b.id === targetBoardId)
      if (targetBoard && targetBoard.lists) {
        targetBoard.lists.splice(targetIndex, 0, list)
      }
    },
    UPDATE_LIST_TITLE (state, { listId, newTitle }) {
      const list = state.boards.reduce((lists, board) => lists.concat(board.lists), [])
        .filter((list) => list != null)
        .find(list => list.id === listId)
      list.title = newTitle
    },
    ADD_ITEM (state, { listId, item, index }) {
      const list = state.boards.reduce((lists, board) => lists.concat(board.lists), [])
        .find(list => list && list.id === listId)
      if (!list || list.items.find(i => i.id === item.id)) {
        return
      }

      list.items.splice(index ?? list.items.length, 0, item)
    },
    ADD_ARCHIVED_ITEM_TO_OPEN_LIST (state, { listId, item, index }) {
      const list = state.boards.reduce((lists, board) => lists.concat(board.lists), [])
        .find(list => list && list.id === listId)
      if (!list || list.archivedItems.find(i => i.id === item.id)) {
        return
      }

      list.archivedItems.splice(index ?? list.archivedItems.length, 0, item)
    },
    SELECT_ITEM (state, itemId) {
      state.selectedItemId = itemId
    },
    UPDATE_ITEM_TITLE (state, { itemId, newTitle }) {
      const item = state.boards.reduce((lists, board) => lists.concat(board.lists), [])
        .filter((list) => list != null)
        .reduce((items, list) => items.concat(list.items), [])
        .find(i => i.id === itemId)
      if (item) {
        item.title = newTitle
      }
    },
    UPDATE_ITEM_DESCRIPTION (state, { itemId, newDescription }) {
      const item = state.boards.reduce((lists, board) => lists.concat(board.lists), [])
        .filter((list) => list != null)
        .reduce((items, list) => items.concat(list.items), [])
        .find(item => item.id === itemId)
      if (item) {
        item.description = newDescription
      }
    },
    ARCHIVE_ITEM (state, itemId) {
      const list = state.boards.reduce((lists, board) => lists.concat(board.lists), [])
        .filter((list) => list != null)
        .find(list => list.items.find(item => item.id === itemId))

      if (list) {
        const itemIndex = list.items.findIndex(item => item.id === itemId)
        list.archivedItems.push(list.items.splice(itemIndex, 1)[0])
      }
    },
    RESTORE_ITEM (state, itemId) {
      const allLists = state.boards.reduce((lists, board) => {
        if (board.lists) {
          lists = lists.concat(board.lists)
        }
        if (board.archivedLists) {
          lists = lists.concat(board.archivedLists)
        }

        return lists
      }, [])
      const list = allLists.find(l => l.archivedItems && l.archivedItems.find(item => item.id === itemId))

      if (list) {
        const itemIndex = list.archivedItems.findIndex(item => item.id === itemId)
        list.items.push(list.archivedItems.splice(itemIndex, 1)[0])
      }
    },
    MOVE_ITEM (state, { itemId, targetListId, targetIndex }) {
      const currentList = state.boards.reduce((lists, board) => lists.concat(board.lists), [])
        .filter((list) => list != null)
        .find(list => list.items.find(item => item.id === itemId))
      if (!currentList) {
        return
      }

      const currentItemIndex = currentList.items.findIndex(item => item.id === itemId)
      if (currentItemIndex < 0) {
        return
      }

      const targetList = state.boards.reduce((lists, board) => lists.concat(board.lists), [])
        .filter(list => list != null)
        .find(list => list.id === targetListId)

      if (
        targetList &&
        (currentList.id !== targetListId || currentItemIndex !== targetIndex)
      ) {
        targetList.items.splice(targetIndex, 0, currentList.items.splice(currentItemIndex, 1)[0])
      }
    }
  },
  actions: {
    async loadBoardsOverview ({ commit }) {
      const boards = await BoardService.getBoardsOverview()
      commit('SET_BOARDS', boards)
    },
    async loadBoardOfId ({ commit }, boardId) {
      const board = await BoardService.findById(boardId)
      commit('SET_BOARD', board)
    },
    async createBoard ({ commit }, title) {
      const boardId = uuidv4()
      await BoardService.create(boardId, title)
      commit('ADD_BOARD', { id: boardId, title: title, open: true, lists: [], archivedLists: [], loading: true })
    },
    async finishLoadingBoard ({ commit }, boardId) {
      commit('FINISH_LOADING_BOARD', boardId)
    },
    async closeBoard ({ commit }, boardId) {
      await BoardService.close(boardId)
      commit('CLOSE_BOARD', boardId)
    },
    async reopenBoard ({ commit }, boardId) {
      await BoardService.reopen(boardId)
      commit('REOPEN_BOARD', boardId)
    },
    changeBoardTitle ({ commit }, { boardId, newTitle }) {
      commit('CHANGE_BOARD_TITLE', { boardId, newTitle })
      BoardService.changeTitle(boardId, newTitle)
    },
    selectBoard ({ commit }, boardId) {
      commit('SELECT_BOARD', boardId)
    },
    createList ({ commit, getters }, { boardId, listTitle }) {
      const listId = uuidv4()
      commit('ADD_LIST', { id: listId, title: listTitle, boardId: boardId })
      ListService.create(listId, listTitle, boardId, getters.boardListsCount(boardId) - 1)
    },
    archiveList ({ commit }, listId) {
      commit('ARCHIVE_LIST', listId)
      ListService.archive(listId)
    },
    restoreList ({ commit }, listId) {
      commit('RESTORE_LIST', listId)
      ListService.restore(listId)
    },
    moveList ({ commit }, { listId, targetBoardId, targetIndex }) {
      commit('MOVE_LIST', { listId, targetBoardId, targetIndex })
      ListService.move(listId, targetBoardId, targetIndex)
    },
    updateListTitle ({ commit }, { listId, newTitle }) {
      commit('UPDATE_LIST_TITLE', { listId, newTitle })
      ListService.changeTitle(listId, newTitle)
    },
    addItem ({ commit, getters }, payload) {
      const itemId = uuidv4()
      commit('ADD_ITEM', { listId: payload.listId, item: { id: itemId, title: payload.itemTitle, description: null } })
      ItemService.add(itemId, payload.itemTitle, getters.listItemsCount(payload.listId) - 1, payload.listId)
    },
    selectItem ({ commit }, itemId) {
      commit('SELECT_ITEM', itemId)
    },
    updateItemTitle ({ commit }, { itemId, newTitle }) {
      commit('UPDATE_ITEM_TITLE', { itemId, newTitle })
      ItemService.changeTitle(itemId, newTitle)
    },
    updateItemDescription ({ commit }, { itemId, newDescription }) {
      commit('UPDATE_ITEM_DESCRIPTION', { itemId, newDescription })
      ItemService.changeDescription(itemId, newDescription)
    },
    archiveItem ({ commit }, itemId) {
      commit('ARCHIVE_ITEM', itemId)
      ItemService.archive(itemId)
    },
    restoreItem ({ commit }, itemId) {
      commit('RESTORE_ITEM', itemId)
      ItemService.restore(itemId)
    },
    moveItem ({ commit }, { itemId, targetListId, targetIndex }) {
      commit('MOVE_ITEM', { itemId, targetListId, targetIndex })
      ItemService.move(itemId, targetIndex, targetListId)
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
        .filter((l) => l != null)
        .find(list => list.id === id)
    },
    archivedListOfId: (state) => (id) => {
      return state.boards.reduce((archivedLists, board) => archivedLists.concat(board.archivedLists), [])
        .filter((l) => l != null)
        .find(archivedList => archivedList.id === id)
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
      const board = state.boards.find(b => b.lists && b.lists.find(l => l.id === listId))
      return board.lists.indexOf(getters.listOfId(listId))
    },
    selectedItem: (state) => {
      if (!state.selectedItemId) {
        return null
      }

      const item = state.boards.reduce((lists, board) => lists.concat(board.lists), [])
        .filter((list) => list != null)
        .reduce((items, list) => items.concat(list.items), [])
        .find(item => item.id === state.selectedItemId)
      return item || null
    },
    archivedBoardItems: (state, getters) => (boardId) => {
      return getters.allListsFromBoard(boardId).reduce((archivedItems, list) => archivedItems.concat(list.archivedItems), [])
    },
    openItemsFromBoard: (state, getters) => (boardId) => {
      return getters.openListsFromBoard(boardId).reduce((items, list) => items.concat(list.items), [])
    },
    selectedBoardHasItem: (state, getters) => (itemId) => {
      return getters.openItemsFromBoard(state.selectedBoardId).find(item => item.id === itemId) !== undefined
    },
    listItemsCount: (state, getters) => (listId) => {
      return getters.listOfId(listId).items.length
    },
    selectedItemList: (state, getters) => {
      if (state.selectedItemId === null) {
        return null
      }

      return getters.openBoards.reduce((lists, board) => lists.concat(board.lists), [])
        .filter((list) => list != null)
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
