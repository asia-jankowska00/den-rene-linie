<template>
  <router-link :to="'bookings/'+id" class="card content is-flex is-flex-direction-column">
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
            <span>{{ client }}</span>
            <span>{{ startDate }}-{{ endDate }}</span>
          </p>
        </strong>
        <small>Address: {{ address }}</small>
      </div>
    </div>
    <div class="is-align-self-flex-end">
      <a>
        <b-icon pack="fas" icon="arrow-right" />
      </a>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'BookingItem',
  props: ['id', 'image', 'client', 'startDate', 'endDate', 'address'],
  data(){
    return{
      
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin-left: 10px;
}
</style>
