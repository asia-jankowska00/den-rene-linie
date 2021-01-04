<template>
  <div>
    <Tabs />
    <b-datepicker
      v-model="date"
      class="is-overlay is-fullwidth"
      inline
      :events="events"
      :indicators="indicators"
    ></b-datepicker>

    <div
      class="content hero is-fullwidth is-success is-flex-direction-row is-justify-content-space-between"
    >
      <span>123 | 123</span>
      <span>123</span>
    </div>

    <BookingItem
      v-for="(event, index) in events"
      :key="index"
      :client="'John Doe'"
      :startHour="'10:00'"
      :endHour="'12:10'"
      :address="'Ditlev bergs Vej 102'"
    />
  </div>
</template>

<script>
import Tabs from '../components/Tabs'
import BookingItem from '../components/BookingItem'

const thisDay = new Date().getDay()
const thisMonth = new Date().getMonth()
const thisYear = new Date().getFullYear()

export default {
  name: 'Bookings',
  components: { BookingItem, Tabs },
  data() {
    return {
      date: new Date(thisYear, thisMonth, thisDay),
      events: [
        // examples
        {
          date: new Date(2020, thisMonth, 1),
          type: 'is-info'
        },
        {
          date: new Date(2020, thisMonth, 1),
          type: 'is-warning'
        },
        {
          date: new Date(2020, thisMonth, 1),
          type: 'is-success'
        },
        {
          date: new Date(2020, thisMonth, 1),
          type: 'is-warning'
        }
      ],
      bars: false
    }
  },
  computed: {
    indicators() {
      return this.bars ? 'bars' : 'dots'
    }
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
