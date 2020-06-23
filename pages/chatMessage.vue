<template>
  <div class="chat">
    <div class="chat-top">
      <span class="ml" @click="goBack">
        <nut-icon
          class="chat-icon"
          type="right"
          size="20px"
          color="#999"
        >
        </nut-icon>
      </span>
    </div>
    <div ref="chatMessage" class="chat-message">
      <div v-for="(item, index) in chatMessage" :key="index">
        <div v-if="item.send_id !== userId" class="chat-left">
          <img class="user-pic" :src="`/user_pic/${item.sender_pic}`">
          <div class="chat-content">{{ item.message_content }}</div>
        </div>
        <div v-else class="chat-right">
          <div class="chat-content">{{ item.message_content }}</div>
          <img class="user-pic" :src="`/user_pic/${item.sender_pic}`">
        </div>
      </div>
    </div>
    <div class="chat-form">
      <nut-textinput
        v-model="messageContent"
        :clearBtn="false"
        :hasBorder="false"
        class="chat-form-input"
      />
      <nut-button @click="addMessage">发送</nut-button>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  async fetch (ctx) {
    const room_id = ctx.query.room_id
    if (room_id) {
      await ctx.store.dispatch('chatMessage/getChatMessage', {
        room_id
      })
    }
  },
  data () {
    return {
      messageType: 1,
      messageContent: ''
    }
  },
  computed: {
    chatMessage () {
      return this.$store.state.chatMessage.chatMessage
    },
    userId () {
      return this.$store.state.user.user_id
    },
    userName () {
      return this.$store.state.user.username
    }
  },
  mounted () {
    this.goToBottom()
    this.$socket.emit('signIn', this.userName)
    this.sockets.listener.subscribe('getMessage', (data) => {
      console.log(data, 'chatMessage')
      const room_id = this.$route.query.room_id
      if (data.status === 200) {
        data.data && data.data.room_id === room_id &&
        this.$store.commit('chatMessage/addChatMessage', data.data)
      } else {
        this.$dialog({
          noOkBtn: true,
          content: data.message,
          cancelBtnTxt: '我知道了'
        })
      }
    })
  },
  updated () {
    this.goToBottom()
  },
  destroyed () {
    this.sockets.listener.unsubscribe('getMessage')
  },
  methods: {
    goToBottom () {
      const chatMessageDiv = this.$refs.chatMessage
      chatMessageDiv.scrollTop = chatMessageDiv.scrollHeight
    },
    goBack () {
      this.$router.push({
        path: '/'
      })
    },
    addMessage () {
      if (!this.messageContent) {
        return
      }
      const user_id = this.$store.state.user.user_id
      const room_id = this.$route.query.room_id
      const sender_pic = this.$store.state.user.user_pic
      const contact_name = this.$route.query.contact_name
      contact_name && room_id && this.$socket.emit('addMessage', contact_name, {
        room_id,
        message_type: this.messageType,
        message_content: this.messageContent,
        send_time: new Date(),
        send_id: user_id,
        sender_pic
      })
      this.messageContent = ''
    }
  },
  head () {
    return {
      title: '聊天'
    }
  }
}
</script>

<style scoped lang="less">
  @pic_size: 70px;
  @radius: 6px;
  @chat_padding: @space_lr * 2 +  @pic_size;
  @content-padding: 16px;
  @top: 80px;
  @bottom: 120px;
  @top_bottom: @top + @bottom;
  .content {
    padding: @content-padding;
    border-radius: @radius;
    font-size: @smaller-baze-size;
    word-wrap: break-word;
  }
  .chat {
    background: rgb(243, 242, 242);
  }
  .chat-top {
    height: @top;
    background: rgb(243, 242, 242);
    border-bottom: 1px solid #d9c8c8;
    display: flex;
    align-items: center;
    padding: 0 10px;
  }
  .chat-icon {
    transform: rotate(180deg);
  }
  .chat-message {
    height: calc(100vh - @top_bottom);
    padding-top: @space_tb;
    box-sizing: border-box;
    overflow-y: auto;
  }
  .chat-left {
    padding: 0 @chat_padding 0 @space_lr;
    margin-bottom: @space_tb;
    display: flex;
    & > .chat-content {
      .content();
      background-color: #ffffff;
      margin-left: @space_lr;
      color: #999;
    }
  }
  .chat-right {
    padding: 0 @space_lr 0 @chat_padding;
    margin-bottom: @space_tb;
    display: flex;
    justify-content: flex-end;
    & > .chat-content {
      .content();
      color: #fff;
      background-color: #40bcff;
      margin-right: @space_lr;
    }
  }
  .user-pic {
    width: @pic_size;
    height: @pic_size;
    border-radius: @radius;
  }
  .chat-form {
    background: rgb(244, 243, 243);
    border-top: 1px solid #d9c8c8;
    padding: @space_tb;
    display: flex;
  }
  .chat-form-input {
    flex: 1
  }
</style>
