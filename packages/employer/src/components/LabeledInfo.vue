<template>
  <div class="columns is-flex is-align-items-center my-3">
    <h3 class="column title is-6 m-0">{{ label }}</h3>
    <p class="column">{{ text }}</p>
  </div>
</template>

<script>
export default {
  name: 'LabeledInfo',
  props: {
    label: String,
    text: String
  }
}
</script>

<style></style>
