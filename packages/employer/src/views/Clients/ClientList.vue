<template>
  <div>
    <b-table v-if="clients" :data="clients">
      <b-table-column v-slot="props" width="100">
        <b-image :src="props.row.avatar"></b-image>
      </b-table-column>

      <b-table-column v-slot="props" label="Client details">
        <span>{{ formatName(props.row) }}</span>
      </b-table-column>

      <b-table-column v-slot="props" label="Bookings" centered>
        <div v-if="props.row.bookings.length">
          <p v-for="(booking, index) in props.row.bookings" :key="index">
            {{ booking.service.name }}
          </p>
        </div>
      </b-table-column>

      <b-table-column v-slot="props" label="Actions">
        <div class="is-flex is-flex-direction-column">
          <b-button size="is-small" icon-left="user" @click.native="toggleClientModal(props.row)">
            View details
          </b-button>
        </div>
      </b-table-column>
    </b-table>
    <b-modal
      v-if="modalData"
      v-model="isClientModalActive"
      has-modal-card
      aria-role="dialog"
      aria-modal
    >
      <template>
        <Modal title="Client details" @close="toggleClientModal" @confirm="toggleClientModal">
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
          <b-field v-if="modalData.bookings" label="Bookings" horizontal>
            <p v-for="(booking, index) in modalData.bookings" :key="index">
              {{ booking.service.name }}
            </p>
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
  name: 'ClientList',
  components: {
    Modal
  },
  data() {
    return {
      isClientModalActive: false,
      modalData: null
    }
  },
  computed: {
    ...mapGetters('clients', ['clients'])
  },
  mounted() {
    this.getClients()
  },
  methods: {
    ...mapActions('clients', ['getClients']),
    toggleClientModal(data) {
      this.modalData = data
      this.isClientModalActive = !this.isClientModalActive
    }
  }
}
</script>
