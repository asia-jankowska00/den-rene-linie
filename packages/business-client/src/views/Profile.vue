<template>
  <div class="profile is-flex is-flex-direction-column">
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
    <div class="settings is-flex is-flex-direction-column">
      <b-button class="p-5" icon-left="bell">Notification&nbsp;settings</b-button>
      <b-button class="p-5" icon-left="envelope">Change&nbsp;email</b-button>
      <b-button class="p-5" icon-left="sign-out-alt" @click="logoutUser">Log&nbsp;out</b-button>
    </div>
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
