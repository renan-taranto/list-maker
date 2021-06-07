import store from '@/store'

export default {
  eventType: 'list-restored',
  handle (eventPayload) {
    const archivedList = store.getters['boards/archivedListOfId'](eventPayload.id)
    if (archivedList) {
      store.commit('boards/RESTORE_LIST', archivedList.id)
    }
  }
}
