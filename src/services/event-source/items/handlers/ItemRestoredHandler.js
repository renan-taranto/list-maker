import store from '@/store'

export default {
  eventType: 'item-restored',
  handle (eventPayload) {
    if (!store.getters['boards/selectedBoardHasItem'](eventPayload.id)) {
      store.commit('boards/RESTORE_ITEM', eventPayload.id)
    }
  }
}
