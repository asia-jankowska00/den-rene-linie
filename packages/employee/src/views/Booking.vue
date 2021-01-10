<template>
  <article v-if="selectedBooking" class="card">
    <section class="client content is-flex is-flex-direction-column">
      <div class="is-flex is-flex-direction-row is-justify-content-space-between">
        <div class="container">
          <strong>
            <p class="is-flex is-flex-direction-row is-justify-content-space-between">
              <span>{{ formatName(selectedBooking.client) }}</span>
              <span>
                {{ formatDateTime(selectedBooking.startDate) }} -
                {{ formatDateTime(selectedBooking.endDate) }}
              </span>
            </p>
          </strong>
          <small>Address: {{ selectedBooking.address }}</small>
        </div>
      </div>
    </section>
    <section class="service">
      <h3>Service name</h3>
      <div class="content">
        <ul>
          <li v-for="task in selectedBooking.tasks" :key="task._id">
            <div class="field">
              <b-checkbox v-model="task.isComplete">{{ task.name }}</b-checkbox>
            </div>
          </li>
        </ul>
      </div>

      <div v-if="selectedBooking.clientNote" class="content">
        <h4>Client's note</h4>
        <p>{{ selectedBooking.clientNote }}</p>
      </div>
    </section>
    <Stopwatch />
  </article>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Stopwatch from '../components/Stopwatch'

export default {
  name: 'Booking',
  components: {
    Stopwatch
  },
  computed: {
    ...mapGetters('bookings', ['selectedBooking'])
  },
  mounted() {
    this.getSelectedBooking(this.$route.params.id)
  },
  methods: {
    ...mapActions('bookings', ['getSelectedBooking'])
  }
}
</script>

<style lang="scss" scoped>
.client {
  .container {
    margin-left: 10px;
  }
}
.service {
  ul {
    list-style: none;
  }
}
</style>
