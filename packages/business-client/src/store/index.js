import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import messages from './modules/messages.js'
import services from './modules/services.js'
import bookings from './modules/bookings.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    messages,
    services,
    bookings
  }
})
