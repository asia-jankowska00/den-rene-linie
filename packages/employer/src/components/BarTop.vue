<template>
  <b-navbar class="p-3">
    <template slot="brand">
      <b-image
        class="is-48x48"
        src="https://res.cloudinary.com/den-rene-linie/image/upload/v1610401295/Logo_Primary_7e10a5239d.png"
      ></b-image>
    </template>

    <template slot="end">
      <b-navbar-item>
        <b-dropdown position="is-bottom-left" append-to-body aria-role="list">
          <b-icon icon="bell" slot="trigger" size="is-large"></b-icon>

          <b-dropdown-item aria-role="menu-item" :focusable="false" custom paddingless>
            <div class="modal-card" style="width: 300px">
              <div class="card-content">Notification</div>
              <div class="card-content">Notification</div>
              <div class="card-content">Notification</div>
            </div>
          </b-dropdown-item>
        </b-dropdown>
      </b-navbar-item>
      <b-navbar-item>
        <b-dropdown position="is-bottom-left" append-to-body aria-role="list">
          <b-icon icon="user" slot="trigger" size="is-large"></b-icon>

          <b-dropdown-item aria-role="menu-item" :focusable="false" custom paddingless>
            <div class="modal-card" style="width: 300px">
              <div class="settings is-flex is-flex-direction-column">
                <b-button class="p-5" icon-left="bell">Notification&nbsp;settings</b-button>
                <b-button class="p-5" icon-left="envelope">Change&nbsp;email</b-button>
                <b-button class="p-5" icon-left="lock">Change&nbsp;password</b-button>
                <b-button class="p-5" icon-left="user-plus">
                  Create&nbsp;admin&nbsp;account
                </b-button>
                <b-button class="p-5" icon-left="sign-out-alt" @click="logoutUser">
                  Log&nbsp;out
                </b-button>
              </div>
            </div>
          </b-dropdown-item>
        </b-dropdown>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'BarTop',
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
.navbar {
  background: linear-gradient(90deg, #275a64 0%, rgba(0, 178, 159, 0.85) 100%) !important;
}

.navbar .navbar-item,
.navbar-link {
  color: white !important;
}

a.navbar-item:focus,
a.navbar-item:focus-within,
a.navbar-item:hover,
a.navbar-item.is-active,
.navbar-link:focus,
.navbar-link:focus-within,
.navbar-link:hover,
.navbar-link.is-active {
  background: transparent;
}
</style>
