<template>
  <div><b-button @click="logoutUser">Logout
    </b-button></div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Profile',
  methods: {
    ...mapActions('user', ['logout']),
    logoutUser: function () {
      this.logout().then(() => {
        this.$router.push('/')
      })
    }
  }
}
</script>
