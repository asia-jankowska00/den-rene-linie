import axios from 'axios'
import qs from 'qs'

const baseUrl = 'http://localhost:1337'

axios.defaults.headers.common['Content-Type'] = 'application/json-patch+json'

const config = () => {
  const token = localStorage.getItem('drl_token')
  return {
    headers: {
      Authorization: 'Bearer ' + token
    }
  }
}

// Add queries needed for the APIs
const dayQuery = (dayStart, dayEnd) => {
  return qs.stringify({
    _where: {
      _or: [
        [{ startDate_lte: dayEnd }, { startDate_gte: dayStart }],
        [{ endDate_lte: dayEnd }, { endDate_gte: dayStart }]
      ]
    }
  })
}

const employerId = '5feb3447214c2f2d14529e1b'

const userMessagesQuery = (id) => {
  return qs.stringify({
    _where: {
      _or: [
        [{ receiver: { _id: id } }, { sender: { _id: employerId } }],
        [{ receiver: { _id: employerId } }, { sender: { _id: id } }]
      ]
    }
  })
}

const stopwatchesQuery = (fromDate, toDate) => {
  return qs.stringify({
    _where: {
      _or: [
        [{ startDate_gte: fromDate }, { startDate_lte: toDate }],
        [{ endDate_gte: fromDate }, { endDate_lte: toDate }]
      ]
    }
  })
}

export default {
  auth: {
    login: (userObj) => axios.post(`${baseUrl}/auth/local`, userObj)
  },

  users: {
    getProfile: () => axios.get(`${baseUrl}/users/me`, config()),
    getUser: (userId) => axios.get(`${baseUrl}/users/${userId}`, config())
  },
  messages: {
    postMessage: (message) => axios.post(`${baseUrl}/messages`, message, config()),
    getUserMessages: (userId) =>
      axios.get(`${baseUrl}/messages?${userMessagesQuery(userId)}`, config())
  },
  bookings: {
    getBooking: (bookingId) => axios.get(`${baseUrl}/bookings/${bookingId}`, config()),
    getBookingsByUser: (userId) =>
      axios.get(`${baseUrl}/bookings?assignedEmployees._id=${userId}`, config()),
    getBookingsForDate: (userId, dayStart, dayEnd) =>
      axios.get(
        `${baseUrl}/bookings?assignedEmployees._id=${userId}&${dayQuery(dayStart, dayEnd)}`,
        config()
      )
  },
  guides: {
    getGuides: () => axios.get(`${baseUrl}/guides`, config())
  },
  stopwatches: {
    getStopwatches: (employeeId, fromDate, toDate) =>
      axios.get(
        `${baseUrl}/stopwatches?employee._id=${employeeId}&${stopwatchesQuery(fromDate, toDate)}`,
        config()
      ),
    createStopwatch: (stopwatch) => axios.post(`${baseUrl}/stopwatches`, stopwatch, config()),
    updateStopwatch: (stopwatchId, data) => axios.put(`${baseUrl}/stopwatches/${stopwatchId}`, data, config()),
  }
}
