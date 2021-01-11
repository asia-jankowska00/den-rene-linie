<template>
  <div class="container is-flex is-justify-content-center is-align-items-center">
    <div class="is-flex mt-6 columns is-justify-content-center card">
      <div class="column is-flex is-flex-direction-column  p-6">
        <b-image
          src="https://res.cloudinary.com/den-rene-linie/image/upload/v1610400559/DRL_Full_Logo_Primery_Default_a3142aeaa5.png"
        ></b-image>
        <div>
          <b-field label="Username">
            <b-input v-model="username"></b-input>
          </b-field>

          <b-field label="Password">
            <b-input v-model="password" type="password" password-reveal></b-input>
          </b-field>

          <b-button @click="loginUser">Log in</b-button>
        </div>
      </div>
      <b-image
        class="column ml-5 splash  p-6"
        src="https://res.cloudinary.com/den-rene-linie/image/upload/v1610400341/splash_17c9160fca.png"
      ></b-image>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Home',
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
        if (this.user.role.type === 'employer') {
          this.$router.push('/dashboard/bookings/pending')
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
          this.$router.push('/dashboard/bookings/pending')
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }
}
</script>

<style scoped lang="scss">
.splash {
  background: #f2f2f2;
}
</style>
