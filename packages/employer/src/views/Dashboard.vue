<template>
  <div>
    <BarTop />
    <router-view class="content" />
    <BarBottom />
  </div>
</template>

<script>
import BarTop from '@/components/BarTop'
import BarBottom from '@/components/BarBottom'

export default {
  name: 'Dashboard',
  components: { BarTop, BarBottom }
}
</script>

<style>
.content {
  padding: 10px;
}
</style>
