import api from '../../api/api'

const state = () => ({
  stopwatches: null,
  newStopwatch: null
})

const getters = {
  stopwatches: (store) => store.stopwatches,
  newStopwatch: (store) => store.newStopwatch
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
  },
  /* eslint-disable no-unused-vars */
  createStopwatch({ commit }, stopwatch) {
    return new Promise((resolve, reject) => {
      ;(async () => {
        try {
          const { data } = await api.stopwatches.createStopwatch(stopwatch)
          commit('updateNewStopwatch', data)
          resolve()
        } catch (err) {
          reject(err)
        }
      })()
    })
  },
  updateStopwatch({ commit }, { stopwatchId, data }) {
    return new Promise((resolve, reject) => {
      ;(async () => {
        try {
          await api.stopwatches.updateStopwatch(stopwatchId, data)
          // commit('updateStopwatches', data)
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
  },
  updateNewStopwatch(state, payload) {
    state.newStopwatch = payload
  },
  clearNewStopwatch(state) {
    state.newStopwatch = null
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
