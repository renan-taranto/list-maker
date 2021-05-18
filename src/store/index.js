import Vue from 'vue'
import Vuex from 'vuex'
import layout from '@/store/layout'
import boards from '@/store/boards'
import draggable from '@/store/draggable'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    layout,
    boards,
    draggable
  }
})

export default store
