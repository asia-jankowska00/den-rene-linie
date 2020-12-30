<template>
  <div
    v-if="user && user.role.type === 'employer'"
    class="wrapper is-flex is-flex-direction-column"
  >
    <BarTop />
    <div class="columns is-flex">
      <BarSide class="column sidebar" />
      <router-view class="column p-4" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BarTop from '@/components/BarTop'
import BarSide from '@/components/BarSide'
import { SnackbarProgrammatic as Snackbar } from 'buefy'

export default {
  name: 'Dashboard',
  components: { BarTop, BarSide },
  computed: {
    ...mapGetters('user', ['user'])
  },
  mounted: function () {
    // try to fetch current user based on localStorage JWT
    this.getProfile()
      .then(() => {
        if (this.user.role.type !== 'employer') {
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

<style lang="scss" scoped>
.wrapper {
  flex: 1 !important;
}

.sidebar {
  flex: none;
  width: 17.5%;
}

.columns {
  height: 100%;
}
</style>
