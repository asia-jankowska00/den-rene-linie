<template>
  <div v-if="user && user.role.type === 'employee'">
    <BarTop />
    <router-view class="content view" />
    <BarBottom />
  </div>
</template>

<script>
import BarTop from '@/components/BarTop'
import BarBottom from '@/components/BarBottom'
import { mapGetters, mapActions } from 'vuex'
import { SnackbarProgrammatic as Snackbar } from 'buefy'

export default {
  name: 'Dashboard',
  components: { BarTop, BarBottom },
  computed: {
    ...mapGetters('user', ['user'])
  },
  mounted: function () {
    // try to fetch current user based on localStorage JWT
    this.getProfile()
      .then(() => {
        if (this.user.role.type !== 'employee') {
          this.$router.push('/')
          Snackbar.open({ position: 'is-top', message: 'Your account type doesnt have access' })
        }
      })
      .catch((e) => {
        console.log(e)
        // if no token or no user, redirect to login
        if (!this.user) {
          this.$router.push('/')
          Snackbar.open({ position: 'is-top', message: 'You are not logged in' })
        }
      })
  },
  methods: {
    ...mapActions('user', ['getProfile'])
  }
}
</script>

<style>
.content {
  padding: 10px;
}
.view {
  padding-bottom: 3.5rem;
}
</style>
