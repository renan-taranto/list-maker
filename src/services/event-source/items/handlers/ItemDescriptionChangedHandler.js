import store from '@/store'

export default {
  eventType: 'item-description-changed',
  handle (eventPayload) {
    store.commit('boards/UPDATE_ITEM_DESCRIPTION', {
      itemId: eventPayload.id,
      newDescription: eventPayload.description
    })
  }
}
