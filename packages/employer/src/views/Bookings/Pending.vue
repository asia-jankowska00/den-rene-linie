<template>
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
      <router-link :to="`/dashboard/bookings/${props.row._id}`"><b-icon icon="envelope-open" ></b-icon></router-link>
    </b-table-column>
  </b-table>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Pending',
  computed: {
    ...mapGetters('bookings', ['bookingsPending'])
  },
  mounted() {
    this.getBookingsPending()
  },
  methods: {
    ...mapActions('bookings', ['getBookingsPending'])
  }
}
</script>
