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
  background: linear-gradient(180deg, #275A64 0%, rgba(0, 178, 159, 0.85) 100%);
  min-width: 500px;
  max-width: 500px;
  min-height: 100%;
  max-height: 100%;
  position: relative;

  @media screen and (max-width: 500px) {
    min-width: 100vw;
  }
}
</style>
