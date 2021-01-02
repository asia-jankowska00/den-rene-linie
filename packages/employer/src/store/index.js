import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user.js'
import bookings from './modules/bookings.js'
import employees from './modules/employees.js'
import clients from './modules/clients.js'
import messages from './modules/messages.js'
import stopwatches from './modules/stopwatches.js'
import services from './modules/services.js'
import guides from './modules/guides.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    bookings,
    employees,
    clients,
    messages,
    stopwatches,
    services,
    guides
  }
})
