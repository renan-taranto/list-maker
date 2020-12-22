import Vue from 'vue'
import Vuex from 'vuex'
import boards from './boards'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        boards
    }
})

export default store
