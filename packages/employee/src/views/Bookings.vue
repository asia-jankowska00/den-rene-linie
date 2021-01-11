<template>
  <div>
    <Tabs />
    <b-datepicker
      v-model="selectedDate"
      class="is-overlay is-fullwidth"
      inline
      :events="bookingsCalendarEvents"
      indicators="bars"
    ></b-datepicker>

    <div
      class="content p-2 hero is-fullwidth is-primary is-flex-direction-row is-justify-content-space-between"
    >
      <span>{{ nameOfDay }} | {{ dateMonth }}</span>
      <span>{{ year }}</span>
    </div>

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
            <p class="title is-5">
              {{ formatName(booking.client) }}
            </p>
            <p class="subtitle is-6">{{ booking.service.name }}</p>
          </div>
        </div>

        <div class="content">
          <br />
          <time datetime="2016-1-1">{{ formatDateTime(booking.startDate) }}</time>
          <br />
          <time datetime="2016-1-1">{{ formatDateTime(booking.endDate) }}</time>
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
          <h4 class="subtitle">Client details</h4>
          <b-field>
            {{ selectedBooking.address }}
          </b-field>
          <hr />
          <b-field>
            {{
              selectedBooking.clientNote ? selectedBooking.clientNote : 'No special instructions'
            }}
          </b-field>
          <b-field>
            <ul>
              <li class="task" v-for="task in selectedBooking.tasks" :key="task._id">
                <b-checkbox v-model="task.isComplete">{{ task.name }}</b-checkbox>
              </li>
            </ul>
          </b-field>
          <hr />
          <Stopwatch />
        </BookingModal>
      </template>
    </b-modal>
  </div>
</template>

<script>
import Tabs from '../components/Tabs'
import BookingModal from '@/components/BookingModal'
import Stopwatch from '@/components/Stopwatch'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import dayjs from 'dayjs'

export default {
  name: 'Bookings',
  components: { Tabs, BookingModal, Stopwatch },
  data() {
    return {
      selectedDate: new Date(),
      nameOfDay: dayjs(this.selectedDate).format('dddd'),
      dateMonth: dayjs(this.selectedDate).format('D MMMM'),
      year: dayjs(this.selectedDate).format('YYYY'),
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
      this.getBookingsForDate({ userId: this.user._id, dayStart: newDate, dayEnd: endDate })
      this.nameOfDay = dayjs(this.selectedDate).format('dddd')
      this.dateMonth = dayjs(this.selectedDate).format('D MMMM')
      this.year = dayjs(this.selectedDate).format('YYYY')
    }
  },
  mounted() {
    this.getBookingsByUser(this.user._id),
      this.getBookingsForDate({
        userId: this.user._id,
        dayStart: new Date(),
        dayEnd: dayjs(new Date()).add(1, 'day').toDate()
      })
  },
  methods: {
    ...mapActions('bookings', ['getBookingsByUser']),
    ...mapActions('bookings', ['getBookingsForDate']),
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

<style lang="scss" scoped>
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

.datepicker {
  text-align: center;
}
div.hero {
  position: sticky;
  top: 0;
  left: 0;
  margin-bottom: 0;
}

.task {
  list-style: none;
}
</style>
