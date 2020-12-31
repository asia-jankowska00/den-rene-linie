import api from '../../api/api'

const state = () => ({
  messages: null,
  currentUser: null
})

const getters = {
  messages: (store) => store.messages,
  currentUser: (store) => store.currentUser
}

const actions = {
  getUserMessages({ commit }, userId) {
    return new Promise((resolve, reject) => {
      ;(async () => {
        try {
          const { data } = await api.messages.getUserMessages(userId)
          commit('updateMessages', data)
          resolve()
        } catch (err) {
          reject(err)
        }
      })()
    })
  },
  postMessage({ commit }, message) {
    return new Promise((resolve, reject) => {
      ;(async () => {
        try {
          await api.messages.postMessage(message)
          const { data } = await api.messages.getUserMessages(message.receiver)
          commit('updateMessages', data)
          resolve()
        } catch (err) {
          reject(err)
        }
      })()
    })
  },
  getCurrentUser({ commit }, userId) {
    return new Promise((resolve, reject) => {
      ;(async () => {
        try {
          const { data } = await api.users.getUser(userId)
          commit('updateCurrentUser', data)
          resolve()
        } catch (err) {
          reject(err)
        }
      })()
    })
  }
}


const mutations = {
  updateMessages(state, payload) {
    state.messages = payload
  },
  updateCurrentUser(state, payload) {
    state.currentUser = payload
  },
  clearCurrentUser: (state) => (state.currentUser = null),
  clearMessages: (state) => (state.messages = null)
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}