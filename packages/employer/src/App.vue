<template>
  <div id="app">
    <router-view></router-view>
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


html {
  // overflow: hidden;
}

#app {
  font-size: 16px;
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
}
</style>
