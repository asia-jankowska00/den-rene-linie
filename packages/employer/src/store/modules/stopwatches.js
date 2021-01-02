import api from '../../api/api'

const state = () => ({
  stopwatches: null
})

const getters = {
  stopwatches: (store) => store.stopwatches
}

const actions = {
  getStopwatches({ commit }, { employeeId, fromDate, toDate }) {
    return new Promise((resolve, reject) => {
      ;(async () => {
        try {
          const { data } = await api.stopwatches.getStopwatches(employeeId, fromDate, toDate)
          commit('updateStopwatches', data)
          resolve()
        } catch (err) {
          reject(err)
        }
      })()
    })
  }
}

const mutations = {
  updateStopwatches(state, payload) {
    state.stopwatches = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
