import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Buefy from 'buefy'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import dayjs from 'dayjs'

library.add(fas)

Vue.use(Buefy, { defaultIconComponent: 'vue-fontawesome', defaultIconPack: 'fas' })
Vue.component('vue-fontawesome', FontAwesomeIcon)

Vue.prototype.dayjs = dayjs

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    formatName(user) {
      return `${user.firstName} ${user.lastName}`
    }
  }
})

new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount('#app')
