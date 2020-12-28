<template>
  <div class="wrapper is-flex is-flex-direction-column">
    <BarTop />
    <div class="columns is-flex">
      <BarSide class="column sidebar" />
      <router-view class="column p-4" />
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

<style lang="scss" scoped>
.wrapper {
  flex: 1 !important;
}

.sidebar {
  flex: none;
  width: 17.5%;
}

.columns {
  height: 100%;
}
</style>
