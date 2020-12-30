import api from '../../api/api'

const state = () => ({
  clients: null
})

const getters = {
  clients: (store) => store.clients
}

const actions = {
  getClients({ commit }) {
    return new Promise((resolve, reject) => {
      ;(async () => {
        try {
          const { data } = await api.clients.getClients()
          commit('updateClients', data)
          resolve()
        } catch (err) {
          reject(err)
        }
      })()
    })
  }
}


const mutations = {
  updateClients(state, payload) {
    state.clients = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}