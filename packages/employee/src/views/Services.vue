<template>
  <section>
    <div class="content">
      <h2>Service guides</h2>
      <div class="columns is-mobile is-multiline is-3 is-variable">
        <ServiceItem class="column is-half" />
        <ServiceItem class="column is-half" />
        <ServiceItem class="column is-half" />
        <ServiceItem class="column is-half" />
        <ServiceItem class="column is-half" />
      </div>
    </div>
  </section>
</template>

<script>
import ServiceItem from '../components/ServiceItem'
export default {
  name: 'Services',
  components: { ServiceItem }
}
</script>

<style lang="scss" scoped>
.columns {
  margin-top: 0;
}
</style>
