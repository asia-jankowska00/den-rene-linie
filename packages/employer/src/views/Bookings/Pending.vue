<template>
  <div>
    <b-table v-if="bookingsPending" :data="bookingsPending">
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

          <b-button size="is-small" icon-left="times" @click.native="toggleRejectModal">
            Reject
          </b-button>
          <b-modal
            v-model="isRejectModalActive"
            has-modal-card
            :destroy-on-hide="false"
            aria-role="dialog"
            aria-modal
          >
            <template>
              <Modal
                title="Reject booking"
                @confirm="setBookingRejected(props.row._id)"
                @close="toggleRejectModal"
              >
                <b-field horizontal label="Reason for rejection">
                  <b-input type="textarea" v-model="rejectionReason"></b-input>
                </b-field>
              </Modal>
            </template>
          </b-modal>

          <b-button size="is-small" icon-left="credit-card" @click.native="togglePaymentModal">
            Payment
          </b-button>
          <b-modal
            v-model="isPaymentModalActive"
            has-modal-card
            :destroy-on-hide="false"
            aria-role="dialog"
            aria-modal
          >
            <template>
              <Modal
                title="Payment status"
                @close="togglePaymentModal"
                @confirm="setBookingPaid(props.row._id)"
              >
                <p>Is this booking paid for?</p>
              </Modal>
            </template>
          </b-modal>

          <b-button size="is-small" icon-left="check" @click.native="toggleApproveModal">
            Approve
          </b-button>
          <b-modal
            v-model="isApproveModalActive"
            has-modal-card
            :destroy-on-hide="false"
            aria-role="dialog"
            aria-modal
          >
            <template>
              <Modal
                title="Payment status"
                @close="toggleApproveModal"
                @confirm="setBookingApproved(props.row._id)"
              >
                <b-field horizontal label="Note">
                  <b-input type="textarea" v-model="approveNote"></b-input>
                </b-field>
                <b-field horizontal label="Price">
                  <b-input type="number" v-model="price"></b-input>
                </b-field>
                <b-field horizontal label="Payment details">
                  <b-input v-model="paymentDetails"></b-input>
                </b-field>
              </Modal>
            </template>
          </b-modal>
        </div>
      </b-table-column>
    </b-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Modal from '@/components/Modal.vue'

export default {
  name: 'Pending',
  components: {
    Modal
  },
  data() {
    return {
      isPaymentModalActive: false,
      isRejectModalActive: false,
      isApproveModalActive: false,
      rejectionReason: null,
      approveNote: null,
      price: null,
      paymentDetails: null
    }
  },
  computed: {
    ...mapGetters('bookings', ['bookingsPending'])
  },
  mounted() {
    this.getBookingsPending()
  },
  methods: {
    ...mapActions('bookings', ['getBookingsPending']),
    ...mapActions('bookings', ['updateBooking']),
    togglePaymentModal() {
      this.isPaymentModalActive = !this.isPaymentModalActive
    },
    toggleRejectModal() {
      this.isRejectModalActive = !this.isRejectModalActive
    },
    toggleApproveModal() {
      this.isApproveModalActive = !this.isApproveModalActive
    },
    async setBookingRejected(bookingId) {
      const bookingData = {
        status: 'dateDeclined',
        employerToClientNote: this.rejectionReason
      }
      await this.updateBooking({ bookingId, bookingData })
      await this.getBookingsPending()
      this.togglePaymentModal()
    },
    async setBookingPaid(bookingId) {
      const bookingData = {
        status: 'paid'
      }
      await this.updateBooking({ bookingId, bookingData })
      await this.getBookingsPending()
      this.toggleRejectModal()
    },
    async setBookingApproved(bookingId) {
      const bookingData = {
        price: this.price,
        paymentDetails: this.paymentDetails,
        employerToClientNote: this.approveNote,
        status: 'dateApproved'
      }
      await this.updateBooking({ bookingId, bookingData })
      await this.getBookingsPending()
      this.toggleApproveModal()
    }
  }
}
</script>
