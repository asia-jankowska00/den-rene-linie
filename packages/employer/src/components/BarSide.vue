<template>
  <b-sidebar type="is-dark" position="static" class="is-fullheight sidebar" open>
    <div class="p-2 is-fullwidth">
      <b-menu class="is-custom-mobile">
        <b-menu-list>
          <b-menu-item icon="calendar" label="Bookings">
            <b-menu-item
              tag="router-link"
              active-class="is-active"
              to="/dashboard/bookings/pending"
              icon="calendar-minus"
              label="Pending"
            ></b-menu-item>
            <b-menu-item
              tag="router-link"
              active-class="is-active"
              to="/dashboard/bookings/approved"
              icon="calendar-check"
              label="Approved"
            ></b-menu-item>
          </b-menu-item>
          <b-menu-item icon="user" label="Employees">
            <b-menu-item
              tag="router-link"
              active-class="is-active"
              to="/dashboard/employees/list"
              icon="user"
              label="Employee list"
            ></b-menu-item>
            <b-menu-item
              tag="router-link"
              active-class="is-active"
              to="/dashboard/employees/add"
              icon="user"
              label="Add account"
            ></b-menu-item>
            <b-menu-item
              tag="router-link"
              active-class="is-active"
              to="/dashboard/employees/guides"
              icon="user"
              label="Guides"
            ></b-menu-item>
            <b-menu-item
              tag="router-link"
              active-class="is-active"
              to="/dashboard/employees/timesheets"
              icon="user"
              label="Timesheets"
            ></b-menu-item>
          </b-menu-item>
          <b-menu-item icon="user" label="Clients">
            <b-menu-item
              tag="router-link"
              active-class="is-active"
              to="/dashboard/clients/list"
              icon="user"
              label="Client list"
            ></b-menu-item>
          </b-menu-item>
          <b-menu-item icon="comments" label="Chat">
            <b-menu-item
              tag="router-link"
              active-class="is-active"
              to="/dashboard/chat/employees"
              icon="comments"
              label="Employees"
            ></b-menu-item>
            <b-menu-item
              tag="router-link"
              active-class="is-active"
              to="/dashboard/chat/clients"
              icon="comments"
              label="Clients"
            ></b-menu-item>
          </b-menu-item>
          <b-menu-item icon="broom" label="Services">
            <b-menu-item
              tag="router-link"
              active-class="is-active"
              to="/dashboard/services"
              icon="broom"
              label="All"
            ></b-menu-item>
          </b-menu-item>
          <b-menu-item
            active-class="is-active"
            @click="logoutUser"
            icon="sign-out-alt"
            label="Logout"
          ></b-menu-item>
        </b-menu-list>
      </b-menu>
    </div>
  </b-sidebar>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'BarSide',
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

<style lang="scss">
.sidebar {
  min-height: 100%;
  width: inherit;
}

.b-sidebar {
  width: inherit;
}

.b-sidebar .sidebar-content {
  box-shadow: none !important;
  height: 100%;
  width: 100% !important;
  background:  linear-gradient(180deg, #275A64 0%, rgba(0, 178, 159, 0.85) 100%) !important;
}
.b-sidebar .menu-list a {
  color: white;
}
.b-sidebar .menu-list a:hover {
  background: #275a64;
}

.b-sidebar .menu-list a.is-active {
  background: transparent;
  color: #5cc3b4;
}
</style>
