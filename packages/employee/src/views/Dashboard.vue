<template>
  <div
    v-if="user && user.role.type === 'employee'"
    class="wrapper is-flex is-flex-direction-column"
  >
    <BarTop />
    <router-view class="content p-5" />
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
  height: 100%;
  flex: 1 !important;
}

.content h2, h2{
  text-align: center;
  color: #FCFCFC;
}
</style>
