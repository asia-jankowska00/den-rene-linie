<template>
  <div>
    <b-table v-if="employees" :data="employees">
      <b-table-column v-slot="props" width="100">
        <b-image :src="props.row.avatar"></b-image>
      </b-table-column>

      <b-table-column v-slot="props" label="Employee details">
        <span>{{ formatName(props.row) }}</span>
      </b-table-column>

      <b-table-column v-slot="props" label="Current status">
        {{ props.row.bookings.length ? 'Active' : 'Inactive' }}
      </b-table-column>

      <b-table-column v-slot="props" label="Assigned to" centered>
        <div v-if="props.row.bookings.length">
          <p v-for="booking in props.row.bookings" :key="booking._id">
            {{ booking.service.name }}
          </p>
        </div>
      </b-table-column>

      <b-table-column v-slot="props" label="Actions">
        <div class="is-flex is-flex-direction-column">
          <b-button size="is-small" icon-left="user" @click.native="toggleEmployeeModal(props.row)">
            View details
          </b-button>
        </div>
      </b-table-column>
    </b-table>
    <b-modal
      v-if="modalData"
      v-model="isEmployeeModalActive"
      has-modal-card
      aria-role="dialog"
      aria-modal
    >
      <template>
        <Modal title="Emplyee details" @close="toggleEmployeeModal" @confirm="toggleEmployeeModal">
          <b-field label="Full Name" horizontal>
            {{ formatName(modalData) }}
          </b-field>
          <b-field label="Details" horizontal>
            {{ modalData.description }}
          </b-field>
          <b-field label="Phone" horizontal>
            {{ modalData.phone }}
          </b-field>
          <b-field label="Email" horizontal>
            {{ modalData.email }}
          </b-field>
          <b-field label="Availability" horizontal>
            {{ modalData.availability }}
          </b-field>
          <b-field horizontal label="Assign to booking">
            <b-select v-if="bookingsApproved" v-model="selectedBooking" placeholder="Select a name">
              <option
                v-for="(booking, index) in bookingsApproved"
                :value="booking._id"
                :key="index"
              >
                {{ formatName(booking.client) + ' - ' + booking.service.name }}
              </option>
            </b-select>
            <b-button @click="setAssignedEmployees">Assign</b-button>
          </b-field>
        </Modal>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Modal from '@/components/Modal.vue'

export default {
  name: 'EmployeeList',
  components: {
    Modal
  },
  data() {
    return {
      isEmployeeModalActive: false,
      modalData: null,
      selectedBooking: null
    }
  },
  computed: {
    ...mapGetters('employees', ['employees']),
    ...mapGetters('bookings', ['bookingsApproved'])
  },
  mounted() {
    this.getEmployees()
    this.getBookingsApproved()
  },
  methods: {
    ...mapActions('employees', ['getEmployees']),
    ...mapActions('bookings', ['getBookingsApproved']),
    ...mapActions('bookings', ['updateBooking']),
    toggleEmployeeModal(data) {
      this.modalData = data
      this.isEmployeeModalActive = !this.isEmployeeModalActive
    },
    async setAssignedEmployees() {
      const bookingData = {
        status: 'employeeAssigned',
        assignedEmployees: [this.modalData._id]
      }
      await this.updateBooking({ bookingId: this.selectedBooking, bookingData })
      await this.getEmployees()
    }
  }
}
</script>

<style scoped>
tr {
  background: rgb(177, 236, 229);
}
table {
  border-spacing: 0px 10px;
}
</style>
