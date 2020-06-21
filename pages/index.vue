<template>
  <div>
    <Header />
    <ul class="chatRoom-list page-content">
      <li
        v-for="(item, index) in chatRoom"
        :key="index"
        @click="() => goToChatMessage(index)"
      >
        <img class="contact-pic" :src="`/user_pic/${item.contact_info.user_pic}`">
        <div class="contact-info">
          <div class="contact-info-left">
            <p class="contact-name">{{ item.contact_info.username }}</p>
            <p class="contact-message">{{ item.last_message.message_content }}</p>
          </div>
          <div class="contact-info-rignt">
            <div class="send-data">{{ item.last_send_time }}</div>
          </div>
        </div>
      </li>
    </ul>
    <TabBar />
  </div>
</template>

<script>
import TabBar from '~/components/TabBar'
import Header from '~/components/Header'
export default {
  components: {
    TabBar, Header
  },
  async fetch (ctx) {
    await ctx.store.dispatch('chatRoom/getChatRoom')
  },
  data () {
    return {
    }
  },
  computed: {
    chatRoom () {
      return this.$store.getters['chatRoom/chatRoomData']
    }
  },
  methods: {
    goToChatMessage (index) {
      const room_id = this.chatRoom[index].room_id
      const contact_name = this.chatRoom[index].contact_info.username
      this.$router.push({
        path: '/chatMessage',
        query: {
          room_id,
          contact_name
        }
      })
    }
  },
  head () {
    return {
      title: '微信'
    }
  }
}
</script>
<style scoped lang="less">
  @pic_size: 96px;
  .chatRoom-list > li {
    padding: @space_tb 0 0  @space_lr;
    display: flex;
    &:last-child {
      .contact-info {
        border-bottom: none;
      }
    }
  }
  .contact-pic {
    width: @pic_size;
    height: @pic_size;
    border-radius: @image-radius;
  }
  .contact-name {
    margin-top: 5px;
  }
  .contact-info {
    margin-left:  @space_lr;
    padding-bottom: @space_tb;
    padding-right: @space_lr;
    height: @pic_size;
    border-bottom: 1px solid #dddddd;
    flex: 1;
    display: flex;
  }
  .contact-info-left {
    flex: 1
  }
  .contact-info-rignt {
    width: 140px;
    text-align: right;
  }
  .contact-message {
    font-size: 24px;
    margin-top: 4px;
    color: @gray-color;
    white-space: nowrap;
    text-overflow: ellipsis;
    height: 36px;
    width: calc(100vw - 310px);
    overflow: hidden;
  }
  .send-data {
    color: @gray-color;
    font-size: 24px;
  }
</style>
