import api from '../../api/api'

const state = () => ({
  services: null
})

const getters = {
  services: (store) => store.services
}

const actions = {
  getServices({ commit }) {
    return new Promise((resolve, reject) => {
      ;(async () => {
        try {
          const { data } = await api.services.getServices()
          commit('updateServices', data)
          resolve()
        } catch (err) {
          reject(err)
        }
      })()
    })
  }
}


const mutations = {
  updateServices(state, payload) {
    state.services = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}