<template>
  <div id="app">
    <div class="wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {}
}
</script>

<style lang="scss">
@import './custom';
#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial,
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  font-size: 16px;
  background: #f2f2f2;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  border: 1px solid #dddddd;
  padding: 20px;

  @media screen and (max-width: 500px) {
    padding: 0;
  }
}

.wrapper {
  background: #ffffff;
  width: 500px;
  max-width: 500px;
  min-height: 100%;
  max-height: 100%;
  position: relative;
}
</style>
