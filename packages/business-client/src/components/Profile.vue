<template>
  <div class="profile p-5">
    <div class="media">
      <div class="image media-left">
        <img
          class="image is-rounded is-64x64"
          :src="user.avatar ? user.avatar.url : placeholderAvatar"
        />
      </div>
      <div class="media-content">
        <h4>{{ formatName(user) }}</h4>
      </div>
      <div class="media-right">
        <b-button>
          <b-icon pack="fas" icon="edit"></b-icon>
        </b-button>
      </div>
    </div>

    <b-menu-list>

      <b-menu-item
        class="btn"
        icon="bell"
        label="Notification settings"
        ></b-menu-item>

      <b-menu-item
        class="btn"
        icon="envelope"
        label="Change email"
        ></b-menu-item>

      <b-menu-item
        class="btn"
        @click="logoutUser"
        icon="sign-out-alt"
        label="Log out"
        ></b-menu-item>

    </b-menu-list>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Profile',
  computed: {
    ...mapGetters('user', ['user'])
  },
  methods: {
    ...mapActions('user', ['logout']),
    logoutUser: function () {
      this.logout().then(() => {
        this.$router.push('/')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.profile{
  background: linear-gradient(180deg, #275A64 0%, rgba(0, 178, 159, 0.85) 100%);
  min-height: 100%;
  max-height: 100%;
  color: white;    
}

</style>