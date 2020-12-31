<template>
  <div>
    <div class="card p-5 columns">
      <div v-if="currentBooking" class="card-content column is-two-thirds p-5">
        <h1 class="title">Booking #{{ currentBooking._id }}</h1>
        <hr />
        <h2 class="subtitle is-4">Client details</h2>
        <LabeledInfo
          label="Client Name"
          :text="currentBooking.client.firstName + ' ' + currentBooking.client.lastName"
        />
        <LabeledInfo label="Address" :text="currentBooking.client.description" />
        <LabeledInfo label="Telephone" :text="currentBooking.client.phone" />
        <LabeledInfo label="Email" :text="currentBooking.client.email" />
        <LabeledInfo label="Address" :text="currentBooking.address" />
        <LabeledInfo label="Size" :text="currentBooking.size ? currentBooking.size.toString() : 'unspecified'" />
        <hr />
        <h2 class="subtitle is-4">Service details</h2>
        <LabeledInfo label="Service name" :text="currentBooking.service.name" />
        <div class="columns is-flex is-align-items-center my-3">
          <h3 class="column title is-6 m-0">Service tasks</h3>
          <b-checkbox v-for="(task, index) in currentBooking.tasks" :key="index" disabled>
            {{ task.name }}
          </b-checkbox>
        </div>
        <LabeledInfo label="Client note" :text="currentBooking.clientNote" />
        <LabeledInfo label="Start date" :text="currentBooking.startDate" />
        <LabeledInfo label="End date" :text="currentBooking.endDate" />
        <LabeledInfo
          label="Recurring booking"
          :text="currentBooking.frequencyType ? 'Yes' : 'No'"
        />
        <LabeledInfo
          v-if="currentBooking.frequencyType"
          label="Recurring frequency"
          :text="`${currentBooking.frequencyType} for ${currentBooking.frequencyDurationAmount} ${currentBooking.frequencyDurationType}`"
        />
        <LabeledInfo label="In-person meeting" :text="currentBooking.meeting ? 'Yes' : 'No'" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import LabeledInfo from '@/components/LabeledInfo'

export default {
  name: 'Booking',
  components: {
    LabeledInfo
  },
  computed: {
    ...mapGetters('bookings', ['currentBooking'])
  },
  mounted() {
    this.getCurrentBooking(this.$route.params.id)
  },
  methods: {
    ...mapActions('bookings', ['getCurrentBooking'])
  }
}
</script>

<style></style>
