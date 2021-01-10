<template>
  <section>
    <div class="content">
      <h2>Guides</h2>
      <div class="columns is-mobile is-multiline is-3 is-variable">
     <article
          v-for="guide in guides"
          :key="guide._id"
          tag="article"
          to=""
          class="column is-half"
        >
          <div class="card">
            <div class="is-16by9 is-flex is-justify-content-center">
              <img class="image is-64x64 is-centered" :src="guide.image ? guide.image[0].url : placeholderAvatar" />
            </div>
            <div class="card-content">
              <p class="title is-5 has-text-centered">{{ guide.name }}</p>
            </div>
            <footer class="card-footer">
              <b-button
                href="#"
                class="card-footer-item"
              >
                View
              </b-button>
            </footer>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Services',
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
