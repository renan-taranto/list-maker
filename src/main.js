import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import VueDragscroll from 'vue-dragscroll'

import './styles/app.css'

Vue.config.productionTip = false
Vue.use(VueDragscroll)

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
