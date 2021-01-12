<template>
  <div>
    <h2>Bookings</h2>
    <div>
      <b-datepicker
        v-model="selectedDate"
        inline
        :events="bookingsCalendarEvents"
        indicators="dots"
      ></b-datepicker>

      <div class="bookings-container is-fullwidth">

        <div class="content hero is-fullwidth">
          <span>{{ dateMonth }} {{ year }}</span>
        </div>

        <div
          v-for="booking in bookingsForDate"
          :key="booking._id"
          class="card"
          @click="toggleBookingModal(booking)"
        >
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <div class="image is-48x48">
                  <img class="image is-rounded" :src="placeholderAvatar"/>
                </div>
              </div>
              <div class="media-content">
                <p
                  v-for="employee in booking.assignedEmployees"
                  :key="employee._id"
                  class="title is-5"
                >
                  {{ formatName(employee) }}
                </p>
              </div>
            </div>

            <div class="content">
              <p class="subtitle is-6">{{ booking.service.name }}</p>
              <b><time datetime="2016-1-1">{{ formatDuration(booking.startDate) }}</time> - <time datetime="2016-1-1">{{ formatDuration(booking.endDate) }}</time></b>
              <hr />
              <b-icon pack="fas" icon="phone"></b-icon>
              <b-icon pack="fas" icon="comment-dots"></b-icon>
            </div>
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
      dateMonth: dayjs(this.selectedDate).format('D MMM'),
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
      this.getBookingsForDate({ dayStart: newDate, dayEnd: endDate })
      this.dateMonth = dayjs(this.selectedDate).format('D MMM')
      this.year = dayjs(this.selectedDate).format('YYYY')
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
/deep/ .datepicker {
  .dropdown {
    width: 100%;
    .dropdown-menu {
      .dropdown-content {
        background-color: transparent;

        .dropdown-item {
          .datepicker-header {
            border: none;
            padding: 0;
            margin: 0;
            .pagination {
              flex-wrap: nowrap;
              :nth-child(1) {
                order: 1;
              }
              :nth-child(2) {
                order: 3;
              }
              :nth-child(3) {
                order: 2;
              }
              /deep/ .pagination-previous,
              .pagination-next,
              .pagination-link {
                border-color: transparent;
                color: white;
                font-size: 1.6rem;
                margin: 0;
                padding: 0;
                height: 64px;
                width: 64px;

                .has-text-primary {
                  color: white !important;
                }

                /deep/ .pagination-list {
                  .select select {
                    border-color: transparent;
                    background-color: transparent;
                    color: white;
                    &::after {
                      display: none;
                    }
                  }
                }
              }
            }
          }
          .datepicker-content {
            /deep/ .datepicker-header {
              .datepicker-cell {
                color: #d9dbe9;
              }
            }
            .datepicker-body {
              .datepicker-cell {
                font-weight: bold;
                color: white;
              }
              .is-unselectable {
                color: #d9dbe9;
              }
            }
          }
        }
      }
    }
  }
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

.bookings-container{
  margin: 0 -1.5rem;
  background-color: #FCFCFC;
  border-radius: 30px 30px 0px 0px;
  backdrop-filter: blur(30px);
  padding:0 1.6rem;
  .hero{
    color: #6E7191;
    font-weight: bold;
    padding: 1.6rem 0 .8rem 0;
    margin-bottom: 0;
  }
  .card{
    background-color: white;
    border: 1px solid rgba(220, 220, 220, 0.5);
    box-sizing: border-box;
    box-shadow: 0px 1px 5px rgba(57, 57, 57, 0.1);
    border-radius: 30px;
    width: 100%; //64% if timeline on-side
    margin: 0 0 0 auto;

    .media{
      margin-bottom: .8rem;
    }
    .content{
      hr{
        margin: .8rem 0;
      }
    }
  }
}
</style>
