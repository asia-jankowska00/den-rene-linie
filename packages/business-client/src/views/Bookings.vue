<template>
  <div class="columns">
    <div class="column">
      <b-datepicker
        v-model="selectedDate"
        inline
        :events="bookingsCalendarEvents"
        indicators="bars"
      ></b-datepicker>
      <div
        v-for="booking in bookingsForDate"
        :key="booking._id"
        class="card is-flex is-flex-direction-column"
      >
        <div class="is-flex is-flex-direction-row is-justify-content-space-between p-4">
          <div class="container">
            <strong>
              <div class="is-flex is-flex-direction-column is-justify-content-space-between">
                <p v-for="employee in booking.assignedEmployees" :key="employee._id">
                  {{ formatName(employee) }}
                </p>
              </div>
            </strong>
            <p>Address: {{ booking.address }}</p>
            <p>Status: {{ booking.status }}</p>
      
            <p v-if="booking.isRecurring">{{ booking.frequencyType }}</p>
          </div>
        </div>
        <div class="is-align-self-flex-end p-4">
          <a>
            <b-icon pack="fas" icon="arrow-right" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import dayjs from 'dayjs'

export default {
  name: 'Bookings',
  components: {},
  data() {
    return {
      selectedDate: new Date()
    }
  },
  computed: {
    ...mapGetters('user', ['user']),
    ...mapGetters('bookings', ['bookings']),
    ...mapGetters('bookings', ['bookingsCalendarEvents']),
    ...mapGetters('bookings', ['bookingsForDate'])
  },
  watch: {
    selectedDate(newDate) {
      const endDate = dayjs(newDate).add(1, 'day').toDate()
      this.getBookingsForDate({ dayStart: newDate, dayEnd: endDate })
    }
  },
  mounted() {
    this.getBookingsByUser(this.user._id)
    this.getBookingsForDate({
      dayStart: new Date(),
      dayEnd: dayjs(new Date()).add(1, 'day').toDate()
    })
  },
  methods: {
    ...mapActions('bookings', ['getBookingsByUser']),
    ...mapActions('bookings', ['getBookingsForDate']),
    ...mapActions('bookings', ['updateBooking']),
    ...mapActions('bookings', ['createBooking'])
  }
}
</script>

<style scoped lang="scss">
/deep/ .datepicker.control {
  width: 100%;
}
/deep/ .dropdown.dropdown-menu-animation.is-inline.is-active {
  display: inline-block !important;
  max-width: 100%;
}

/deep/ .dropdown-menu {
  width: 100%;
}

/deep/ .datepicker-table {
  width: 100%;
}

/deep/ .datepicker .dropdown-content {
  box-shadow: none;
}

/deep/
  .datepicker
  .datepicker-table
  .datepicker-body.has-events
  .datepicker-cell.has-event
  .events
  .event {
  padding: 0.2rem;
}
</style>
