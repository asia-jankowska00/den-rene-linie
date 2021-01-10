<template>
  <div class="is-flex is-flex-direction-column is-justify-content-space-between">
    <a class="delete is-large" @click="$emit('close')"></a>
    <div class="messages-container p-5">
      <div>
        <div class="media">
          <div class="media-left">
            <div class="image">
              <img class="image is-rounded is-64x64" :src="drlAvatar" />
            </div>
          </div>
          <div class="media-content box">
            <p class="my-4">Have you checked our FAQ yet?</p>
            <b-button class="is-primary">FAQ</b-button>
          </div>
        </div>
      </div>
      <div
        v-for="(message, index) in messages"
        :key="index"
        class="media"
        :class="[message.sender._id === user._id ? 'media-right' : 'media-left']"
      >
        <div v-if="message.sender._id !== user._id" class="media">
          <div class="media-left">
            <div class="image">
              <img
                class="image is-rounded is-64x64"
                :src="message.sender.avatar ? message.sender.avatar.url : placeholderAvatar"
              />
            </div>
          </div>
          <div class="media-content box">
            <p>{{ message.text }}</p>
          </div>
        </div>

        <div v-else class="media">
          <div class="media-content box">
            <p>{{ message.text }}</p>
          </div>
          <div class="media-right">
            <div class="image">
              <img
                class="image is-rounded is-64x64"
                :src="message.sender.avatar ? message.sender.avatar.url : placeholderAvatar"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="textbox-container actions is-flex is-flex-direction-row is-fullwidth is-justify-content-space-between is-align-items-center"
    >
      <b-button rounded icon-right="plus" />
      <b-field class="chat-input m-0" rounded>
        <b-input v-model="newMessage.text" placeholder="Type your message" rounded></b-input>
      </b-field>
      <b-button rounded icon-right="arrow-right" @click="sendMessage" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { SnackbarProgrammatic as Snackbar } from 'buefy'

const employerId = '5feb3447214c2f2d14529e1b'

export default {
  name: 'Chat',
  components: {},
  data() {
    return {
      newMessage: {
        sender: this.user ? this.user._id : '',
        receiver: employerId,
        text: ''
      }
    }
  },
  computed: {
    ...mapGetters('user', ['user']),
    ...mapGetters('messages', ['messages']),
    ...mapGetters('messages', ['currentUser'])
  },
  async mounted() {
    this.scrollToEnd()
    await this.getCurrentUser(employerId)
    await this.getUserMessages(this.user._id)
    this.scrollToEnd()
  },
  methods: {
    ...mapActions('clients', ['getClients']),
    ...mapActions('messages', ['getUserMessages']),
    ...mapActions('messages', ['getCurrentUser']),
    ...mapMutations('messages', ['clearCurrentUser']),
    ...mapMutations('messages', ['clearMessages']),
    ...mapActions('messages', ['postMessage']),
    async sendMessage() {
      if (this.user && this.currentUser && this.newMessage.text) {
        this.newMessage = {
          sender: this.user ? this.user._id : '',
          receiver: this.currentUser ? this.currentUser._id : '',
          text: this.newMessage.text
        }

        await this.postMessage(this.newMessage)
        this.scrollToEnd()
      } else {
        Snackbar.open({ position: 'is-top', message: 'Failed to send' })
      }
    },
    scrollToEnd() {
      const container = this.$el.querySelector('.messages-container')
      if (container) container.scrollTop = container.scrollHeight
    }
  }
}
</script>

<style>
.messages-container {
  max-height: 90vh;
  width: 100%;
  overflow-y: scroll;
}
.textbox-container {
  max-height: 10vh;
  width: 100%;
}

.chat-input {
  flex: 1;
}

.media-right {
  justify-content: flex-end;
}
</style>
