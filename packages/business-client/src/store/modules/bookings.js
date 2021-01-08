import api from '../../api/api'

const state = () => ({
  bookings: null,
  bookingsCalendarEvents: null,
  bookingsForDate: null,
  currentBooking: null
})

const getters = {
  bookings: (store) => store.bookings,
  bookingsCalendarEvents: (store) => store.bookingsCalendarEvents,
  bookingsForDate: (store) => store.bookingsForDate,
  currentBooking: (store) => store.currentBooking
}

const actions = {
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
  /* eslint-disable no-unused-vars */
  updateBooking({ commit }, { bookingId, bookingData }) {
    return new Promise((resolve, reject) => {
      ;(async () => {
        try {
          await api.bookings.updateBooking(bookingId, bookingData)
          resolve()
        } catch (err) {
          reject(err)
        }
      })()
    })
  },
  createBooking({ commit }, booking ) {
    return new Promise((resolve, reject) => {
      ;(async () => {
        try {
          await api.bookings.createBooking(booking)
          resolve()
        } catch (err) {
          reject(err)
        }
      })()
    })
  }
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
  updateCurrentBooking(state, payload) {
    state.currentBooking = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
