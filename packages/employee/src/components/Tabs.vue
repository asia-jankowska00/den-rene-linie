<template>
  <div class="tabs is-expanded is-fullwidth">
    <ul>
      <router-link tag="li" to="bookings" active-class="is-active" exact>
        <a>Bookings</a>
      </router-link>
      <router-link tag="li" to="timesheets" active-class="is-active" exact>
        <a>Timesheets</a>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Tabs'
}
</script>

<style lang="scss">
.content ul {
  margin: 0;
}
</style>
