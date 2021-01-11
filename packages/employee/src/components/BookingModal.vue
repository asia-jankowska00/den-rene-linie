<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <h4 class="modal-card-title m-0">{{ title }}</h4>
      <button type="button" class="delete" @click="$emit('close')" />
    </header>
    <section class="modal-card-body">
      <slot></slot>
    </section>
    <footer class="modal-card-foot is-justify-content-center"></footer>
  </div>
</template>

<script>
export default {
  name: 'BookingModal',
  props: {
    title: {
      type: String,
      default: 'Title'
    }
  }
}
</script>

<style scoped>
@media screen and (max-width: 768px) {
  .modal .animation-content {
    display: flex;
    width: auto !important;
  }
}
</style>
