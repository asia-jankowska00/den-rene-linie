import api from '../../api/api'

const state = () => ({
  bookings: null,
  bookingsPending: null,
  bookingsApproved: null,
  bookingsApprovedCalendarEvents: null,
  bookingsForDate: null
})

const getters = {
  bookingsApproved: (store) => store.bookingsApproved,
  bookingsApprovedCalendarEvents: (store) => store.bookingsApprovedCalendarEvents,
  bookingsPending: (store) => store.bookingsPending,
  bookingsForDate: (store) => store.bookingsForDate
}

const actions = {
  getBookingsApproved({ commit }) {
    return new Promise((resolve, reject) => {
      ;(async () => {
        try {
          const { data } = await api.bookings.getApproved()
          commit('updateBookingsApproved', data)
          commit('updatebookingsApprovedCalendarEvents', data)
          resolve()
        } catch (err) {
          reject(err)
        }
      })()
    })
  },
  getBookingsPending({ commit }) {
    return new Promise((resolve, reject) => {
      ;(async () => {
        try {
          const { data } = await api.bookings.getPending()
          commit('updateBookingsPending', data)
          resolve()
        } catch (err) {
          reject(err)
        }
      })()
    })
  },
  getBookingsForDate({ commit }, { dayStart, dayEnd }) {
    return new Promise((resolve, reject) => {
      ;(async () => {
        try {
          const { data } = await api.bookings.getBookingsForDate(dayStart, dayEnd)
          commit('updateBookingsForDate', data)
          resolve()
        } catch (err) {
          reject(err)
        }
      })()
    })
  }
}

const mutations = {
  updateBookingsApproved(state, payload) {
    state.bookingsApproved = payload
  },
  updatebookingsApprovedCalendarEvents(state, payload) {
    const startDates = payload.map((booking) => {
      return {
        date: new Date(booking.startDate)
      }
    })
    const endDates = payload.map((booking) => {
      return {
        date: new Date(booking.endDate)
      }
    })
    state.bookingsApprovedCalendarEvents = startDates.concat(endDates)
  },
  updateBookingsPending(state, payload) {
    state.bookingsPending = payload
  },
  updateBookingsForDate(state, payload) {
    state.bookingsForDate = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
