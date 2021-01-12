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
        <b-table v-if="activeEmployees && activeEmployees.length > 0" :data="activeEmployees">
          <b-table-column v-slot="props" field="avatar" label="Active" width="80">
            <b-image
              rounded
              :src="props.row.avatar ? props.row.avatar[0].url : placeholderAvatar"
            ></b-image>
          </b-table-column>

          <b-table-column v-slot="props">
            <span>{{ formatName(props.row) }}</span>
          </b-table-column>
        </b-table>

        <b-table v-else :data="noActiveEmployees">
          <b-table-column v-slot="props" label="Active">
            <p>{{ props.row }}</p>
          </b-table-column>
        </b-table>

        <b-table v-if="inactiveEmployees && inactiveEmployees.length > 0" :data="inactiveEmployees">
          <b-table-column v-slot="props" label="Inactive" width="80">
            <b-image :src="props.row.avatar"></b-image>
          </b-table-column>

          <b-table-column v-slot="props">
            <span>{{ formatName(props.row) }}</span>
          </b-table-column>
        </b-table>

        <b-table v-else :data="noInactiveEmployees">
          <b-table-column v-slot="props" label="Inactive">
            <p>{{ props.row }}</p>
          </b-table-column>
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
              {{ formatDate(props.row.startDate) }} -
              {{ formatDate(props.row.endDate) }}
            </p>
          </b-table-column>

          <b-table-column v-slot="props" label="Status">
            {{ props.row.status }}
          </b-table-column>

          <b-table-column v-slot="props" label="Actions">
            <div class="is-flex is-flex-direction-column">
              <b-button
                size="is-small"
                icon-left="envelope-open"
                tag="router-link"
                :to="`/dashboard/bookings/${props.row._id}`"
              >
                Open details
              </b-button>

              <b-button
                size="is-small"
                icon-left="user-plus"
                @click.native="toggleAssignEmployeeModal"
              >
                Assign employee
              </b-button>
              <b-modal
                v-model="isAssignEmployeeModalActive"
                has-modal-card
                :destroy-on-hide="false"
                aria-role="dialog"
                aria-modal
              >
                <template>
                  <Modal
                    title="Assign employee"
                    @close="toggleAssignEmployeeModal"
                    @confirm="setAssignedEmployees(props.row._id)"
                  >
                    <p>Select employee (ctrl + click to select multiple)</p>
                    <b-field>
                      <b-select expanded multiple v-model="selectedEmployees">
                        <option
                          v-for="(employee, index) in employees"
                          :key="index"
                          :value="employee._id"
                        >
                          <b-checkbox>{{ formatName(employee) }}</b-checkbox>
                        </option>
                      </b-select>
                    </b-field>
                  </Modal>
                </template>
              </b-modal>
            </div>
          </b-table-column>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import dayjs from 'dayjs'
import Modal from '@/components/Modal.vue'

export default {
  name: 'Approved',
  components: {
    Modal
  },
  data() {
    return {
      selectedDate: new Date(),
      isAssignEmployeeModalActive: false,
      selectedEmployees: [],
      noActiveEmployees: ['No active employees'],
      noInactiveEmployees: ['No inactive employees']
    }
  },
  computed: {
    ...mapGetters('bookings', ['bookingsApproved']),
    ...mapGetters('bookings', ['bookingsApprovedCalendarEvents']),
    ...mapGetters('bookings', ['bookingsForDate']),
    ...mapGetters('employees', ['employees']),
    ...mapGetters('employees', ['activeEmployees']),
    ...mapGetters('employees', ['inactiveEmployees'])
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
    ...mapActions('bookings', ['getBookingsForDate']),
    ...mapActions('bookings', ['updateBooking']),
    toggleAssignEmployeeModal() {
      this.isAssignEmployeeModalActive = !this.isAssignEmployeeModalActive
    },
    async setAssignedEmployees(bookingId) {
      const bookingData = {
        status: 'employeeAssigned',
        assignedEmployees: this.selectedEmployees
      }
      await this.updateBooking({ bookingId, bookingData })
      await this.getBookingsApproved()

      const endDate = dayjs(this.selectedDate).add(1, 'day').toDate()
      await this.getBookingsForDate({ dayStart: this.selectedDate, dayEnd: endDate })
      this.toggleAssignEmployeeModal()
    }
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

  //   @media screen and (min-width: 1920px) {
  //     padding: 1.7vw 2.7vw 1.7vw 2.7vw;
  // }
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
