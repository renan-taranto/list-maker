import store from '@/store'

export default {
  eventType: 'board-reopened',
  handle (eventPayload) {
    const board = store.getters['boards/boardOfId'](eventPayload.id)
    if (board && !board.open) {
      store.commit('boards/REOPEN_BOARD', eventPayload.id)
    }
  }
}
