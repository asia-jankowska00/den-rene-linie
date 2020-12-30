import api from '../../api/api'

const state = () => ({
  employees: null
})

const getters = {
  employees: (store) => store.employees
}

const actions = {
  getEmployees({ commit }) {
    return new Promise((resolve, reject) => {
      ;(async () => {
        try {
          const { data } = await api.employees.getEmployees()
          commit('updateEmployees', data)
          resolve()
        } catch (err) {
          reject(err)
        }
      })()
    })
  }
}


const mutations = {
  updateEmployees(state, payload) {
    state.employees = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}