<template>
  <router-link tag="article" to="" class="card is-paddingless">
    <div class="image is-16by9">
      <img class="image" :src="image" />
    </div>
    <div class="content">
      <p class="title is-5">{{title}}</p>
    </div>
    <footer class="card-footer">
      <a href="#" class="card-footer-item">View</a>
    </footer>
  </router-link>
</template>

<script>
export default {
  name: 'ServiceItem',
  props: ['image', 'title']
}
</script>

<style lang="scss" scoped></style>
