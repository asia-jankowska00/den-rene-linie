<template>
  <div>
    <b-field label="Email">
      <b-input v-model="username" placeholder="Email"></b-input>
    </b-field>

    <b-field label="Password">
      <b-input v-model="password" type="password" password-reveal></b-input>
    </b-field>

    <b-button @click="loginUser">Log in</b-button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  components: {},
  data() {
    return {
      password: '',
      username: ''
    }
  },
  mounted: function () {
    // try to fetch current user based on localStorage JWT and automatically redirect to dashboard
    this.getProfile()
      .then(() => {
        if (this.user.role.type === 'employee') {
          this.$router.push('/dashboard/bookings')
        }
      })
      .catch((e) => {
        console.log(e)
      })
  },
  methods: {
    ...mapActions('user', ['login']),
    ...mapActions('user', ['getProfile']),
    loginUser: function () {
      this.login({
        identifier: this.username,
        password: this.password
      })
        .then(() => {
          this.$router.push('/dashboard/bookings')
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }
}
</script>
