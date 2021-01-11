import api from '../../api/api'

const state = () => ({
  newTasks: []
})

const getters = {
  newTasks: (store) => store.newTasks
}

const actions = {
  /* eslint-disable no-unused-vars */
  updateTask({ commit }, { taskId, data }) {
    return new Promise((resolve, reject) => {
      ;(async () => {
        try {
          await api.tasks.updateTask(taskId, data)
          resolve()
        } catch (err) {
          reject(err)
        }
      })()
    })
  }
}

const mutations = {
  updateNewTasks(state, payload) {
    state.newTasks = [...state.newTasks, payload]
  },
  clearNewTasks(state) {
    state.newTasks = []
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
