<template>
  <div>
    <div class="card p-5 columns">
      <div class="card-content column is-two-thirds p-5">
        <b-field horizontal label="Select employee">
          <b-select v-model="selectedEmployee" placeholder="Select a name">
            <option v-for="employee in employees" :key="employee._id" :value="employee">
              {{ formatName(employee) }}
            </option>
          </b-select>
        </b-field>
        <b-field horizontal label="From">
          <b-datepicker v-model="selectedStartDate" placeholder="Click to select..."></b-datepicker>
        </b-field>
        <b-field horizontal label="To">
          <b-datepicker v-model="selectedEndDate" placeholder="Click to select..."></b-datepicker>
        </b-field>
        <div class="control">
          <button class="button" @click="getTimesheet">Get report</button>
        </div>

        <div v-if="stopwatches" class="my-5">
          <hr>
          <h2 class="title is-4">Search results for</h2>
          <b-field horizontal label="Employee name">
            {{ formatName(selectedEmployee) }}
          </b-field>
          <b-field horizontal label="Email">
            {{ selectedEmployee.email }}
          </b-field>

          <b-table :data="stopwatches">
            <b-table-column v-slot="props" label="Employee name">
              <span>{{ formatName(props.row.employee) }}</span>
            </b-table-column>

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
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Timesheets',
  data() {
    return {
      selectedEmployee: '',
      selectedStartDate: new Date(),
      selectedEndDate: new Date()
    }
  },
  computed: {
    ...mapGetters('employees', ['employees']),
    ...mapGetters('stopwatches', ['stopwatches'])
  },
  mounted() {
    this.getEmployees()
  },
  methods: {
    ...mapActions('employees', ['getEmployees']),
    ...mapActions('stopwatches', ['getStopwatches']),
    getTimesheet() {
      this.getStopwatches({
        employeeId: this.selectedEmployee._id,
        fromDate: this.selectedStartDate,
        toDate: this.selectedEndDate
      })
    }
  }
}
</script>

<style scoped>
.card {
  min-height: 90vh;
}
</style>
