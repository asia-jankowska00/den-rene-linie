<template>
  <div>
    <div class="tabs is-toggle is-fullwidth">
      <ul>
        <li active-class="is-active" eact>
          <a class="is-flex-direction-column" @click="openProfile = !openProfile">
            <b-icon pack="fas" icon="user-cog" />
            <span>Profile</span>
          </a>
        </li>
        <li>
          <a class="logo">
            <span>logo</span>
          </a>
        </li>
        <li active-class="is-active" @click="openChat = !openChat">
          <a class="is-flex-direction-column">
            <b-icon pack="fas" icon="comments" />
            <span>Chat</span>
          </a>
        </li>
      </ul>
    </div>
    <b-sidebar v-model="openProfile" type="is-light" fullheight overlay>
      <Profile />
    </b-sidebar>
    <b-sidebar v-model="openChat" type="is-light"  fullheight fullwidth overlay right>
      <Chat @close="openChat = !openChat" />
    </b-sidebar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Profile from '@/components/Profile'
import Chat from '@/components/Chat'

export default {
  name: 'BarTop',
  components: { Profile, Chat },
  data() {
    return {
      openProfile: false,
      openChat: false
    }
  },
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

<style scoped lang="scss">
/deep/ .sidebar-content {
  max-height: 100vh !important;
  max-width: 100vw !important;
}
</style>
