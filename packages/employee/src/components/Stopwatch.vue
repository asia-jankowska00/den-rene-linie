<template>
  <div id="clock" class="card p-3">
    <span class="time">{{ formattedElapsedTime }}</span>
    <div class="btn-container">
      <b-button tag="a" type="is-primary is-light" @click="start">Start</b-button>
      <b-button tag="a" type="is-danger is-light" @click="stop">Stop</b-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Stopwatch',
  data() {
    return {
      elapsedTime: 0,
      timer: undefined
    }
  },
  computed: {
    ...mapGetters('user', ['user']),
    ...mapGetters('bookings', ['selectedBooking']),
    ...mapGetters('stopwatches', ['newStopwatch']),
    formattedElapsedTime() {
      const date = new Date(null)
      date.setSeconds(this.elapsedTime / 1000)
      const utc = date.toUTCString()
      return utc.substr(utc.indexOf(':') - 2, 8)
    }
  },
  methods: {
    ...mapActions('stopwatches', ['createStopwatch']),
    ...mapActions('stopwatches', ['updateStopwatch']),
    start() {
      const newStopwatch = {
        employee: this.user._id,
        startDate: new Date(),
        booking: this.selectedBooking._id
      }
      this.createStopwatch(newStopwatch)
      this.timer = setInterval(() => {
        this.elapsedTime += 1000
      }, 1000)
    },
    stop() {
      this.updateStopwatch({
        stopwatchId: this.newStopwatch._id,
        data: {
          endDate: new Date()
        }
      })
      clearInterval(this.timer)
      this.reset()
    },
    reset() {
      this.elapsedTime = 0
    }
  }
}
</script>

<style lang="scss" scoped>
#clock {
  display: flex;
  flex-direction: column;
  align-items: center;

  .time {
    font-size: 2.4rem;
  }
  .btn-container {
    display: flex;
    margin-top: 15px;
    width: 100%;

    a {
      text-align: center;
      //background: white;
      padding: 10px 15px;
      width: 100%;
      text-transform: uppercase;
      font-size: 1rem;
      flex-grow: 1;
      border-radius: 0;
    }
  }
}
</style>
