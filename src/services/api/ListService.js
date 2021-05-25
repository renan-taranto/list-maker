import Api from '@/services/api'

export default {
  create (id, title, boardId, position) {
    return Api().post('/lists', {
      id,
      title,
      boardId,
      position
    })
  }
}
