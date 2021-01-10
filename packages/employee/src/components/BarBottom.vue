<template>
  <div class="bar-bottom">
    <div class="tabs is-toggle is-fullwidth">
      <ul>
        <router-link tag="li" to="/dashboard/bookings" active-class="is-active" exact>
          <a class="is-flex-direction-column">
            <b-icon pack="fas" icon="calendar-check" />
            <span>Bookings</span>
          </a>
        </router-link>
        <router-link tag="li" to="/dashboard/guides" active-class="is-active" exact>
          <a class="is-flex-direction-column">
            <b-icon pack="fas" icon="address-book" />
            <span>Guides</span>
          </a>
        </router-link>
        <router-link tag="li" to="/dashboard/notifications" active-class="is-active" exact>
          <a class="is-flex-direction-column">
            <b-icon pack="fas" icon="bell" />
            <span>Notifications</span>
          </a>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default { name: 'BarBottom' }
</script>

<style lang="scss">
.bar-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}

.b-tabs .tab-content {
  padding: 0;
}

.tabs {
  background: #ffffff;
}
</style>
