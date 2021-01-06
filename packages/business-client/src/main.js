import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import dayjs from 'dayjs'

library.add(fas)

Vue.use(Buefy, { defaultIconComponent: 'vue-fontawesome', defaultIconPack: 'fas' })
Vue.component('vue-fontawesome', FontAwesomeIcon)

Vue.config.productionTip = false

const baseUrl = 'http://localhost:1337'

Vue.mixin({
  data() {
    return {
      placeholderAvatar: `${baseUrl}/uploads/Portrait_Placeholder_b9c75025d0.png`
    }
  },
  methods: {
    formatName(user) {
      return `${user.firstName} ${user.lastName}`
    },
    formatDate(date) {
      return dayjs(date).format('DD/MM/YYYY')
    },
    formatDateTime(date) {
      return dayjs(date).format('DD/MM/YYYY, hh:mm')
    },
    formatDuration(date) {
      return dayjs(date).format('hh:mm')
    }
  }
})

new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount('#app')
