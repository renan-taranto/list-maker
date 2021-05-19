import Api from '@/services/api'

export default {
  async getBoardsOverview () {
    const response = await Api().get('/boards')
    return response.data
  },
  async findById (id) {
    const response = await Api().get(`/boards/${id}`)
    return response.data
  },
  create (id, title) {
    return Api().post('/boards', {
      id,
      title
    })
  },
  changeTitle (id, title) {
    return Api().post(`/boards/${id}/change-title`, {
      title
    })
  },
  close (id) {
    return Api().post(`/boards/${id}/close`)
  },
  reopen (id) {
    return Api().post(`/boards/${id}/reopen`)
  }
}
