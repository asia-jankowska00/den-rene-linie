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
export default {
  name: 'Stopwatch',
  data() {
    return {
      elapsedTime: 0,
      timer: undefined
    }
  },
  methods: {
    start() {
      this.timer = setInterval(() => {
        this.elapsedTime += 1000
      }, 1000)
    },
    stop() {
      clearInterval(this.timer)
    },
    reset() {
      this.elapsedTime = 0
    }
  },
  computed: {
    formattedElapsedTime() {
      const date = new Date(null)
      date.setSeconds(this.elapsedTime / 1000)
      const utc = date.toUTCString()
      return utc.substr(utc.indexOf(':') - 2, 8)
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
