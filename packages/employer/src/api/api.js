import axios from 'axios'

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

export default {
  auth: {
    login: (userObj) => axios.post(`${baseUrl}/auth/local`, userObj)
  },
  users: {
    getProfile: () => axios.get(`${baseUrl}/users/me`, config())
  }
}
