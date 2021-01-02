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

const userMessagesQuery = (id) => {
  return qs.stringify({
    _where: { _or: [{ receiver: { _id: id } }, { sender: { _id: id } }] }
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
  employees: {
    getEmployees: () => axios.get(`${baseUrl}/users?role.type=employee`, config()),
    addEmployee: (employeeObj) => axios.post(`${baseUrl}/auth/local/register`, employeeObj)
  },
  clients: {
    getClients: () => axios.get(`${baseUrl}/users?role.type=business_client`, config())
  },
  bookings: {
    getBooking: (bookingId) => axios.get(`${baseUrl}/bookings/${bookingId}`, config()),
    getPending: () => axios.get(`${baseUrl}/bookings?status=pending`, config()),
    getApproved: () => axios.get(`${baseUrl}/bookings?status_ne=pending`, config()),
    getBookingsForDate: (dayStart, dayEnd) =>
      axios.get(`${baseUrl}/bookings?status_ne=pending&${dayQuery(dayStart, dayEnd)}`, config())
  },
  messages: {
    postMessage: (message) => axios.post(`${baseUrl}/messages`, message, config()),
    getUserMessages: (userId) =>
      axios.get(`${baseUrl}/messages?${userMessagesQuery(userId)}`, config())
  },
  stopwatches: {
    getStopwatches: (employeeId, fromDate, toDate) =>
      axios.get(`${baseUrl}/stopwatches?employee._id=${employeeId}&${stopwatchesQuery(fromDate, toDate)}`, config())
  }
}
