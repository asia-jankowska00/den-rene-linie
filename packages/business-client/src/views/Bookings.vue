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
        class="card"
        @click="toggleBookingModal(booking)"
      >
        <div class="card-content">
          <div class="media">
            <div class="media-left"></div>
            <div class="media-content">
              <p
                v-for="employee in booking.assignedEmployees"
                :key="employee._id"
                class="title is-5"
              >
                {{ formatName(employee) }}
              </p>
              <p class="subtitle is-6">{{ booking.service.name }}</p>
            </div>
          </div>

          <div class="content">
            <br />
            <time datetime="2016-1-1">{{ formatDateTime(booking.startDate) }}</time>
            <br />
            <time datetime="2016-1-1">{{ formatDateTime(booking.endDate) }}</time>
            <hr />
            <b-icon pack="fas" icon="phone"></b-icon>
            <b-icon pack="fas" icon="comment-dots"></b-icon>
          </div>
        </div>
      </div>
      <b-modal
        v-if="selectedBooking"
        v-model="isBookingModalActive"
        has-modal-card
        :destroy-on-hide="false"
        aria-role="dialog"
        aria-modal
      >
        <template>
          <BookingModal :title="selectedBooking.service.name" @close="toggleBookingModal">
            <h4 class="subtitle">Service details</h4>
            <b-field>
              {{ selectedBooking.service.name }}
            </b-field>
            <b-field>
              <ul>
                <li v-for="task in selectedBooking.tasks" :key="task._id">
                  {{ task.name }}
                </li>
              </ul>
            </b-field>
            <b-field>
              {{
                selectedBooking.clientNote ? selectedBooking.clientNote : 'No special instructions'
              }}
            </b-field>
            <hr />
            <h4 class="subtitle">Timeframe details</h4>
            <b-field label="Start date">
              {{ formatDateTime(selectedBooking.startDate) }}
            </b-field>
            <b-field label="End date">
              {{ formatDateTime(selectedBooking.endDate) }}
            </b-field>
            <b-field>Personal meeting: {{ selectedBooking.meeting ? 'Yes' : 'No' }}</b-field>
            <hr />
            <h4 class="subtitle">Company details</h4>
            <b-field label="Address">
              {{ selectedBooking.address }}
            </b-field>
            <b-field label="Phone">
              {{ user.phone }}
            </b-field>
            <b-field label="Email">
              {{ user.email }}
            </b-field>
          </BookingModal>
        </template>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import BookingModal from '@/components/BookingModal.vue'
import dayjs from 'dayjs'

export default {
  name: 'Bookings',
  components: { BookingModal },
  data() {
    return {
      selectedDate: new Date(),
      isBookingModalActive: false
    }
  },
  computed: {
    ...mapGetters('user', ['user']),
    ...mapGetters('bookings', ['bookings']),
    ...mapGetters('bookings', ['bookingsCalendarEvents']),
    ...mapGetters('bookings', ['bookingsForDate']),
    ...mapGetters('bookings', ['selectedBooking'])
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
    ...mapActions('bookings', ['createBooking']),
    ...mapMutations('bookings', ['updateSelectedBooking']),
    ...mapMutations('bookings', ['clearSelectedBooking']),
    toggleBookingModal(booking) {
      if (booking) {
        this.updateSelectedBooking(booking)
      } else {
        this.clearSelectedBooking()
      }
      this.isBookingModalActive = !this.isBookingModalActive
    }
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
