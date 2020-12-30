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

export default {
  auth: {
    login: (userObj) => axios.post(`${baseUrl}/auth/local`, userObj)
  },
  users: {
    getProfile: () => axios.get(`${baseUrl}/users/me`, config())
  },
  employees: {
    getEmployees: () => axios.get(`${baseUrl}/users?role.type=employee`, config())
  },
  clients: {
    getClients: () => axios.get(`${baseUrl}/users?role.type=business_client`, config())
  },
  bookings: {
    getBooking: (id) => axios.get(`${baseUrl}/bookings/${id}`, config()),
    getPending: () => axios.get(`${baseUrl}/bookings?status=pending`, config()),
    getApproved: () => axios.get(`${baseUrl}/bookings?status_ne=pending`, config()),
    getBookingsForDate: (dayStart, dayEnd) =>
      axios.get(`${baseUrl}/bookings?status_ne=pending&${dayQuery(dayStart, dayEnd)}`, config())
  }
}
