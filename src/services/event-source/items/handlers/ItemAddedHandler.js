import store from '@/store'

export default {
  eventType: 'item-added',
  handle (eventPayload) {
    store.commit('boards/ADD_ITEM', {
      listId: eventPayload.listId,
      item: {
        id: eventPayload.id,
        title: eventPayload.title,
        description: null
      }
    })
  }
}
