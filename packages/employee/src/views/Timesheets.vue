<template>
  <div>
    <Tabs />
    <div class="columns">
    <b-field label="From" class="column is-half">
      <b-datepicker v-model="selectedStartDate" placeholder="Click to select..."></b-datepicker>
    </b-field>
    <b-field label="To" class="column is-half">
      <b-datepicker v-model="selectedEndDate" placeholder="Click to select..."></b-datepicker>
    </b-field>
    </div>
    <div class="control is-flex is-justify-content-center">
      <b-button class="is-primary" @click="getTimesheet">Get report</b-button>
    </div>

    <div v-if="stopwatches" class="card p-5">
      <div class="content is-flex is-flex-direction-column">
        <div class="is-fullwidth">
          <p class="title is-4">Total hours for selected range:</p>
        </div>
        <div class="is-fullwidth is-align-self-flex-end mt-5">
          <p class="title is-5">{{ totalHours }}</p>
        </div>
      </div>
    </div>

    <div v-if="stopwatches" class="my-5">
      <hr />
      <h2 class="title is-4">Search results</h2>

      <b-table :data="stopwatches">
        <b-table-column v-slot="props" label="Job name" centered>
          <span>{{ props.row.booking.service.name }}</span>
        </b-table-column>

        <b-table-column v-slot="props" label="Start">
          <span>{{ formatDateTime(props.row.startDate) }}</span>
        </b-table-column>
        <b-table-column v-slot="props" label="End">
          <span>{{ formatDateTime(props.row.endDate) }}</span>
        </b-table-column>
        <b-table-column v-slot="props" label="Duration">
          <span>
            {{ formatDuration(dayjs(props.row.endDate).diff(dayjs(props.row.startDate))) }}
          </span>
        </b-table-column>
      </b-table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Tabs from '../components/Tabs'
import dayjs from 'dayjs'

export default {
  name: 'Timesheets',
  components: { Tabs },
  data() {
    return {
      selectedStartDate: new Date(),
      selectedEndDate: new Date(),
      totalHours: null
    }
  },
  computed: {
    ...mapGetters('user', ['user']),
    ...mapGetters('stopwatches', ['stopwatches'])
  },
  methods: {
    ...mapActions('stopwatches', ['getStopwatches']),
    async getTimesheet() {
      await this.getStopwatches({
        employeeId: this.user._id,
        fromDate: this.selectedStartDate,
        toDate: this.selectedEndDate
      })

      this.getTotalHours()
    },
    getTotalHours() {
      if (this.stopwatches && this.stopwatches.length > 0) {
        const hours = this.stopwatches.map((stopwatch) =>
          dayjs(stopwatch.endDate).diff(dayjs(stopwatch.startDate))
        )
        const hoursAdded = hours.reduce((accumulator, currentValue) => accumulator + currentValue)
        this.totalHours = this.formatDuration(hoursAdded)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.is-half {
  width: 40%;
  display: inline-block;
}

</style>
