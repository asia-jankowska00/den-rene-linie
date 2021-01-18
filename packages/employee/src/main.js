import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Buefy from 'buefy'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'

dayjs.extend(utc)
dayjs.extend(timezone)

dayjs.tz.setDefault('Europe/Copenhagen')

library.add(fas)

Vue.use(Buefy, { defaultIconComponent: 'vue-fontawesome', defaultIconPack: 'fas' })
Vue.component('vue-fontawesome', FontAwesomeIcon)

Vue.prototype.dayjs = dayjs

Vue.config.productionTip = false

Vue.use(
  new VueSocketIO({
    connection: SocketIO('http://localhost:1337'),
    vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
    }
  })
)

Vue.mixin({
  data() {
    return {
      placeholderAvatar:
        'https://res.cloudinary.com/den-rene-linie/image/upload/v1610229276/Portrait_Placeholder_238e4f79b7.png',
      drlAvatar:
        'https://res.cloudinary.com/den-rene-linie/image/upload/v1610297871/Logo_b7e21cd3f1.png'
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
      return dayjs(date).tz('Etc/GMT+0').format('HH:mm')
    },
    formatElapsedTime(date) {
      return dayjs(date).tz('Etc/GMT+0').format('HH:mm:ss')
    }
  },
  sockets: {
    connect() {
      console.log('socket connected')
    }
  }
})

new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount('#app')
