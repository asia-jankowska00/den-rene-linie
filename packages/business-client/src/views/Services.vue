<template>
  <section>
    <div>
      <h2>Services</h2>
      <div class="columns is-mobile is-multiline is-3 is-variable">
        <article
          v-for="service in services"
          :key="service._id"
          tag="article"
          to=""
          class="column is-half"
        >
          <div class="card">
            <div class="image is-16by9">
              <img class="image" :src="formatImageUrl(service.image[0].url)" />
            </div>
            <div class="card-content">
              <p class="title is-5">{{ service.name }}</p>
            </div>
            <footer class="card-footer">
              <b-button
                href="#"
                class="card-footer-item"
                @click.native="toggleServiceModal(service)"
              >
                View
              </b-button>
            </footer>
          </div>
        </article>
      </div>
    </div>
    <b-modal
      v-if="modalData"
      v-model="isServiceModalActive"
      has-modal-card
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-modal
    >
      <template>
        <ServiceModal :title="modalData.name" @close="toggleServiceModal">
          <p>{{ modalData.description }}</p>
          <ul>
            <li v-for="task in modalData.serviceTasks" :key="task._id">{{ task.name }}</li>
          </ul>
        </ServiceModal>
      </template>
    </b-modal>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ServiceModal from '@/components/ServiceModal.vue'

export default {
  name: 'Services',
  components: {
    ServiceModal
  },
  data() {
    return {
      isServiceModalActive: false,
      modalData: null
    }
  },
  computed: {
    ...mapGetters('services', ['services'])
  },
  mounted() {
    this.getServices()
  },
  methods: {
    ...mapActions('services', ['getServices']),
    toggleServiceModal(data) {
      this.modalData = data
      this.isServiceModalActive = !this.isServiceModalActive
    }
  }
}
</script>

<style lang="scss" scoped>
.columns {
  margin-top: 0;
}
</style>
