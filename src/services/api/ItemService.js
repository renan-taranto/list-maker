import Api from '@/services/api'

export default {
  add (id, title, position, listId) {
    return Api().post('/items', {
      id,
      title,
      position,
      listId
    })
  },
  archive (id) {
    return Api().post(`/items/${id}/archive`)
  },
  restore (id) {
    return Api().post(`/items/${id}/restore`)
  },
  changeDescription (id, description) {
    return Api().post(`/items/${id}/change-description`, { description })
  },
  changeTitle (id, title) {
    return Api().post(`/items/${id}/change-title`, { title })
  },
  move (id, position, listId) {
    return Api().post(`/items/${id}/move`, {
      position,
      listId
    })
  }
}
