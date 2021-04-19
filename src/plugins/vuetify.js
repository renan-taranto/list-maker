import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#DA274F',
        secondary: '#B51E48'
      }
    },
    options: { customProperties: true }
  }
})
