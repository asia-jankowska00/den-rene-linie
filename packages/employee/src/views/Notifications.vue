<template>
  <section>
    <div class="content">
      <h2>Notifications</h2>
      <div>
        <NotificationItem
          status="Canceled"
          client="Client"
          startDate="30/12/2020 00:00"
          endDate="31/12/2020 08:00"
          action="canceled"
        />
      </div>
    </div>
  </section>
</template>

<script>
import NotificationItem from '../components/NotificationItem'
export default {
  name: 'Notifications',
  components: { NotificationItem }
}
</script>
