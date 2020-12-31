<template>
  <b-table v-if="bookingsPending" :data="bookingsPending">
    <b-table-column v-slot="props" width="100">
      <b-image :src="props.row.avatar"></b-image>
    </b-table-column>

    <b-table-column v-slot="props" label="Business Details">
      <span>{{ props.row.client.firstName + ' ' + props.row.client.lastName }}</span>
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
