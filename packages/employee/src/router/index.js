import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import Guides from '../views/Guides.vue'
import Bookings from '../views/Bookings.vue'
import Timesheets from '../views/Timesheets.vue'
import Notifications from '../views/Notifications.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    children: [
      {
        path: 'guides',
        name: 'Guides',
        component: Guides
      },
      {
        path: 'bookings',
        name: 'Bookings',
        component: Bookings        
      },
      {
        path: 'timesheets',
        name: 'Timesheets',
        component: Timesheets
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
