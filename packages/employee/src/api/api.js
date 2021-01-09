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
    _where: { _or: [[{ receiver: { _id: id } },  { sender: { _id: employerId } }], [{ receiver: { _id: employerId } }, { sender: { _id: id } }]] }
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
    getBookingsByUser: (userId) => axios.get(`${baseUrl}/bookings?assignedEmployees._id=${userId}`, config()),
    getBookingsForDate: (userId, dayStart, dayEnd) =>
      axios.get(`${baseUrl}/bookings?assignedEmployees._id=${userId}&${dayQuery(dayStart, dayEnd)}`, config()),
  },
  guides: {
    getGuides: () => axios.get(`${baseUrl}/guides`, config())
  },

  // Edit *Bookings* Api to fit Employee
  /*bookings: {
    getBooking: (bookingId) => axios.get(`${baseUrl}/bookings/${bookingId}`, config()),
  },
  // Edit *stopwatches* Api to fit Employee
  stopwatches: {
    getStopwatches: (employeeId, fromDate, toDate) =>
      axios.get(`${baseUrl}/stopwatches?employee._id=${employeeId}&${stopwatchesQuery(fromDate, toDate)}`, config())
  },

  // Notifications to be added*/
}