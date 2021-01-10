<template>
  <div class="modal-card" style="max-width: 100vw">
    <header class="modal-card-head">
      <p class="modal-card-title"></p>
      <button type="button" class="delete" @click="$emit('close')" />
    </header>
    <section class="modal-card-body">
      <b-steps
        v-model="activeStep"
        :animated="isAnimated"
        :rounded="isRounded"
        :has-navigation="hasNavigation"
        :icon-prev="prevIcon"
        :icon-next="nextIcon"
        :label-position="labelPosition"
        :mobile-mode="mobileMode"
      >
        <b-step-item step="1" label="Service" :clickable="isStepsClickable">
          <h1 class="title has-text-centered">Service</h1>
          <b-field label="Select service">
            <b-select placeholder="Service" :value="selectedService" @input="updateSelectedService">
              <option v-for="service in services" :key="service._id" :value="service">
                {{ service.name }}
              </option>
            </b-select>
          </b-field>

          <b-field label="Tasks in service">
            <b-select v-model="newBooking.tasks" multiple>
              <option
                v-for="(task, index) in selectedService.serviceTasks"
                :key="index"
                :value="task.name"
              >
                <b-checkbox>{{ task.name }}</b-checkbox>
              </option>
            </b-select>
          </b-field>

          <b-field label="Special instructions">
            <b-input
              v-model="newBooking.clientNote"
              type="textarea"
              placeholder="Anything specific you would like to tell us?"
            ></b-input>
          </b-field>
        </b-step-item>

        <b-step-item step="2" label="Timeframe" :clickable="isStepsClickable">
          <h1 class="title has-text-centered">Timeframe</h1>

          <b-field label="Preferred start date & time">
            <b-datetimepicker
              v-model="newBooking.startDate"
              placeholder="Click to select..."
              icon="calendar"
              :datepicker="{ showWeekNumber: true }"
              :timepicker="{ enableSeconds: false }"
              horizontal-time-picker
            ></b-datetimepicker>
          </b-field>

          <b-field label="Preferred end date & time">
            <b-datetimepicker
              v-model="newBooking.endDate"
              placeholder="Click to select..."
              icon="calendar"
              :datepicker="{ showWeekNumber: true }"
              :timepicker="{ enableSeconds: false }"
              horizontal-time-picker
            ></b-datetimepicker>
          </b-field>

          <b-field label="Selected frequency">
            <b-select v-model="newBooking.frequencyType">
              <option v-for="(type, index) in frequencyTypes" :key="index" :value="type">
                {{ type }}
              </option>
            </b-select>
          </b-field>

          <b-field
            class="fields-row is-flex is-flex-direction-row is-justify-content-space-between"
            horizontal
            label="For the next"
          >
            <b-input
              v-model="newBooking.frequencyDurationAmount"
              style="max-width: 50px"
              type="number"
            ></b-input>
            <b-select v-model="newBooking.frequencyDurationType">
              <option v-for="(type, index) in frequencyDurationTypes" :key="index" :value="type">
                {{ type }}
              </option>
            </b-select>
          </b-field>

          <b-field>
            <b-checkbox v-model="newBooking.meeting">I would like a personal meeting</b-checkbox>
          </b-field>
          <small>(By choosing this I agree to the associated extra cost)</small>
        </b-step-item>

        <b-step-item step="3" label="Details" :clickable="isStepsClickable">
          <h1 class="title has-text-centered">Details</h1>
          <b-field label="Company name">
            <b-input></b-input>
          </b-field>
          <b-field label="Company CVR">
            <b-input></b-input>
          </b-field>
          <b-field label="Company Address">
            <b-input v-model="newBooking.address"></b-input>
          </b-field>
          <b-field label="Phone">
            <b-input :value="user.phone"></b-input>
          </b-field>
          <b-field label="Email">
            <b-input disabled :value="user.email"></b-input>
          </b-field>
          <b-field label="Approximate size (m2)">
            <b-input v-model="newBooking.size"></b-input>
          </b-field>
        </b-step-item>

        <b-step-item step="4" label="Overview" :clickable="isStepsClickable">
          <h1 class="title has-text-centered">Overview</h1>
          <h4 class="subtitle">Service details</h4>
          <b-field>
            {{ selectedService.name }}
          </b-field>
          <b-field>
            <b-tag v-for="(task, index) in selectedService.serviceTasks" :key="index" :value="task">
              {{ task.name }}
            </b-tag>
          </b-field>
          <b-field>
            {{
              newBooking.clientNote ? newBooking.clientNote : 'No special instructions'
            }}
          </b-field>
          <hr />
          <h4 class="subtitle">Timeframe details</h4>
          <b-field label="Start date">
            {{ formatDateTime(newBooking.startDate) }}
          </b-field>
          <b-field label="End date">
            {{ formatDateTime(newBooking.endDate) }}
          </b-field>
          <b-field>Personal meeting: {{ newBooking.meeting ? 'Yes' : 'No' }}</b-field>
          <hr />
          <h4 class="subtitle">Company details</h4>
          <b-field label="Address">
            {{ newBooking.address }}
          </b-field>
          <b-field label="Phone">
            {{ user.phone }}
          </b-field>
          <b-field label="Email">
            {{ user.email }}
          </b-field>
          <hr />
          <b-field>
            <b-checkbox v-model="newBooking.termsOfService">
              I accept the Terms of Service
            </b-checkbox>
          </b-field>
        </b-step-item>

        <template v-if="customNavigation" slot="navigation" slot-scope="{ previous, next }">
          <b-button
            outlined
            type="is-danger"
            icon-pack="fas"
            icon-left="backward"
            :disabled="previous.disabled"
            @click.prevent="previous.action"
          >
            Previous
          </b-button>
          <b-button
            outlined
            type="is-success"
            icon-pack="fas"
            icon-right="forward"
            :disabled="next.disabled"
            @click.prevent="next.action"
          >
            Next
          </b-button>
        </template>
      </b-steps>
    </section>
    <footer class="modal-card-foot is-justify-content-space-between">
      <b-button
        class="button"
        type="button"
        @click="
          $emit('close')
          resetSteps()
        "
      >
        Cancel
      </b-button>
      <b-button
        :disabled="!canBook"
        class="button is-primary"
        @click="
          $emit('confirm')
          createNewBooking()
        "
      >
        Confirm
      </b-button>
    </footer>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { SnackbarProgrammatic as Snackbar } from 'buefy'

export default {
  name: 'BookingCheckoutModal',
  data() {
    return {
      activeStep: 0,

      isAnimated: true,
      isRounded: true,
      isStepsClickable: false,

      hasNavigation: true,
      customNavigation: false,

      canBook: false,

      prevIcon: 'chevron-left',
      nextIcon: 'chevron-right',
      labelPosition: 'bottom',
      mobileMode: 'compact',

      frequencyTypes: ['one_time', 'daily', 'weekly', 'monthly', 'yearly', 'on_weekends'],
      frequencyDurationTypes: ['days', 'weeks', 'months', 'years'],

      newBooking: {
        client: this.user ? this.user._id : '',
        startDate: null,
        endDate: null,
        address: null,
        size: null,
        clientNote: null,
        service: this.selectedService ? this.selectedService._id : null,
        tasks: this.selectedService
          ? this.selectedService.serviceTasks.map((task) => {
              return task.name
            })
          : [],
        isRecurring: this.frequencyType === 'one_time' ? false : true,
        frequencyType: 'one_time',
        frequencyDurationAmount: null,
        frequencyDurationType: null,
        status: 'pending',
        termsOfService: false
      }
    }
  },
  computed: {
    ...mapGetters('user', ['user']),
    ...mapGetters('services', ['services']),
    ...mapGetters('services', ['selectedService']),
    ...mapGetters('bookings', ['createdBooking']),
    ...mapGetters('tasks', ['newTasks'])
  },
  watch: {
    activeStep() {
      this.canBook = this.activeStep === 3 ? true : false
    },
    selectedService() {
      this.newBooking = {
        client: this.user ? this.user._id : '',
        startDate: null,
        endDate: null,
        address: null,
        size: null,
        clientNote: null,
        service: this.selectedService ? this.selectedService._id : null,
        tasks: this.selectedService.serviceTasks.map((task) => task.name),
        isRecurring: this.frequencyType === 'one_time' ? false : true,
        frequencyType: 'one_time',
        frequencyDurationAmount: null,
        frequencyDurationType: null,
        status: 'pending',
        termsOfService: false
      }
    }
  },
  mounted() {
    this.newBooking = {
      client: this.user ? this.user._id : '',
      startDate: new Date(),
      endDate: new Date(),
      address: null,
      size: null,
      clientNote: null,
      service: this.selectedService ? this.selectedService._id : null,
      tasks: this.selectedService.serviceTasks.map((task) => task.name),
      isRecurring: this.frequencyType === 'one_time' ? false : true,
      frequencyType: 'one_time',
      frequencyDurationAmount: null,
      frequencyDurationType: null,
      status: 'pending',
      termsOfService: false
    }
  },
  methods: {
    ...mapMutations('services', ['updateSelectedService']),
    ...mapActions('bookings', ['createBooking']),
    ...mapActions('bookings', ['updateBooking']),
    ...mapActions('tasks', ['createTask']),
    ...mapMutations('tasks', ['clearNewTasks']),
    async createNewBooking() {
      if (!this.newBooking.termsOfService) {
        Snackbar.open({ position: 'is-top', message: 'You need to accept the Terms of Service' })
        return
      }

      await Promise.all(
        this.newBooking.tasks.map((task) => {
         return this.createTask({
            name: task
          })
        })
      )

      const createdTasksIds =  this.newTasks.map((task) => task._id)
      this.newBooking.tasks = createdTasksIds

      await this.createBooking(this.newBooking)

      this.clearNewTasks()
      this.$router.push('/dashboard/bookings')
    },
    resetSteps() {
      this.activeStep = 0
    }
  }
}
</script>

<style scoped lang="scss">
/deep/ .fields-row .field {
  display: inline-block;
}

/deep/ .step-items {
  margin: 0;
}

/deep/ .step-item {
  list-style: none;
}

@media screen and (max-width: 768px) {
  .modal .animation-content {
    width: auto !important;
  }
}
</style>
