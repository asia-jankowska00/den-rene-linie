<template>
  <div class="bar-top">
    <ul class="nav is-flex is-flex-direction-row is-justify-content-space-between">
      <li>
        <button @click="openProfile = !openProfile">
          <div class="image is-48x48">
            <img class="image is-rounded" :src="user.avatar ? user.avatar.url : placeholderAvatar"/>
          </div>
          Settings
        </button>
      </li>
      <li>
        <div class="logo"></div>
      </li>
      <li>
        <button @click="openChat = !openChat">
          <div class="image is-48x48">
            <b-icon size="is-medium" pack="fas" icon="comment-dots" />
          </div>
          Contact
        </button>
      </li>
    </ul>
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

<style lang="scss" scoped>
.bar-top{
  .nav{
    width: 100%;
    padding: .8rem .8rem 0 .8rem;
    li{
      width: fit-content;
      text-align: center;
      &:nth-child(2){
        width: 8rem;
      }
      button{
        background-color: transparent;
        text-align: center;
        border: none;
        color: rgba(217, 219, 233, .5);
        .image{
          background-color: #FCFCFC;
          border-radius: 100%;
          margin-bottom: 4px;
          .icon{
            position: relative;
            top: 50%;
            transform: translateY(-50%);
            font-size: 1rem;
            color: #275a64;
          }
        }
      }
      .logo{
        background-image: url('../assets/DRLLogoNoText.svg');
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
        padding-bottom: 56.25%;
      }
    
    }
  }
}

/deep/ .sidebar-content {
  max-height: 100% !important;
  max-width: 100% !important;
}
</style>
