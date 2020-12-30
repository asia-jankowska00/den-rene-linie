<template>
  <div class="container is-flex is-justify-content-center">
    <div class="is-flex mt-6 columns is-justify-content-center">
      <div class="column is-flex is-flex-direction-column">
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
        class="column"
        src="https://expertphotography.com/wp-content/uploads/2019/11/Cute-Kitten-Picture-get-your-cat-to-look-at-the-camera.jpg"
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

<style scoped></style>
