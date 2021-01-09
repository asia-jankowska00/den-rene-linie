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
      class="content hero is-fullwidth is-success is-flex-direction-row is-justify-content-space-between"
    >
      <span>{{nameOfDay}} | {{dateMonth}}</span>
      <span>{{year}}</span>
    </div>

    <BookingItem
      v-for="b in bookingsForDate"
      :id="b._id"
      :key="b._id"
      :client="b.client.firstName"
      :startDate="formatDuration(b.startDate)"
      :endDate="formatDuration(b.endDate)"
      :address="b.address"
    />
  </div>
</template>

<script>
import Tabs from '../components/Tabs'
import BookingItem from '../components/BookingItem'
import { mapGetters, mapActions } from 'vuex'
import dayjs from 'dayjs'

export default {
  name: 'Bookings',
  components: { BookingItem, Tabs },
  data() {
    return {
      selectedDate: new Date(),
      nameOfDay: dayjs(this.selectedDate).format('dddd'),
      dateMonth: dayjs(this.selectedDate). format('D MMMM'),
      year: dayjs(this.selectedDate). format('YYYY')
    }
  },
  computed: {
    ...mapGetters('user', ['user']),
    ...mapGetters('bookings', ['bookings']),
    ...mapGetters('bookings', ['bookingsCalendarEvents']),
    ...mapGetters('bookings', ['bookingsForDate']),
  },
  watch: {
    selectedDate(newDate) {
      const endDate = dayjs(newDate).add(1, 'day').toDate()
      this.getBookingsForDate({userId:this.user._id, dayStart: newDate, dayEnd: endDate })
      this.nameOfDay = dayjs(this.selectedDate).format('dddd')
      this.dateMonth = dayjs(this.selectedDate). format('D MMMM')
      this.year = dayjs(this.selectedDate). format('YYYY')
    }
  },
  mounted(){
    this.getBookingsByUser(this.user._id),
    this.getBookingsForDate({
      userId:this.user._id,
      dayStart: new Date(),
      dayEnd: dayjs(new Date()).add(1, 'day').toDate()
    })
  },
  methods: {
    ...mapActions('bookings', ['getBookingsByUser']),
    ...mapActions('bookings', ['getBookingsForDate']),
  }
}
</script>

<style lang="scss" scoped>
.datepicker {
  text-align: center;
}
div.hero {
  z-index: 99;
  position: sticky;
  top: 0;
  left: 0;
  margin-bottom: 0;
}
</style>
