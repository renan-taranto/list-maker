import store from '@/store'

export default {
  eventType: 'board-title-changed',
  handle (eventPayload) {
    const board = store.getters['boards/boardOfId'](eventPayload.id)
    if (board) {
      store.commit('boards/CHANGE_BOARD_TITLE', {
        boardId: eventPayload.id,
        newTitle: eventPayload.title
      })
    }
  }
}
