import store from '@/store'

export default {
  eventType: 'list-archived',
  handle (eventPayload) {
    const list = store.getters['boards/listOfId'](eventPayload.id)
    if (list) {
      store.commit('boards/ARCHIVE_LIST', list.id)
    }
  }
}
