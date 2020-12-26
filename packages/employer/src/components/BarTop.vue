<template>
  <b-navbar class="has-background-light">
    <template slot="brand">
      <b-navbar-item tag="router-link" to="/dashboard">LOGO</b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item tag="router-link" to="/dashboard/notifications">
        <b-icon icon="bell" size="is-large"></b-icon>
      </b-navbar-item>
      <b-navbar-item tag="router-link" to="/dashboard/profile">
        <b-icon icon="user" size="is-large"></b-icon>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default { name: 'BarTop' }
</script>

<style></style>
