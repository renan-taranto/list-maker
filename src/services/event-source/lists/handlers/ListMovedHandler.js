import store from '@/store'

export default {
  eventType: 'list-moved',
  handle (eventPayload) {
    const selectedBoardId = store.getters['boards/selectedBoard'].id
    if (eventPayload.fromBoardId !== selectedBoardId && eventPayload.toBoardId !== selectedBoardId) {
      return
    }

    if (eventPayload.fromBoardId === eventPayload.toBoardId) {
      store.dispatch('boards/loadBoardOfId', selectedBoardId)
      return
    }

    store.dispatch('boards/loadBoardOfId', eventPayload.fromBoardId)
    store.dispatch('boards/loadBoardOfId', eventPayload.toBoardId)
  }
}
