import Vue from 'vue'
import VueRouter from 'vue-router'
import RouterView from '../views/RouterView.vue'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import EmployeeList from '../views/Employees/EmployeeList.vue'
import AddAccount from '../views/Employees/AddAccount.vue'
import Guides from '../views/Employees/Guides.vue'
import Timesheets from '../views/Employees/Timesheets.vue'
import Pending from '../views/Bookings/Pending.vue'
import Approved from '../views/Bookings/Approved.vue'
import Booking from '../views/Bookings/Booking.vue'
import ClientList from '../views/Clients/ClientList.vue'
import ChatEmployees from '../views/Chat/ChatEmployees.vue'
import ChatClients from '../views/Chat/ChatClients.vue'
import Services from '../views/Services.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    alias: '/login',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    children: [
      {
        path: 'bookings',
        name: 'Bookings',
        component: RouterView,
        children: [
          {
            path: 'pending',
            name: 'Pending',
            component: Pending
          },
          {
            path: 'approved',
            name: 'Approved',
            component: Approved
          },
          {
            path: ':id',
            name: 'Booking',
            component: Booking
          },
        ]
      },
      {
        path: 'services',
        name: 'Services',
        component: Services
      },
      {
        path: 'employees',
        name: 'Employees',
        component: RouterView,
        children: [
          {
            path: 'list',
            name: 'EmployeesList',
            component: EmployeeList
          },
          {
            path: 'add',
            name: 'AddAccount',
            component: AddAccount
          },
          {
            path: 'guides',
            name: 'Guides',
            component: Guides
          },
          {
            path: 'timesheets',
            name: 'Timesheets',
            component: Timesheets
          }
        ]
      },
      {
        path: 'clients',
        name: 'Clients',
        component: RouterView,
        children: [
          {
            path: 'list',
            name: 'ClientList',
            component: ClientList
          }
        ]
      },
      {
        path: 'chat',
        name: 'Chat',
        component: RouterView,
        children: [
          {
            path: 'employees',
            name: 'ChatEmployees',
            component: ChatEmployees
          },
          {
            path: 'clients',
            name: 'ChatClients',
            component: ChatClients
          }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
