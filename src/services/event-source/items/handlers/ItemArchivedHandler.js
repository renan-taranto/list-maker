import store from '@/store'

export default {
  eventType: 'item-archived',
  handle (eventPayload) {
    store.commit('boards/ARCHIVE_ITEM', eventPayload.id)
  }
}
