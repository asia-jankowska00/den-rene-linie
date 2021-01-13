<template>
  <div class="hero">
    <div class="logo"></div>
      <div class="form">
        <div class="fields">
          <b-field>
            <b-input icon="envelope" placeholder="Email" v-model="username"></b-input>
          </b-field>
          <b-field>
            <b-input icon="lock" placeholder="Password" v-model="password" type="password" password-reveal></b-input>
          </b-field>
        </div>
        <div class="actions">
          <b-button @click="loginUser">SIGN IN</b-button>
          <div class="divider is-flex is-flex-direction-row is-justify-content-space-evenly is-align-items-center"><hr>OR<hr></div>
          <router-link tag="button" class="button" to="/register">CREATE AN ACCOUNT</router-link>
          <a>Forgot your password?</a>
        </div>
      </div>
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

  .form{
    background-color: #F7F7FC;
    border-radius: 30px 30px 0px 0px;
    padding: 3.2rem 0 1.6rem 0;
    position: relative;
    animation: slide-top 0.3s ease-out both;

    @keyframes slide-top {
      0% {
        transform: translateY(100%);
      }
      100% {
        transform: translateY(0);
      }
    }

    .fields{
      width: 88%;
      margin: 0 auto;

      .field{
        .input{
          background-color: #FCFCFC;
          border-radius: 16px;
          border: none;
          padding: .8rem 0;
        }
      }
    }

    .actions{
      width: 88%;
      margin: 0 auto;
      text-align: center;

      button, .button{
        width: 100%;
        border-radius: 30px;
        border: none;
        color: #FCFCFC;
        padding: 1.6rem 0;
        filter: drop-shadow(0px 1px 5px rgba(0, 0, 0, 0.25));
        margin: 2rem 0;
        &:nth-of-type(1){
          background-color: #275a64;
          margin-bottom: 0;
        }
        &:nth-of-type(2){
          background-color: #00b29f;
          margin-top: 0;
        }
      }

      .divider{
        hr{
          width: 24%;
          height: 2px;
          background: #14142B;
          opacity: .3;
          border-radius: 60px;
        }
      }
      
      a{
        color: #91919F;
        text-decoration: underline;
      }
    }
  }
}
</style>