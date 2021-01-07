<template>
  <div>
    <b-field label="Email">
      <b-input v-model="email"></b-input>
    </b-field>

    <b-field label="Password">
      <b-input v-model="password" type="password" password-reveal></b-input>
    </b-field>

    <b-button @click="registerUser">Sign up</b-button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Register',
  components: {},
  data() {
    return {
      password: '',
      email: ''
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
    ...mapActions('user', ['register']),
    ...mapActions('user', ['getProfile']),
    registerUser() {
      this.register({
        email: this.email,
        username: this.email,
        password: this.password,
        role: '5feb2bac214c2f2d14529cd4'
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
