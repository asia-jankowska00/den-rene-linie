<template>
  <div>
    <div class="content">
      <h2>Notifications</h2>
      <router-link tag="article" to="/dashboard/bookings" class="card is-shadowless">
        <div class="content">
          <strong> status booking</strong>
          <p>
            <strong>client</strong>
            ’s booking from
            <strong>startDate</strong>
            to
            <strong>endDate</strong>
            has been
            <strong>action</strong>
            .
          </p>
          <small></small>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Notifications',
  components: {}
}
</script>
