import api from '../../api/api'

const state = () => ({
  notifications: null
})

const getters = {
  notifications: (store) => store.notifications
}

const actions = {
  getUserNotifications({ commit }, userId) {
    return new Promise((resolve, reject) => {
      ;(async () => {
        try {
          const { data } = await api.notifications.getUserNotifications(userId)
          commit('updateNotifications', data)
          resolve()
        } catch (err) {
          reject(err)
        }
      })()
    })
  }
}

const mutations = {
  updateNotifications(state, payload) {
    state.notifications = payload
  },
  clearNotifications: (state) => (state.notifications = null)
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}