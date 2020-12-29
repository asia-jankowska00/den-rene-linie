import api from '../../api/api'

const state = () => ({
  user: null
})

const getters = {
  user: (store) => store.user
}

const actions = {
  login({ commit }, payload) {
    return new Promise((resolve, reject) => {
      ;(async () => {
        try {
          const res = await api.auth.login(payload)
          window.localStorage.setItem('drl_token', res.data.jwt)
          commit('updateUser', res.data.user)
          resolve()
        } catch (err) {
          console.log(err)
          reject(err)
        }
      })()
    })
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      ;(async () => {
        try {
          window.localStorage.removeItem('drl_token')
          commit('clearUser')
          resolve()
        } catch (err) {
          console.log(err)
          reject(err)
        }
      })()
    })
  },
  getProfile({ commit }) {
    return new Promise((resolve, reject) => {
      ;(async () => {
        try {
          const { data } = await api.users.getProfile()
          commit('updateUser', data)
          resolve()
        } catch (err) {
          reject(err)
        }
      })()
    })
  }
}

const mutations = {
  updateUser(state, payload) {
    state.user = payload
  },
  clearUser: (state) => (state.user = null)
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
