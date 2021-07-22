import store from '@/store'

export default {
  eventType: 'item-title-changed',
  handle (eventPayload) {
    store.commit('boards/UPDATE_ITEM_TITLE', {
      itemId: eventPayload.id, newTitle: eventPayload.title
    })
  }
}
