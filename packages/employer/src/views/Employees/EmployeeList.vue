<template>
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

    <b-table-column label="Actions"></b-table-column>
  </b-table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'EmployeeList',
  computed: {
    ...mapGetters('employees', ['employees'])
  },
  mounted() {
    this.getEmployees()
  },
  methods: {
    ...mapActions('employees', ['getEmployees'])
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
