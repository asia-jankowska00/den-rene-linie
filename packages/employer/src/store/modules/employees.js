import api from '../../api/api'

const state = () => ({
  employees: [],
  activeEmployees: [],
  inactiveEmployees: []
})

/* eslint-disable no-unused-vars */
const getters = {
  employees: (store) => store.employees,
  activeEmployees: (store) => store.activeEmployees,
  inactiveEmployees: (store) => store.inactiveEmployees
}

const actions = {
  getEmployees({ commit }) {
    return new Promise((resolve, reject) => {
      ;(async () => {
        try {
          const { data } = await api.employees.getEmployees()
          commit('updateEmployees', data)
          commit('updateActiveEmployees', data)
          commit('updateInactiveEmployees', data)
          resolve()
        } catch (err) {
          reject(err)
        }
      })()
    })
  },
  /* eslint-disable no-unused-vars */
  addEmployee({ commit }, employeeObj) {
    return new Promise((resolve, reject) => {
      ;(async () => {
        try {
          await api.employees.addEmployee(employeeObj)
          resolve()
        } catch (err) {
          console.log(err.response.data.message)
          reject(err)
        }
      })()
    })
  }
}

const mutations = {
  updateEmployees(state, payload) {
    state.employees = payload
  },
  updateActiveEmployees(state, employees) {
    let active
    if (employees.length > 0) {
      active = employees.filter((employee) =>   employee.bookings       
    )
    } else {
      active = employees.bookings ? employees : null
    }
    console.log(active)
    state.activeEmployees = active
  },
  updateInactiveEmployees(state, employees) {
    let inactive
    if (employees.length > 0) {
      inactive = employees.filter((employee) => !employee.bookings)
    } else {
      inactive = !employees.bookings ? employees : null
    }
    console.log(inactive)
    state.inactiveEmployees = inactive
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
