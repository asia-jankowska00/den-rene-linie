import api from '../../api/api'

const state = () => ({
  services: null,
  selectedService: null
})

const getters = {
  services: (store) => store.services,
  selectedService: (store) => store.selectedService
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
  },
}


const mutations = {
  updateServices(state, payload) {
    state.services = payload
  },
  updateSelectedService(state, payload) {
    state.selectedService = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}