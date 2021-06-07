import store from '@/store'

export default {
  eventType: 'list-created',
  handle (eventPayload) {
    if (!store.getters['boards/listOfId'](eventPayload.id)) {
      store.commit('boards/ADD_LIST', {
        id: eventPayload.id,
        title: eventPayload.title,
        boardId: eventPayload.boardId
      })
    }
  }
}
