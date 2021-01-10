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
            <div class="is-16by9 is-flex is-justify-content-center">
              <img class="image is-64x64 is-centered" :src="service.image[0].url" />
            </div>
            <div class="card-content">
              <p class="title is-5 has-text-centered">{{ service.name }}</p>
            </div>
            <footer class="card-footer">
              <b-button
                href="#"
                class="card-footer-item"
                @click.native="
                  toggleServiceModal()
                  updateSelectedService(service)
                "
              >
                View
              </b-button>
            </footer>
          </div>
        </article>
      </div>
    </div>
    <b-modal
      v-if="selectedService"
      v-model="isServiceModalActive"
      has-modal-card
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-modal
    >
      <template>
        <ServiceModal
          :title="selectedService.name"
          @close="toggleServiceModal"
          @confirm="
            toggleBookingCheckoutModal()
            toggleServiceModal()
          "
        >
          <p>{{ selectedService.description }}</p>
          <ul>
            <li v-for="task in selectedService.serviceTasks" :key="task._id">{{ task.name }}</li>
          </ul>
        </ServiceModal>
      </template>
    </b-modal>
    <b-modal
      v-model="isBookingCheckoutModalActive"
      has-modal-card
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-modal
    >
      <template>
        <BookingCheckoutModal @close="toggleBookingCheckoutModal"></BookingCheckoutModal>
      </template>
    </b-modal>
  </section>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import ServiceModal from '@/components/ServiceModal.vue'
import BookingCheckoutModal from '@/components/BookingCheckoutModal.vue'

export default {
  name: 'Services',
  components: {
    ServiceModal,
    BookingCheckoutModal
  },
  data() {
    return {
      isServiceModalActive: false,
      isBookingCheckoutModalActive: false
    }
  },
  computed: {
    ...mapGetters('services', ['services']),
    ...mapGetters('services', ['selectedService'])
  },
  mounted() {
    this.getServices()
  },
  methods: {
    ...mapActions('services', ['getServices']),
    ...mapMutations('services', ['updateSelectedService']),
    toggleServiceModal() {
      this.isServiceModalActive = !this.isServiceModalActive
    },
    toggleBookingCheckoutModal() {
      this.isBookingCheckoutModalActive = !this.isBookingCheckoutModalActive
    }
  }
}
</script>

<style lang="scss" scoped>
.columns {
  margin-top: 0;
}
</style>
