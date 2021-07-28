import store from '@/store'

const selectedBoardContainsItem = (itemId) => {
  return store.getters['boards/openItemsFromBoard'](store.state.boards.selectedBoardId).find(item => item.id === itemId) !== undefined
}

const selectedBoardContainsList = (listId) => {
  return store.getters['boards/openListsFromBoard'](store.state.boards.selectedBoardId).find(list => list.id === listId) !== undefined
}

export default {
  eventType: 'item-moved',
  handle (eventPayload) {
    store.commit('boards/MOVE_ITEM', {
      itemId: eventPayload.id,
      targetListId: eventPayload.listId,
      targetIndex: eventPayload.position
    })

    if (!selectedBoardContainsItem(eventPayload.id) && selectedBoardContainsList(eventPayload.listId)) {
      store.commit('boards/ADD_ITEM', {
        listId: eventPayload.listId,
        item: {
          id: eventPayload.id,
          title: eventPayload.title,
          description: eventPayload.description
        },
        index: eventPayload.position
      })
    }
  }
}
