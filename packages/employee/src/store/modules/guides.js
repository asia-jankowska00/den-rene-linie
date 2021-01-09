import api from '../../api/api'

const state = () => ({
  guides: null
})

const getters = {
  guides: (store) => store.guides
}

const actions = {
  getGuides({ commit }) {
    return new Promise((resolve, reject) => {
      ;(async () => {
        try {
          const { data } = await api.guides.getGuides()
          commit('updateGuides', data)
          resolve()
        } catch (err) {
          reject(err)
        }
      })()
    })
  }
}

const mutations = {
  updateGuides(state, payload) {
    state.guides = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
