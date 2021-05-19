import store from '@/store'

export default {
  eventType: 'board-created',
  handle (eventPayload) {
    if (!store.getters['boards/boardOfId'](eventPayload.id)) {
      store.commit('boards/ADD_BOARD', {
        id: eventPayload.id,
        title: eventPayload.title,
        open: true,
        lists: [],
        archivedLists: [],
        loading: true
      })
    }

    store.dispatch('boards/finishLoadingBoard', eventPayload.id)
  }
}
