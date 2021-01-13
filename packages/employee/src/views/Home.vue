<template>
  <!--<div>
    <b-image
      src="https://expertphotography.com/wp-content/uploads/2019/11/Cute-Kitten-Picture-get-your-cat-to-look-at-the-camera.jpg"
    ></b-image>
    <div class="actions content is-flex is-flex-direction-column">
      <b-button class="my-1" tag="router-link" to="/login">Log in</b-button>
    </div>
  </div>-->
  <div class="hero">
    <div class="logo"></div>
    <div class="actions is-flex is-flex-direction-column">
      <b-button tag="router-link" to="/login">SIGN IN</b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
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
      background-color: #275a64;
    }
  }
}
</style>