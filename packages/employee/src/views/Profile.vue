<template>
  <div class="profile is-flex is-flex-direction-column">
    <div class="media">
      <div class="image media-left">
        <img
          class="image is-rounded is-64x64"
          src="https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
        />
      </div>
      <div class="media-content">
        <h4>Name of employee</h4>
        <p class="is-medium">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex reprehenderit quod assumenda
          odit nihil blanditiis, architecto id velit quae ducimus neque necessitatibus voluptate
          distinctio! Maiores provident earum explicabo optio enim!
        </p>
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
      <b-button class="p-5" icon-left="sign-out-alt">Log&nbsp;out</b-button>
    </div>
  </div>
</template>

<script>
//import EditModal from '../components/EditModal.vue'
export default {
  name: 'Profile',
  components: {},
  props: [],
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.profile {
  .button {
    border: none;
  }
  .settings {
    position: relative;
    bottom: 0;
    left: 0;
    button {
      justify-content: start;
      border-top: 1px solid black;
      border-radius: 0;
    }
  }
}
</style>
