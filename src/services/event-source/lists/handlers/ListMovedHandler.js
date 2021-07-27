import store from '@/store'

const selectedBoardContainsList = (listId) => {
  return store.getters['boards/openListsFromBoard'](store.state.boards.selectedBoardId).find(list => list.id === listId) !== undefined
}

export default {
  eventType: 'list-moved',
  handle (eventPayload) {
    store.commit('boards/MOVE_LIST', {
      listId: eventPayload.id,
      targetBoardId: eventPayload.boardId,
      targetIndex: eventPayload.position
    })

    if (!selectedBoardContainsList(eventPayload.id) && eventPayload.boardId === store.state.boards.selectedBoardId) {
      store.commit('boards/ADD_LIST', {
        id: eventPayload.id,
        title: eventPayload.title,
        boardId: eventPayload.boardId,
        index: eventPayload.position
      })

      eventPayload.items.forEach(item => {
        store.commit('boards/ADD_ITEM', {
          listId: eventPayload.id,
          item
        })
      })

      eventPayload.archivedItems.forEach(item => {
        store.commit('boards/ADD_ARCHIVED_ITEM_TO_OPEN_LIST', {
          listId: eventPayload.id,
          item
        })
      })
    }
  }
}
