<template>
  <div>
    <b-field>
      <b-button>New service</b-button>
    </b-field>
    <b-table v-if="services" :data="services">
      <b-table-column v-slot="props" width="100">
        <b-image :src="props.row.avatar"></b-image>
      </b-table-column>

      <b-table-column v-slot="props" label="Service name">
        <span>{{ props.row.name }}</span>
      </b-table-column>

      <b-table-column v-slot="props" label="Created on" centered>
        {{ formatDateTime(props.row.createdAt) }}
      </b-table-column>

      <b-table-column label="Actions"></b-table-column>
    </b-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Services',
  computed: {
    ...mapGetters('services', ['services'])
  },
  mounted() {
    this.getServices()
  },
  methods: {
    ...mapActions('services', ['getServices'])
  }
}
</script>
