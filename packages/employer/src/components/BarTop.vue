<template>
  <b-navbar class="has-background-light px-3">
    <template slot="brand">
      <b-navbar-item tag="router-link" to="/dashboard">LOGO</b-navbar-item>
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
                <b-button class="p-5" icon-left="user-plus">Create&nbsp;admin&nbsp;account</b-button>
                <b-button class="p-5" icon-left="sign-out-alt">Log&nbsp;out</b-button>
              </div>
            </div>
          </b-dropdown-item>
        </b-dropdown>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default { name: 'BarTop' }
</script>

<style></style>
