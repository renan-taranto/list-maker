import Vue from 'vue'
import Vuex from 'vuex'
import app from '@/store/app'
import boards from '@/store/boards'
import draggable from '@/store/draggable'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    boards,
    draggable
  }
})

export default store
