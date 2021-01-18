<template>
  <div class="columns">
    <div class="column is-one-fifth">
      <b-menu>
        <b-menu-list label="Clients">
          <b-menu-item
            v-for="(client, index) in clients"
            :key="index"
            :label="formatName(client)"
            @click="getMessages(client._id)"
          ></b-menu-item>
        </b-menu-list>
      </b-menu>
    </div>
    <div
      v-if="messages"
      class="column is-flex is-flex-direction-column is-justify-content-space-between p-4"
    >
      <div class="messages-container p-5">
        <ul class="message-list is-flex is-flex-direction-column">
          <li
            v-for="(message, index) in messages"
            :key="index"
            class="message card p-2"
            :class="[message.sender._id === user._id ? 'sender' : 'receiver']"
          >
            <p class="has-text-weight-bold">
              {{ formatName(message.sender) }}
            </p>
            <p class="py-2">{{ message.text }}</p>
          </li>
        </ul>
      </div>
      <b-field label="Message">
        <b-input
          v-model="newMessage.text"
          class="column"
          minlength="1"
          maxlength="300"
          type="textarea"
        ></b-input>
        <b-button class="column is-one-fifth ml-5" @click="sendMessage">Send</b-button>
      </b-field>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { SnackbarProgrammatic as Snackbar } from 'buefy'

export default {
  name: 'ChatClients',
  data() {
    return {
      newMessage: {
        sender: this.user ? this.user._id : '',
        receiver: this.currentUser ? this.currentUser._id : '',
        text: ''
      }
    }
  },
  computed: {
    ...mapGetters('user', ['user']),
    ...mapGetters('clients', ['clients']),
    ...mapGetters('messages', ['messages']),
    ...mapGetters('messages', ['currentUser'])
  },
  mounted() {
    this.clearCurrentUser()
    this.clearMessages()
    this.getClients().then(() => this.scrollToEnd())
  },
  methods: {
    ...mapActions('clients', ['getClients']),
    ...mapActions('messages', ['getUserMessages']),
    ...mapActions('messages', ['getCurrentUser']),
    ...mapMutations('messages', ['clearCurrentUser']),
    ...mapMutations('messages', ['clearMessages']),
    ...mapActions('messages', ['postMessage']),
    getMessages(userId) {
      this.getCurrentUser(userId)
      this.getUserMessages(userId).then(() => this.scrollToEnd())
    },
    sendMessage() {
      if (this.user && this.currentUser && this.newMessage.text) {
        this.newMessage = {
          sender: this.user ? this.user._id : '',
          receiver: this.currentUser ? this.currentUser._id : '',
          text: this.newMessage.text
        }
        this.postMessage(this.newMessage).then(() => {
          this.scrollToEnd()
        })
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

<style scoped>
.messages-container {
  overflow-y: scroll;
  max-height: 70vh;
  max-width: 100%;
}

.message-list {
  max-width: 100%;
}

.message {
  max-width: 70%;
}

.sender {
  align-self: flex-end;
}

.receiver {
  align-self: flex-start;
}
</style>
