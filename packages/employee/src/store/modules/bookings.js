import api from '../../api/api'

const state = () => ({
  bookings: null,
  bookingsCalendarEvents: null,
  bookingsForDate: null,
  selectedBooking: null
})

const getters = {
  bookings: (store) => store.bookings,
  bookingsCalendarEvents: (store) => store.bookingsCalendarEvents,
  bookingsForDate: (store) => store.bookingsForDate,
  selectedBooking: (store) => store.selectedBooking
}

const actions = {
  getBookingsForDate({ commit }, { userId, dayStart, dayEnd }) {
    return new Promise((resolve, reject) => {
      ;(async () => {
        try {
          const { data } = await api.bookings.getBookingsForDate(userId, dayStart, dayEnd)
          commit('updateBookingsForDate', data)
          resolve()
        } catch (err) {
          reject(err)
        }
      })()
    })
  },
  getBookingsByUser({ commit }, userId) {
    return new Promise((resolve, reject) => {
      ;(async () => {
        try {
          const { data } = await api.bookings.getBookingsByUser(userId)
          commit('updateBookings', data)
          commit('updateBookingsCalendarEvents', data)
          resolve()
        } catch (err) {
          reject(err)
        }
      })()
    })
  },
  getSelectedBooking({ commit }, bookingId) {
    return new Promise((resolve, reject) => {
      ;(async () => {
        try {
          const { data } = await api.bookings.getBooking(bookingId)
          commit('updateSelectedBooking', data)
          resolve()
        } catch (err) {
          reject(err)
        }
      })()
    })
  },
}

const mutations = {
  updateBookings(state, payload) {
    state.bookings = payload
  },
  updateBookingsCalendarEvents(state, payload) {
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
    state.bookingsCalendarEvents = startDates.concat(endDates)
  },
  updateBookingsForDate(state, payload) {
    state.bookingsForDate = payload
  },
  updateSelectedBooking(state, payload) {
    state.selectedBooking = payload
  },
  clearSelectedBooking(state) {
    state.selectedBooking = null
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
