<template>
  <li>
    <div class="field">
      <b-checkbox v-model="isComplete">{{ task }}</b-checkbox>
    </div>
  </li>
</template>

<script>
export default {
  name: 'TaskItem',
  props: ['task'],
  data() {
    return {
      isComplete: false
    }
  }
}
</script>
