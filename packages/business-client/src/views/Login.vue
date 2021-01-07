<template>
  <div>
    <b-field label="Username">
      <b-input v-model="username"></b-input>
    </b-field>

    <b-field label="Password">
      <b-input v-model="password" type="password" password-reveal></b-input>
    </b-field>

    <b-button @click="loginUser">Log in</b-button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Login',
  components: {},
  data() {
    return {
      password: '',
      username: ''
    }
  },
  computed: {
    ...mapGetters('user', ['user'])
  },
  mounted() {
    // try to fetch current user based on localStorage JWT and automatically redirect to dashboard
    this.getProfile()
      .then(() => {
        if (this.user.role.type === 'business_client') {
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
    loginUser() {
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
