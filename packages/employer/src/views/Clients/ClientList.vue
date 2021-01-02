<template>
  <b-table v-if="clients" :data="clients">
    <b-table-column v-slot="props" width="100">
      <b-image :src="props.row.avatar"></b-image>
    </b-table-column>

    <b-table-column v-slot="props" label="Client details">
      <span>{{ formatName(props.row) }}</span>
    </b-table-column>

    <b-table-column v-slot="props" label="Bookings" centered>
      <div v-if="props.row.bookings.length">
        <p v-for="booking in props.row.bookings" :key="booking._id">
          {{ booking.service.name }}
        </p>
      </div>
    </b-table-column>

    <b-table-column label="Actions"></b-table-column>
  </b-table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ClientList',
  computed: {
    ...mapGetters('clients', ['clients'])
  },
  mounted() {
    this.getClients()
  },
  methods: {
    ...mapActions('clients', ['getClients'])
  }
}
</script>
