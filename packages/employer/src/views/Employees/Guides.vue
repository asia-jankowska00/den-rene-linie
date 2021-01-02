<template>
  <div>
    <b-field>
      <b-button>New service</b-button>
    </b-field>
    <b-table v-if="guides" :data="guides">
      <b-table-column v-slot="props" width="100">
        <b-image :src="props.row.avatar"></b-image>
      </b-table-column>

      <b-table-column v-slot="props" label="Guide name">
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
  name: 'Guides',
  computed: {
    ...mapGetters('guides', ['guides'])
  },
  mounted() {
    this.getGuides()
  },
  methods: {
    ...mapActions('guides', ['getGuides'])
  }
}
</script>
