<template>
  <div id="app">
    <div class="app-header">
      <h1>Welcome to Chat Application</h1>
    </div>
    <div id="app-container">
        <chat-list :chats="messages"></chat-list>
        <chat-form :isEmptyText="isMessageEmpty" :save="save"></chat-form>
    </div>
  </div>
</template>

<script>

import ChatList from "./components/ChatList";
import ChatForm from "./components/ChatForm";

export default {
  name: 'app',
  components: {
      ChatForm,
      ChatList
  },
    data: function () {
        return {
            isMessageEmpty: false,
            messages: [
                {text: 'Hello, how are you?'},
                {text: 'I am fine.'},
                {text: 'Good.'},
                {text: 'He He.'}
            ]
        }
    },
    methods: {
      save: function (message) {
          if (message) {
              this.messages.push({text: message});
          }
          else {
              this.isMessageEmpty = true;
          }
      }
    }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
    .app-header {
        text-align: center;
    }
    #app-container {
        padding: 50px;
    }
</style>
