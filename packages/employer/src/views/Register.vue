<template>
  <div>
    <b-field label="Username">
      <b-input value="johnsilver" maxlength="30"></b-input>
    </b-field>

    <b-field label="Password">
      <b-input type="password" password-reveal></b-input>
    </b-field>

    <b-button tag="router-link" to="/dashboard">Sign up</b-button>
  </div>
</template>

<script>
export default {
  name: 'Register',
  components: {}
}
</script>
