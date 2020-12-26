import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import Profile from '../views/Profile.vue'
import Employees from '../views/Employees.vue'
import Clients from '../views/Clients.vue'
import Chat from '../views/Chat.vue'
import ChatEmployees from '../views/ChatEmployees.vue'
import ChatClients from '../views/ChatClients.vue'
import Services from '../views/Services.vue'
import Bookings from '../views/Bookings.vue'
import Notifications from '../views/Notifications.vue'

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
        path: 'profile',
        name: 'Profile',
        component: Profile
      },
      {
        path: 'employees',
        name: 'Employees',
        component: Employees
      },
      {
        path: 'clients',
        name: 'Clients',
        component: Clients
      },
      {
        path: 'chat',
        name: 'Chat',
        component: Chat,
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
      },
      {
        path: 'services',
        name: 'Services',
        component: Services
      },
      {
        path: 'bookings',
        name: 'Bookings',
        component: Bookings,
        children: [
          {
            path: 'pending',
            name: 'Pending',
            component: Bookings
          },
          {
            path: 'approved',
            name: 'Approved',
            component: Bookings
          }
        ]
      },
      {
        path: 'notifications',
        name: 'Notifications',
        component: Notifications
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
