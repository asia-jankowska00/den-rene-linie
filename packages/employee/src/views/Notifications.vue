<template>
  <section>
    <div class="content">
      <h2>Notifications</h2>
      <div>
        <router-link tag="article" to="/dashboard/bookings" class="card is-shadowless">
          <div class="content">
            <strong>{{ status }} booking</strong>
            <p>
              <strong>{{ client }}</strong>
              ’s booking from
              <strong>{{ startDate }}</strong>
              to
              <strong>{{ endDate }}</strong>
              has been
              <strong>{{ action }}</strong>
              .
            </p>
            <small></small>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Notifications',

  data() {
    return {
      status: 'Canceled',
      client: 'Client',
      startDate: '30/12/2020 00:00',
      endDate: '31/12/2020 08:00',
      action: 'canceled'
    }
  }
}
</script>
