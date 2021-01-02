<template>
  <div>
    <div class="columns">
      <div class="column">
        <b-datepicker
          v-model="selectedDate"
          class="column"
          inline
          :events="bookingsApprovedCalendarEvents"
          indicators="bars"
        ></b-datepicker>
      </div>
      <div class="column">
        <b-table v-if="employees" :data="employees">
          <b-table-column v-slot="props" field="avatar" label="Active" width="100">
            <b-image :src="props.row.avatar"></b-image>
          </b-table-column>

          <b-table-column v-slot="props">
            <span>{{ formatName(props.row) }}</span>
          </b-table-column>

          <b-table-column>Inactive</b-table-column>
        </b-table>
        <b-table v-if="employees" :data="employees">
          <b-table-column v-slot="props" label="Inactive" width="100">
            <b-image :src="props.row.avatar"></b-image>
          </b-table-column>

          <b-table-column v-slot="props">
            <span>{{ formatName(props.row) }}</span>
          </b-table-column>

          <b-table-column>Inactive</b-table-column>
        </b-table>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <b-table v-if="bookingsForDate" :data="bookingsForDate">
          <b-table-column v-slot="props" width="100">
            <b-image :src="props.row.avatar"></b-image>
          </b-table-column>

          <b-table-column v-slot="props" label="Business Details">
            <span>{{ formatName(props.row.client) }}</span>
          </b-table-column>

          <b-table-column v-slot="props" label="Date">
            <p>
              {{ dayjs(props.row.startDate).format('DD/MM/YYYY') }} -
              {{ dayjs(props.row.endDate).format('DD/MM/YYYY') }}
            </p>
          </b-table-column>

          <b-table-column v-slot="props" label="Status">
            {{ props.row.status }}
          </b-table-column>

          <b-table-column v-slot="props" label="Actions">
            <router-link :to="`/dashboard/bookings/${props.row._id}`">
              <b-icon icon="envelope-open"></b-icon>
            </router-link>
          </b-table-column>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import dayjs from 'dayjs'

export default {
  name: 'Approved',
  data() {
    return {
      selectedDate: new Date()
    }
  },
  computed: {
    ...mapGetters('bookings', ['bookingsApproved']),
    ...mapGetters('bookings', ['bookingsApprovedCalendarEvents']),
    ...mapGetters('bookings', ['bookingsForDate']),
    ...mapGetters('employees', ['employees'])
  },
  watch: {
    selectedDate(newDate) {
      const endDate = dayjs(newDate).add(1, 'day').toDate()
      this.getBookingsForDate({ dayStart: newDate, dayEnd: endDate })
    }
  },
  mounted() {
    this.getEmployees()
    this.getBookingsApproved()
    this.getBookingsForDate({
      dayStart: new Date(),
      dayEnd: dayjs(new Date()).add(1, 'day').toDate()
    })
  },
  methods: {
    ...mapActions('bookings', ['getBookingsApproved']),
    ...mapActions('employees', ['getEmployees']),
    ...mapActions('bookings', ['getBookingsForDate'])
  }
}
</script>

<style scoped lang="scss">
/deep/ .datepicker .dropdown-content {
  box-shadow: none;
}

/deep/ .datepicker .datepicker-table .datepicker-body .datepicker-cell,
.datepicker .datepicker-table .datepicker-body.datepicker-body.has-events .datepicker-cell {
  padding: 2vw 3.5vw 2vw 3.5vw;
}

/deep/
  .datepicker
  .datepicker-table
  .datepicker-body.has-events
  .datepicker-cell.has-event
  .events
  .event {
  padding: 0.3rem;
}
</style>
