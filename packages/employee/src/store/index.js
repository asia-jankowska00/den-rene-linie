import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user.js'
import bookings from './modules/bookings.js'
import guides from './modules/guides.js'
import messages from './modules/messages.js'
import stopwatches from './modules/stopwatches.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    bookings,
    guides,
    messages,
    stopwatches
  }
})
