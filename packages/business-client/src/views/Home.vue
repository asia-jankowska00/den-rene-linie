<template>
  <div>
    <b-image
      src="https://expertphotography.com/wp-content/uploads/2019/11/Cute-Kitten-Picture-get-your-cat-to-look-at-the-camera.jpg"
    ></b-image>
    <div class="is-flex is-flex-direction-column">
      <b-button tag="router-link" to="/login">Log in</b-button>
      <b-button tag="router-link" to="/register">Sign-up</b-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {},
  computed: {
    ...mapGetters('user', ['user'])
  },
  methods: {
    ...mapActions('user', ['getProfile'])
  },
  mounted: function () {
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
  }
}
</script>
