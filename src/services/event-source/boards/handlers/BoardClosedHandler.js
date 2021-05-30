import store from '@/store'

export default {
  eventType: 'board-closed',
  handle (eventPayload) {
    const board = store.getters['boards/boardOfId'](eventPayload.id)
    if (board && board.open) {
      store.commit('boards/CLOSE_BOARD', eventPayload.id)
    }
  }
}
