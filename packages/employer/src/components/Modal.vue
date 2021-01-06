<template>
  <div class="modal-card" style="min-width: 400px">
    <header class="modal-card-head">
      <p class="modal-card-title">{{ title }}</p>
      <button type="button" class="delete" @click="$emit('close')" />
    </header>
    <section class="modal-card-body">
      <slot></slot>
    </section>
    <footer class="modal-card-foot is-justify-content-space-between">
      <button class="button" type="button" @click="$emit('close')">Cancel</button>
      <button class="button is-primary" @click="$emit('confirm')">Confirm</button>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    title: {
      type: String,
      default: 'Title'
    }
  }
}
</script>

<style scoped>
.modal-card {
  min-width: 400px !important;
}
</style>
