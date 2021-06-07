import store from '@/store'

export default {
  eventType: 'list-title-changed',
  handle (eventPayload) {
    const list = store.getters['boards/listOfId'](eventPayload.id)
    if (list) {
      store.commit('boards/UPDATE_LIST_TITLE', {
        listId: eventPayload.id,
        newTitle: eventPayload.title
      })
    }
  }
}
