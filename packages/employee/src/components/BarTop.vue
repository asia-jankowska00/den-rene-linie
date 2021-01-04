<template>
  <div class="bar-top">
    <div class="tabs is-toggle is-fullwidth">
      <ul>
        <router-link tag="li" to="/dashboard/profile" active-class="is-active" exact>
          <a class="is-flex-direction-column">
            <b-icon pack="fas" icon="user-cog" />
            <span>Profile</span>
          </a>
        </router-link>
        <li>
          <a class="logo">
            <span>logo</span>
          </a>
        </li>
        <router-link tag="li" to="/dashboard/chat" active-class="is-active" exact>
          <a class="is-flex-direction-column">
            <b-icon pack="fas" icon="comments" />
            <span>Chat</span>
          </a>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default { name: 'BarTop' }
</script>

<style lang="scss" scoped>
.bar-top {
  z-index: 100;
  background-color: white;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
}
</style>
