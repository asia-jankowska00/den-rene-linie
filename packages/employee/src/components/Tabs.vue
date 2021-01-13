<template>
  <div class="tabs is-expanded is-fullwidth">
    <ul>
      <router-link tag="li" to="bookings" active-class="is-active" exact>
        <a>Schedule</a>
      </router-link>
      <router-link tag="li" to="timesheets" active-class="is-active" exact>
        <a>Timesheets</a>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Tabs'
}
</script>

<style lang="scss">
.tabs{
  &:not(:last-child){
    padding-top: .4rem;
    margin-bottom: .8rem;
  }
  ul{
    margin: 0;
    li{
      a{
        font-weight: bold;
        border-bottom-width: 2px;
        color: #A0A3BD;
      }
      &.is-active{
        a{
          border-bottom-color: #275A64;
          color: #275A64;
        }
      }
    }
  }
  
}
</style>
