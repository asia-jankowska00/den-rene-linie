<template>
  <div>
    <b-image
      src="https://expertphotography.com/wp-content/uploads/2019/11/Cute-Kitten-Picture-get-your-cat-to-look-at-the-camera.jpg"
    ></b-image>
    <div class="actions content is-flex is-flex-direction-column">
      <b-button class="my-1" tag="router-link" to="/login">Log in</b-button>
      <!--<b-button class="my-1" tag="router-link" to="/register">Sign-up</b-button>-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
}
</script>
