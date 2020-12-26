<template>
  <div class="wrapper is-flex is-flex-direction-column">
    <BarTop/>
    <div class="columns is-flex content-box">
      <BarSide class="column is-one-fifth"/>
      <router-view class="column" />
    </div>
  </div>
</template>

<script>
import BarTop from '@/components/BarTop'
import BarSide from '@/components/BarSide'

export default {
  name: 'Dashboard',
  components: { BarTop, BarSide }
}
</script>

<style scoped>
.wrapper {
  flex: 1 !important;
}

.columns {
  height: 100%
}
</style>
