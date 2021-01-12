<template>
  <div class="hero">
    <div class="logo"></div>
    <div class="actions is-flex is-flex-direction-column">
      <b-button tag="router-link" class="mb-4" to="/login">SIGN IN</b-button>
      <b-button tag="router-link" to="/register">CREATE AN ACCOUNT</b-button>
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
  },
  methods: {
    ...mapActions('user', ['getProfile'])
  }
}
</script>

<style lang="scss" scoped>
.hero{
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100%;
  max-height: 100%;
  background-image: url('../assets/DRLHeroBanner.png');
  .logo{
    background-image: url('../assets/DRLFullLogoSecondaryDefault.svg');
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    padding-bottom: 56.25%;
    position: relative;
    top: 8rem;
  }
  .actions{
    width: 88%;
    margin: 0 auto;
    position: relative;
    top: -4rem;
    .button{
      border-radius: 30px;
      border: none;
      color: #FCFCFC;
      padding: 1.6rem 0;
      filter: drop-shadow(0px 1px 5px rgba(0, 0, 0, 0.25));
      &:nth-child(1){
        background-color: #275a64;
      }
      &:nth-child(2){
        background-color: #00b29f;
      }
    }
  }
}
</style>