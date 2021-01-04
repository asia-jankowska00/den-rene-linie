<template>
  <router-link tag="article" to="/dashboard/bookings" class="card is-shadowless">
    <div class="content">
      <strong>{{ status }} booking</strong>
      <p>
        <strong>{{ client }}</strong>’s booking from <strong>{{ startDate }}</strong> to <strong>{{ endDate }}</strong> has been <strong>{{ action }}</strong>.
      </p>
      <small></small>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'NotificationItem',
  props: ['status', 'client', 'startDate', 'endDate', 'action']
}
</script>

<style lang="scss" scoped>
.card {
  border-top: 1px solid #333;
  //border-bottom: 1px solid #333;
  border-radius: 0;
  //margin: 0 -20px;
  //width: calc(100% + 40px);
  //position: absolute;
}
</style>
