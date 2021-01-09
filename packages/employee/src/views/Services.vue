<template>
  <section>
    <div class="content">
      <h2>Service guides</h2>
      <div class="columns is-mobile is-multiline is-3 is-variable">
        <ServiceItem class="column is-half" 
        v-for="g in guides" :key="g._id"
        :title="g.name"
        />
      </div>
    </div>
  </section>
</template>

<script>
import ServiceItem from '../components/ServiceItem'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Services',
  components: { ServiceItem },
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

<style lang="scss" scoped>
.columns {
  margin-top: 0;
}
</style>
