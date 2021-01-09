<template>
  <article class="card">
    <section class="client content is-flex is-flex-direction-column">
      <div class="is-flex is-flex-direction-row is-justify-content-space-between">
        <div class="image">
          <img
            class="image is-rounded is-64x64"
            v-if="!image"
            src="https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
          />
          <img class="image is-rounded is-64x64" v-else :src="image" />
        </div>
        <div class="container">
          <strong>
            <p class="is-flex is-flex-direction-row is-justify-content-space-between">
              <span>{{ client }}Clients name</span>
              <span>{{ startHour }}20:00-00:00{{ endHour }}</span>
            </p>
          </strong>
          <small>Address: {{ address }}</small>
        </div>
      </div>
    </section>
    <section class="service">
      <h3>Service name</h3>
      <div class="content">
        <ul>
          <TaskItem />
        </ul>
      </div>
      <h3>Clients note</h3>
      <div class="content">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, minus.</p>
      </div>
    </section>
    <Stopwatch />
  </article>
</template>

<script>
import Stopwatch from '../components/Stopwatch'
import TaskItem from '../components/TaskItem'
export default {
  name: 'Booking',
  components: { Stopwatch, TaskItem },
  props: ['image', 'client', 'startHour', 'endHour', 'address'],
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.client {
  .container {
    margin-left: 10px;
  }
}
.service {
  ul {
    list-style: none;
  }
}
</style>
