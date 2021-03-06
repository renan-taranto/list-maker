import Api from '@/services/api'

export default {
  create (id, title, boardId, position) {
    return Api().post('/lists', {
      id,
      title,
      boardId,
      position
    })
  },
  move (id, boardId, position) {
    return Api().post(`/lists/${id}/move`, {
      boardId,
      position
    })
  },
  archive (id) {
    return Api().post(`/lists/${id}/archive`)
  },
  restore (id) {
    return Api().post(`/lists/${id}/restore`)
  },
  changeTitle (id, title) {
    return Api().post(`/lists/${id}/change-title`, { title })
  }
}
