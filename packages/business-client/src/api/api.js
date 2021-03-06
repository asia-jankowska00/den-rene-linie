import axios from 'axios'
import qs from 'qs'

const baseUrl = process.env.VUE_APP_API_URL || 'http://localhost:1337'

axios.defaults.headers.common['Content-Type'] = 'application/json-patch+json'

const config = () => {
  const token = localStorage.getItem('drl_token')
  return {
    headers: {
      Authorization: 'Bearer ' + token
    }
  }
}

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
    login: (userObj) => axios.post(`${baseUrl}/auth/local`, userObj),
    register: (userObj) => axios.post(`${baseUrl}/auth/local/register`, userObj),
  },
  users: {
    getProfile: () => axios.get(`${baseUrl}/users/me`, config()),
    getUser: (userId) => axios.get(`${baseUrl}/users/${userId}`, config())
  },
  bookings: {
    getBooking: (bookingId) => axios.get(`${baseUrl}/bookings/${bookingId}`, config()),
    getBookingsByUser: (userId) => axios.get(`${baseUrl}/bookings?client._id=${userId}`, config()),
    getBookingsForDate: (userId, dayStart, dayEnd) =>
      axios.get(`${baseUrl}/bookings?client._id=${userId}&${dayQuery(dayStart, dayEnd)}`, config()),
    updateBooking: (bookingId, data) => axios.put(`${baseUrl}/bookings/${bookingId}`, data, config()),
    createBooking: (booking) => axios.post(`${baseUrl}/bookings`, booking, config())
  },
  messages: {
    postMessage: (message) => axios.post(`${baseUrl}/messages`, message, config()),
    getUserMessages: (userId) =>
      axios.get(`${baseUrl}/messages?${userMessagesQuery(userId)}`, config())
  },
  services: {
    getServices: () => axios.get(`${baseUrl}/services`, config())
  },
  tasks: {
    createTask: (task) => axios.post(`${baseUrl}/tasks`, task, config()),
  }
}
