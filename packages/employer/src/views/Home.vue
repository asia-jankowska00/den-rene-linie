<template>
  <div class="container is-flex is-justify-content-center">
    <div class="is-flex mt-6 columns is-justify-content-center">
      <div class="column is-flex is-flex-direction-column">
        <div>
          <b-field label="Username">
            <b-input value="johnsilver" maxlength="30"></b-input>
          </b-field>

          <b-field label="Password">
            <b-input type="password" password-reveal></b-input>
          </b-field>

          <b-button tag="router-link" to="/dashboard">Log in</b-button>
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
export default {
  name: 'Home',
  components: {}
}
</script>

<style scoped>
</style>
